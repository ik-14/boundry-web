import { useEffect, useRef, useState } from 'react'
import { ContactButton } from './components/ContactButton'
import { TechnologyCard } from './components/TechnologyCard'
import { technologies } from './data/technologies'
import { useSiteMotion } from './motion/useSiteMotion'

function InsuranceCaseVideo() {
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
    <section className="process-film" id="approach" aria-labelledby="process-title">
      <div className="process-film-heading section-split" data-reveal>
        <h2 id="process-title">Make the case for cover.</h2>
        <p>We assess how your system works, what can go wrong and the safeguards in place.</p>
      </div>
      <figure className="process-film-figure">
        <div className="process-film-media">
          <video
            id="insurance-case-video"
            ref={videoRef}
            width="2880"
            height="2160"
            muted
            loop
            playsInline
            preload="metadata"
            poster="/assets/boundry-risk-intelligence-poster-2160p.webp"
            aria-hidden="true"
            onPlaying={() => { setIsPlaying(true); setHasStarted(true) }}
            onPause={() => setIsPlaying(false)}
            onError={() => { setHasPlaybackError(true); setIsPlaying(false) }}
          >
            <source src="/assets/boundry-risk-intelligence-2160p.webm" type="video/webm" />
            <source src="/assets/boundry-risk-intelligence-2160p.mp4" type="video/mp4" />
          </video>
          {showPoster && <img className="process-film-poster" src="/assets/boundry-risk-intelligence-poster-2160p.webp" width="2880" height="2160" alt="" loading="lazy" decoding="async" />}
        </div>
        <figcaption className="process-film-description">Deployment details, failure scenarios and safety evidence become a structured risk profile that informs insurance coverage, terms and pricing.</figcaption>
        <div className="process-film-controls">
          {hasPlaybackError ? <p>Showing a still image of our approach.</p> : (
            <button className="process-film-toggle" type="button" onClick={togglePlayback} aria-controls="insurance-case-video">
              <svg viewBox="0 0 20 20" aria-hidden="true">{isPlaying ? <><path d="M6 4v12M14 4v12" /></> : <path d="m6 3 10 7-10 7Z" />}</svg>
              <span>{isPlaying ? 'Pause animation' : hasStarted && !showPoster ? 'Resume animation' : 'Play animation'}</span>
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
          <nav aria-label="Main navigation"><a className="text-link" href="#approach">Our approach</a></nav>
        </header>
        <main id="main">
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
              <h1 id="hero-title"><span>Insurance and</span><span className="highlight">risk intelligence</span><span>for autonomous</span><span>systems.</span></h1>
              <p className="hero-description">We help robotics and AI companies get their technology understood and covered.</p>
              <ContactButton />
              <p className="backing">Backed by <a className="text-link" href="https://www.joinef.com/" target="_blank" rel="noopener noreferrer" aria-label="Entrepreneur First — opens in a new tab">Entrepreneur First</a></p>
            </div>
            <div className="hero-collage" data-parallax aria-label="Illustrations of frontier technology">
              <div className="robot-paper" data-depth="14"><div className="robot-float"><img src="/assets/robot.jpg" alt="Illustration of a robotic arm holding a reflective sphere" width="1200" height="675" fetchPriority="high" decoding="async" /></div></div>
              <div className="rover-paper" data-depth="-20"><div className="rover-float"><img src="/assets/rover.jpg" alt="Illustration of an autonomous delivery rover" width="1200" height="675" decoding="async" /></div></div>
              <div className="agent-paper" data-depth="21"><div className="agent-float"><img src="/assets/ai-agent.png" alt="Illustration of an autonomous AI agent working across connected digital tools" width="1254" height="1254" decoding="async" /></div></div>
              <div className="coral-ring" data-depth="26" aria-hidden="true"><div className="ring-float"></div></div>
            </div>
          </section>

          <div className="page-content">
            <InsuranceCaseVideo />

            <section className="evidence" aria-labelledby="evidence-title">
              <div className="section-heading" data-reveal><h2 id="evidence-title">Who we help</h2></div>
              <div className="domain-grid">
                {technologies.map((technology, index) => (
                  <TechnologyCard key={technology.id} technology={technology} delay={index * 80} />
                ))}
              </div>
            </section>

            <section className="why-boundry section-split" aria-labelledby="why-boundry-title" data-reveal>
              <div><p className="section-label">Why Boundry</p><h2 id="why-boundry-title">Built by technical experts.</h2></div>
              <div><p>Our background combines AI and cybersecurity PhD research funded by Cisco with engineering experience at AWS.</p></div>
            </section>

            <section className="partner-panel" aria-labelledby="partners-title" data-reveal>
              <div><p className="section-label">For brokers, MGAs and insurers</p><h2 id="partners-title">Reach robotics and AI companies.</h2></div>
              <div><p>Connect with companies seeking cover, with technical assessments to support your underwriting.</p><ContactButton variant="outline">Discuss a partnership</ContactButton></div>
            </section>

            <section className="closing" aria-labelledby="closing-title" data-reveal><h2 id="closing-title">Make autonomous work insurable,<br />so it can scale.</h2><ContactButton variant="butter" /></section>
          </div>
        </main>
        <footer className="site-footer"><a className="footer-brand" href="#top">Boundry</a><span>Robotics, autonomous systems and AI</span></footer>
      </div>
    </>
  )
}

export default App
