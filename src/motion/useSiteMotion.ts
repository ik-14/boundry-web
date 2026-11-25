import { useEffect, type RefObject } from 'react'

type MotionTask = (delta: number) => boolean
type Vector = [number, number, number]
type Cleanup = () => void

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value))

/** Spatial accents share one animation loop, which sleeps when everything settles. */
export function useSiteMotion(rootRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const precise = window.matchMedia('(hover: hover) and (pointer: fine)')
    const controller = new AbortController()
    const { signal } = controller
    const tasks = new Set<MotionTask>()
    const resets: Cleanup[] = []
    const cleanups: Cleanup[] = []
    const resizeObservers: ResizeObserver[] = []
    let frame = 0
    let previous = 0
    let disposed = false
    let revealObserver: IntersectionObserver | undefined

    const canFollow = (event: PointerEvent) =>
      !reduced.matches && precise.matches && event.pointerType !== 'touch'

    // Restore only the properties/classes this effect owns, leaving React's props alone.
    const rememberStyles = (element: HTMLElement, properties: string[]) => {
      const values = properties.map(property => ({
        property,
        value: element.style.getPropertyValue(property),
        priority: element.style.getPropertyPriority(property),
      }))
      cleanups.push(() => values.forEach(({ property, value, priority }) => {
        if (value) element.style.setProperty(property, value, priority)
        else element.style.removeProperty(property)
      }))
    }
    const rememberClass = (element: HTMLElement, className: string) => {
      const present = element.classList.contains(className)
      cleanups.push(() => element.classList.toggle(className, present))
    }

    function tick(time: number) {
      frame = 0
      if (disposed) return
      const delta = Math.min((time - previous) / 1000 || 1 / 60, 1 / 30)
      previous = time
      tasks.forEach(task => { if (!task(delta)) tasks.delete(task) })
      if (tasks.size && !document.hidden) frame = requestAnimationFrame(tick)
    }
    function wake(task: MotionTask) {
      if (disposed) return
      tasks.add(task)
      if (!frame && !document.hidden) {
        previous = performance.now()
        frame = requestAnimationFrame(tick)
      }
    }

    root.querySelectorAll<HTMLElement>('.button[data-ink]').forEach(button => {
      const label = button.querySelector<HTMLElement>('.button-label')
      const ink = button.querySelector<HTMLElement>('.button-ink')
      if (!label || !ink) return

      const originalChildren = Array.from(button.childNodes)
      const foreground = label.cloneNode(true) as HTMLElement
      foreground.classList.add('button-label--ink')
      foreground.setAttribute('aria-hidden', 'true')
      foreground.removeAttribute('id')

      // Keep the anchor's layout/hit area stationary while the visible face tilts.
      const measureLabel = label.cloneNode(true) as HTMLElement
      measureLabel.className = 'button-measure'
      measureLabel.setAttribute('aria-hidden', 'true')
      measureLabel.removeAttribute('id')
      const surface = document.createElement('span')
      surface.className = 'button-surface'
      surface.append(label, ink, foreground)
      button.append(measureLabel, surface)
      rememberClass(button, 'has-pressure')
      rememberStyles(ink, ['transform', 'width', 'height'])
      button.classList.add('has-pressure')
      cleanups.push(() => button.replaceChildren(...originalChildren))

      let width = 0, height = 0, radius = 0
      let x = 0, y = 0, tx = 0, ty = 0
      let progress = 0, target = 0, inside = false, keyboard = false
      const pressure: Vector = [0, 0, 0]
      const velocity: Vector = [0, 0, 0]
      const destination: Vector = [0, 0, 0]
      const axes = [0, 1, 2] as const

      const paintPressure = () => {
        surface.style.setProperty('--press-x', `${pressure[0]}deg`)
        surface.style.setProperty('--press-y', `${pressure[1]}deg`)
        surface.style.setProperty('--press-drop', `${pressure[2] * 3}px`)
      }
      const animatePressure: MotionTask = delta => {
        let moving = false
        for (const axis of axes) {
          velocity[axis] += ((destination[axis] - pressure[axis]) * 260 - velocity[axis] * 22) * delta
          pressure[axis] += velocity[axis] * delta
          if (Math.abs(destination[axis] - pressure[axis]) + Math.abs(velocity[axis]) > .002) moving = true
        }
        if (!moving) {
          for (const axis of axes) pressure[axis] = destination[axis]
          velocity.fill(0)
        }
        paintPressure()
        return moving
      }
      const resetPressure = () => {
        pressure.fill(0)
        velocity.fill(0)
        destination.fill(0)
        tasks.delete(animatePressure)
        paintPressure()
      }
      const pressAt = (event: PointerEvent) => {
        if (!canFollow(event)) return
        const rect = button.getBoundingClientRect()
        if (!rect.width || !rect.height) return
        const px = clamp((event.clientX - rect.left) / rect.width * 2 - 1, -1, 1)
        const py = clamp((event.clientY - rect.top) / rect.height * 2 - 1, -1, 1)
        // Positive X and negative Y rotation depress the top-left corner.
        destination[0] = -py * 10
        destination[1] = px * 8
        destination[2] = 1
        wake(animatePressure)
      }
      const releasePressure = () => {
        destination.fill(0)
        wake(animatePressure)
      }
      const render = () => {
        ink.style.transform = `translate3d(${x - radius}px, ${y - radius}px, 0) scale(${progress})`
        foreground.style.clipPath = `circle(${radius * progress}px at ${x}px ${y}px)`
      }
      const measure = () => {
        width = button.clientWidth
        height = button.clientHeight
        radius = Math.hypot(width, height) + 2
        ink.style.width = ink.style.height = `${radius * 2}px`
        if (!inside) { x = tx = width / 2; y = ty = height / 2 }
        render()
      }
      const animate: MotionTask = delta => {
        const ease = 1 - Math.exp(-18 * delta)
        progress += (target - progress) * ease
        x += (tx - x) * ease
        y += (ty - y) * ease
        const moving = Math.abs(target - progress) > .001 || Math.abs(tx - x) + Math.abs(ty - y) > .05
        if (!moving) { progress = target; x = tx; y = ty }
        render()
        return moving
      }
      const origin = (event: PointerEvent) => {
        const rect = button.getBoundingClientRect()
        tx = clamp(event.clientX - rect.left - button.clientLeft, 0, width)
        ty = clamp(event.clientY - rect.top - button.clientTop, 0, height)
        if (progress < .01 || progress > .99) { x = tx; y = ty }
      }
      button.addEventListener('pointerenter', event => {
        if (!canFollow(event)) return
        inside = true
        origin(event)
        pressAt(event)
        target = 1
        render()
        wake(animate)
      }, { signal })
      const leave = (event: PointerEvent) => {
        inside = false
        releasePressure()
        if (keyboard) return
        origin(event)
        target = 0
        wake(animate)
      }
      button.addEventListener('pointerleave', leave, { signal })
      button.addEventListener('pointercancel', leave, { signal })
      button.addEventListener('pointermove', pressAt, { passive: true, signal })
      button.addEventListener('focus', () => {
        keyboard = button.matches(':focus-visible')
        if (!keyboard) return
        resetPressure()
        x = tx = width / 2
        y = ty = height / 2
        progress = target = 1
        render()
      }, { signal })
      button.addEventListener('blur', () => {
        keyboard = false
        if (!inside) releasePressure()
        target = inside && !reduced.matches ? 1 : 0
        if (reduced.matches) { progress = target; render() }
        else wake(animate)
      }, { signal })
      resets.push(() => {
        inside = false
        progress = target = keyboard ? 1 : 0
        x = tx = width / 2
        y = ty = height / 2
        resetPressure()
        render()
      })
      measure()
      if (typeof ResizeObserver !== 'undefined') {
        const observer = new ResizeObserver(measure)
        observer.observe(button)
        resizeObservers.push(observer)
      } else {
        window.addEventListener('resize', measure, { passive: true, signal })
      }
      window.addEventListener('resize', resetPressure, { passive: true, signal })
    })

    function spatial(element: HTMLElement, paint: (x: number, y: number, engagement: number) => void) {
      let x = 0, y = 0, vx = 0, vy = 0, tx = 0, ty = 0
      let engagement = 0, engagementVelocity = 0, active = 0
      rememberClass(element, 'is-pointer-active')
      const animate: MotionTask = delta => {
        vx += ((tx - x) * 200 - vx * 19) * delta
        vy += ((ty - y) * 200 - vy * 19) * delta
        engagementVelocity += ((active - engagement) * 220 - engagementVelocity * 20) * delta
        x += vx * delta
        y += vy * delta
        engagement += engagementVelocity * delta
        const moving = Math.abs(tx - x) + Math.abs(ty - y) + Math.abs(vx) + Math.abs(vy) + Math.abs(active - engagement) + Math.abs(engagementVelocity) > .002
        if (!moving) { x = tx; y = ty; vx = vy = 0; engagement = active; engagementVelocity = 0 }
        paint(x, y, engagement)
        return moving
      }
      const point = (event: PointerEvent) => {
        if (!canFollow(event)) return
        const rect = element.getBoundingClientRect()
        if (!rect.width || !rect.height) return
        tx = clamp((event.clientX - rect.left) / rect.width * 2 - 1, -1, 1)
        ty = clamp((event.clientY - rect.top) / rect.height * 2 - 1, -1, 1)
        active = 1
        element.classList.add('is-pointer-active')
        wake(animate)
      }
      const release = () => {
        tx = ty = 0
        active = 0
        element.classList.remove('is-pointer-active')
        wake(animate)
      }
      element.addEventListener('pointerenter', point, { signal })
      element.addEventListener('pointermove', point, { passive: true, signal })
      element.addEventListener('pointerleave', release, { signal })
      element.addEventListener('pointercancel', release, { signal })
      const reset = () => {
        x = y = vx = vy = tx = ty = 0
        engagement = engagementVelocity = active = 0
        element.classList.remove('is-pointer-active')
        paint(0, 0, 0)
      }
      resets.push(reset)
      window.addEventListener('resize', reset, { passive: true, signal })
      paint(0, 0, 0)
    }

    root.querySelectorAll<HTMLElement>('[data-parallax]').forEach(collage => {
      const layers = Array.from(collage.querySelectorAll<HTMLElement>('[data-depth]'))
      layers.forEach(layer => rememberStyles(layer, ['--parallax-x', '--parallax-y']))
      spatial(collage, (x, y) => layers.forEach(layer => {
        const depth = Number(layer.dataset.depth) || 0
        layer.style.setProperty('--parallax-x', `${x * depth}px`)
        layer.style.setProperty('--parallax-y', `${y * depth}px`)
      }))
    })
    root.querySelectorAll<HTMLElement>('[data-tilt]').forEach(card => {
      rememberStyles(card, ['--tilt-x', '--tilt-y', '--light-x', '--light-y', '--pointer-x', '--pointer-y', '--engagement'])
      const strength = clamp(Number(card.dataset.tilt) || 6, 0, 10)
      spatial(card, (x, y, engagement) => {
        card.style.setProperty('--tilt-x', `${-y * strength}deg`)
        card.style.setProperty('--tilt-y', `${x * strength}deg`)
        card.style.setProperty('--light-x', `${50 + x * 50}%`)
        card.style.setProperty('--light-y', `${50 + y * 50}%`)
        card.style.setProperty('--pointer-x', `${x}`)
        card.style.setProperty('--pointer-y', `${y}`)
        card.style.setProperty('--engagement', `${engagement}`)
      })
    })
    root.querySelectorAll<HTMLElement>('.partner-panel').forEach(panel => {
      const glow = document.createElement('span')
      glow.className = 'partner-glow'
      glow.setAttribute('aria-hidden', 'true')
      panel.prepend(glow)
      cleanups.push(() => glow.remove())
      rememberStyles(panel, ['--glow-x', '--glow-y'])
      spatial(panel, (x, y) => {
        panel.style.setProperty('--glow-x', `${50 + x * 50}%`)
        panel.style.setProperty('--glow-y', `${50 + y * 50}%`)
      })
    })

    const revealAll = () => {
      root.querySelectorAll('.reveal-pending').forEach(element => element.classList.remove('reveal-pending'))
      revealObserver?.disconnect()
    }
    if (!reduced.matches && 'IntersectionObserver' in window) {
      revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.remove('reveal-pending')
        revealObserver?.unobserve(entry.target)
      }), { threshold: .06, rootMargin: '0px 0px -24px 0px' })
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach(element => {
        rememberClass(element, 'reveal-pending')
        rememberStyles(element, ['--reveal-delay'])
        if (element.getBoundingClientRect().top < window.innerHeight - 24) return
        element.style.setProperty('--reveal-delay', `${clamp(Number(element.dataset.delay) || 0, 0, 180)}ms`)
        element.classList.add('reveal-pending')
        revealObserver?.observe(element)
      })
    }
    function resetMotion() {
      cancelAnimationFrame(frame)
      frame = 0
      tasks.clear()
      resets.forEach(reset => reset())
      if (reduced.matches) revealAll()
    }
    reduced.addEventListener('change', resetMotion, { signal })
    precise.addEventListener('change', resetMotion, { signal })
    rememberClass(document.documentElement, 'motion-paused')
    document.addEventListener('visibilitychange', () => {
      document.documentElement.classList.toggle('motion-paused', document.hidden)
      if (document.hidden) resetMotion()
    }, { signal })

    return () => {
      disposed = true
      controller.abort()
      cancelAnimationFrame(frame)
      tasks.clear()
      revealObserver?.disconnect()
      resizeObservers.forEach(observer => observer.disconnect())
      // Restore React-owned nodes before StrictMode re-runs setup or unmounts them.
      cleanups.reverse().forEach(cleanup => cleanup())
    }
  }, [rootRef])
}
