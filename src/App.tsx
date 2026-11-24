import { useRef } from 'react'
import { ContactButton } from './components/ContactButton'
import { TechnologyCard } from './components/TechnologyCard'
import { technologies } from './data/technologies'
import { useSiteMotion } from './motion/useSiteMotion'

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
              <h1 id="hero-title"><span>Insurance</span><span>for frontier</span><span className="highlight">technology.</span></h1>
              <p className="hero-description">We turn technical and operational data into a clearer picture of risk, helping insurers assess and price cover for frontier companies.</p>
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
            <section className="intro section-split" id="approach" aria-labelledby="problem-title" data-reveal>
              <h2 id="problem-title">New technology needs a clearer risk picture.</h2>
              <p>Emerging technologies can have limited claims history and unfamiliar failure modes. We use technical and operational data to give insurers the evidence to assess these risks.</p>
            </section>

            <section className="evidence" aria-labelledby="evidence-title">
              <div className="section-heading" data-reveal><h2 id="evidence-title">Start with how it actually works.</h2><p>The evidence behind the insurance decision</p></div>
              <div className="domain-grid">
                {technologies.map((technology, index) => (
                  <TechnologyCard key={technology.id} technology={technology} delay={index * 80} />
                ))}
              </div>
            </section>

            <section className="for-companies section-split" aria-labelledby="companies-title" data-reveal>
              <div><p className="section-label">For technology companies</p><h2 id="companies-title">Make the case for cover that fits.</h2></div>
              <div><p>Your deployment, safety controls and operating data belong in the insurance decision. We build the case for specialist cover and pricing that reflect how your technology actually operates.</p><ContactButton /></div>
            </section>

            <section className="partner-panel" aria-labelledby="partners-title" data-reveal>
              <div><p className="section-label">For brokers, underwriters and insurers</p><h2 id="partners-title">Understand new risks.<br />Reach new customers.</h2></div>
              <div><p>We bring you frontier-tech companies seeking specialist cover, together with the technical evidence to assess them.</p><p>Use a structured view of their operations, failure modes and controls to model exposure and inform pricing.</p><ContactButton variant="outline">Discuss a partnership</ContactButton></div>
            </section>

            <section className="process" aria-labelledby="process-title">
              <h2 id="process-title" data-reveal>From technical detail to an underwriting case.</h2>
              <ol className="process-list">
                <li data-reveal><h3>Understand the deployment</h3><p>Map what the technology does, where it operates and what it can affect.</p></li>
                <li data-reveal><h3>Model the exposure</h3><p>Bring together performance data, failure modes and safeguards to build a structured view of risk.</p></li>
                <li data-reveal><h3>Support the insurance decision</h3><p>Connect the evidence to discussions with brokers and insurers about coverage, terms and pricing.</p></li>
              </ol>
            </section>

            <section className="closing" aria-labelledby="closing-title" data-reveal><h2 id="closing-title">Pursue the upside.<br />Plan for the downside.</h2><ContactButton variant="butter" /></section>
          </div>
        </main>
        <footer className="site-footer"><a className="footer-brand" href="#top">Boundry</a><span>Robotics, autonomous systems and AI</span></footer>
      </div>
    </>
  )
}

export default App
