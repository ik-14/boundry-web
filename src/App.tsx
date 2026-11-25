import { useEffect, useRef, useState } from 'react'
import { ContactButton } from './components/ContactButton'
import { TechnologyCard } from './components/TechnologyCard'
import { technologies } from './data/technologies'
import { useSiteMotion } from './motion/useSiteMotion'

function AiInMotionVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playRequestRef = useRef(0)
  const [isInView, setIsInView] = useState(false)
  const [isPageVisible, setIsPageVisible] = useState(() => !document.hidden)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [hasExplicitPlay, setHasExplicitPlay] = useState(false)
  const [isUserPaused, setIsUserPaused] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)
  const [hasPlaybackError, setHasPlaybackError] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    return () => {
      playRequestRef.current += 1
      video?.pause()
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMotionChange = () => {
      setPrefersReducedMotion(reducedMotion.matches)
      // A newly selected reduced-motion preference takes effect immediately.
      if (reducedMotion.matches) setHasExplicitPlay(false)
    }
    const onVisibilityChange = () => setIsPageVisible(!document.hidden)
    reducedMotion.addEventListener('change', onMotionChange)
    document.addEventListener('visibilitychange', onVisibilityChange)

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting && entry.intersectionRatio >= 0.2)
    }, { threshold: [0, 0.2] })
    observer.observe(video)

    return () => {
      observer.disconnect()
      reducedMotion.removeEventListener('change', onMotionChange)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let cancelled = false
    const shouldPlay = isInView && isPageVisible && !isUserPaused &&
      (!prefersReducedMotion || hasExplicitPlay) && !autoplayBlocked && !hasPlaybackError

    if (shouldPlay) {
      video.play().catch((error: unknown) => {
        // Leaving the viewport can legitimately interrupt a pending play request.
        if (cancelled || (error instanceof DOMException && error.name === 'AbortError')) return
        if (error instanceof DOMException && error.name === 'NotSupportedError') {
          setHasPlaybackError(true)
        } else {
          setAutoplayBlocked(true)
        }
      })
    } else {
      playRequestRef.current += 1
      video.pause()
    }

    return () => {
      cancelled = true
    }
  }, [isInView, isPageVisible, isUserPaused, prefersReducedMotion, hasExplicitPlay, autoplayBlocked, hasPlaybackError])

  const showPoster = !hasStarted || (prefersReducedMotion && !hasExplicitPlay) || hasPlaybackError
  const togglePlayback = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      playRequestRef.current += 1
      video.pause()
      setIsUserPaused(true)
    } else {
      if (document.hidden) return
      if (!isInView) {
        video.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' })
        // Keep the immediate gesture request alive until the observer catches up.
        setIsInView(true)
      }
      setHasExplicitPlay(true)
      setIsUserPaused(false)
      setAutoplayBlocked(false)
      // Keep this call inside the click gesture for browsers that gate playback.
      const request = ++playRequestRef.current
      video.play().catch((error: unknown) => {
        if (request !== playRequestRef.current) return
        if (error instanceof DOMException && error.name === 'AbortError') return
        if (error instanceof DOMException && error.name === 'NotSupportedError') {
          setHasPlaybackError(true)
        } else {
          setAutoplayBlocked(true)
        }
      })
    }
  }

  return (
    <section className="process-film" id="belief" aria-labelledby="process-title">
      <div className="process-film-heading section-split" data-reveal>
        <h2 id="process-title">New technology changes<br className="desktop-break" /> what we need to insure.</h2>
        <p>Our belief: AI will take on more work in the physical and digital world. Insurance needs to understand the systems doing that work.</p>
      </div>
      <figure className="process-film-figure" data-reveal>
        <div className="film-shell">
          <div className="process-film-media">
            <video
              id="insurance-case-video"
              ref={videoRef}
              width="1920"
              height="1080"
              muted
              loop
              playsInline
              preload="metadata"
              poster="/assets/boundry-ai-in-motion-poster.webp"
              aria-hidden="true"
              onPlaying={() => { setIsPlaying(true); setHasStarted(true) }}
              onPause={() => setIsPlaying(false)}
              onError={() => { setHasPlaybackError(true); setIsPlaying(false) }}
            >
              <source src="/assets/boundry-ai-in-motion.webm" type="video/webm" />
              <source src="/assets/boundry-ai-in-motion.mp4" type="video/mp4" />
            </video>
            {showPoster && <img className="process-film-poster" src="/assets/boundry-ai-in-motion-poster.webp" width="1920" height="1080" alt="" loading="lazy" decoding="async" />}
          </div>
        </div>
        <figcaption className="process-film-description">Physical and digital AI create new risks. Boundry helps explain how these systems work and make the case for insurance.</figcaption>
        <div className="process-film-controls">
          {hasPlaybackError ? <p>Showing a still image of our story.</p> : (
            <button className="process-film-toggle" type="button" onClick={togglePlayback} aria-controls="insurance-case-video">
              <svg viewBox="0 0 20 20" aria-hidden="true">{isPlaying ? <><path d="M6 4v12M14 4v12" /></> : <path d="m6 3 10 7-10 7Z" />}</svg>
              <span>{isPlaying ? 'Pause film' : hasStarted && !showPoster ? 'Resume film' : 'Play film'}</span>
            </button>
          )}
        </div>
      </figure>
    </section>
  )
}

