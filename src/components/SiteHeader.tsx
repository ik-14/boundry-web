import { useEffect, useRef } from 'react'
import { technologies } from '../data/technologies'

export function SiteHeader({ pathname }: { pathname: string }) {
  const menuRef = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    const menu = menuRef.current
    if (!menu) return
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !menu.contains(event.target)) menu.open = false
    }
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !menu.open) return
      menu.open = false
      menu.querySelector('summary')?.focus()
    }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeWithEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeWithEscape)
    }
  }, [])

  return (
    <header className="site-header">
      <a className="wordmark" href="/" aria-label="Boundry home">Boundry</a>
      <nav aria-label="Main navigation">
        <details className="sector-menu" ref={menuRef}>
          <summary>Who we help <svg viewBox="0 0 12 12" aria-hidden="true"><path d="m3 4.5 3 3 3-3" /></svg></summary>
          <div className="sector-menu-panel">
            {technologies.map(technology => (
              <a key={technology.id} href={`/sectors/${technology.slug}`} aria-current={pathname === `/sectors/${technology.slug}` ? 'page' : undefined}>
                <span className={`menu-swatch menu-swatch--${technology.id}`} aria-hidden="true" />
                <span>{technology.name}</span>
              </a>
            ))}
            <a className="sector-menu-other" href="/#contact" onClick={() => { if (menuRef.current) menuRef.current.open = false }}>Something else? Talk to us</a>
          </div>
        </details>
        <a className="text-link" href="/for-insurers" aria-current={pathname === '/for-insurers' ? 'page' : undefined}>For insurers</a>
        <a className="text-link" href="/#contact">Talk to us</a>
      </nav>
    </header>
  )
}