function App() {
  const siteRef = useRef<HTMLDivElement>(null)
  useSiteMotion(siteRef)

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="site" id="top" ref={siteRef}>
        <header className="site-header">
          <a className="wordmark" href="#top" aria-label="Boundry home">Boundry</a>
          <nav aria-label="Main navigation">
            <a className="text-link" href="#belief">Our belief</a>
            <a className="text-link" href="#approach">Our approach</a>
            <a className="text-link" href="#contact">Talk to us</a>
          </nav>
        </header>
        <main id="main">
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-copy" data-parallax>
              <h1 id="hero-title"><span className="hero-line"><span data-depth="-4">Insurance for a world</span></span><span className="hero-line hero-line--accent"><span className="highlight-layer" data-depth="14"><span className="highlight">built with AI.</span></span></span></h1>
              <p className="hero-description">We assess AI software, robots and intelligent hardware, helping insurers understand the risk and companies make the case for cover.</p>
              <ContactButton />
              <p className="backing">Backed by <a className="text-link" href="https://www.joinef.com/" target="_blank" rel="noopener noreferrer" aria-label="Entrepreneur First — opens in a new tab">Entrepreneur First</a></p>
            </div>
          </section>

          <div className="page-content">
            <AiInMotionVideo />

            <section className="approach" id="approach" aria-labelledby="approach-title">
              <h2 id="approach-title" data-reveal>Turn technical detail into a case for cover.</h2>
              <ol className="approach-steps">
                <li data-reveal data-tilt="5">
                  <div className="step-surface card-surface">
                  <p className="step-label"><span aria-hidden="true">01</span> Understand</p>
                  <h3>How your system works</h3>
                  <p>Its purpose, operating conditions and decisions.</p>
                  </div>
                </li>
                <li data-reveal data-delay="90" data-tilt="5">
                  <div className="step-surface card-surface">
                  <p className="step-label"><span aria-hidden="true">02</span> Assess</p>
                  <h3>What could go wrong</h3>
                  <p>The risks, safeguards and evidence behind them.</p>
                  </div>
                </li>
                <li data-reveal data-delay="180" data-tilt="5">
                  <div className="step-surface card-surface">
                  <p className="step-label"><span aria-hidden="true">03</span> Connect</p>
                  <h3>Bring the case to insurers</h3>
                  <p>Help explore cover suited to your deployment.</p>
                  </div>
                </li>
              </ol>
            </section>

            <section className="audiences" aria-labelledby="audiences-title">
              <div className="audiences-copy">
                <h2 id="audiences-title" data-reveal>Physical and digital AI.</h2>
                <ul className="audience-list">
                  {technologies.map((technology, index) => (
                    <TechnologyCard key={technology.id} technology={technology} delay={index * 40} />
                  ))}
                </ul>
              </div>
              <aside className="why-boundry-frame" aria-labelledby="why-boundry-title" data-reveal data-tilt="6">
                <div className="why-boundry card-surface">
                <span className="proof-mark" aria-hidden="true" />
                <p className="section-label">Why Boundry</p>
                <h3 id="why-boundry-title">Built by technical experts.</h3>
                <p className="credentials">Our background combines AI and cybersecurity PhD research funded by Cisco with engineering experience at AWS.</p>
                </div>
              </aside>
            </section>

            <section className="closing" id="contact" aria-labelledby="closing-title" data-reveal>
              <div className="closing-copy">
                <h2 id="closing-title">Bring your next deployment<br className="desktop-break" /> into the conversation.</h2>
                <p>Brokers, MGAs and insurers: explore technical assessments and opportunities in physical and digital AI.</p>
              </div>
              <div className="closing-actions">
                <ContactButton variant="butter" />
                <a className="text-link partnership-link" href="https://calendly.com/khalilismail616/ismail-boundry-meeting" target="_blank" rel="noopener noreferrer" aria-label="Discuss a partnership — opens scheduling in a new tab">Discuss a partnership <span aria-hidden="true">↗</span></a>
              </div>
            </section>
          </div>
        </main>
        <footer className="site-footer"><a className="footer-brand" href="#top">Boundry</a><span>Insurance and technical risk assessment</span></footer>
      </div>
    </>
  )
}

export default App
