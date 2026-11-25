import { ContactButton } from '../components/ContactButton'
import { TechnologyDiagram } from '../components/TechnologyCard'
import type { Sector } from '../data/sectors'

export function SectorPage({ sector }: { sector: Sector }) {
  return (
    <article className={`detail-page detail-page--${sector.id}`}>
      <nav className="detail-breadcrumbs" aria-label="Breadcrumb">
        <a href="/#who-we-help">Who we help</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{sector.name}</span>
      </nav>

      <section className="detail-hero" aria-labelledby="sector-title">
        <div className="detail-hero-copy" data-reveal>
          <p className="section-label">{sector.kicker}</p>
          <h1 id="sector-title">{sector.title}</h1>
          <p className="detail-intro">{sector.description}</p>
          <ContactButton>Talk through your deployment</ContactButton>
        </div>
        <div className="sector-art-frame" data-reveal data-delay="100" data-tilt="6">
          <div className="sector-art card-surface">
            <div className="sector-art-orbit" aria-hidden="true" />
            <TechnologyDiagram category={sector.id} />
            <div className="sector-examples">
              <p className="section-label">Built for companies working on</p>
              <ul>{sector.examples.map((example) => <li key={example}>{example}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-section coverage-section" aria-labelledby="coverage-title">
        <div className="detail-section-heading" data-reveal>
          <p className="section-label">Start with the exposure</p>
          <h2 id="coverage-title">What could go wrong.<br />What cover could help.</h2>
          <p>Explore the situations below. The right cover depends on your operations, contracts and policy wording.</p>
        </div>
        <ul className="coverage-list">
          {sector.coverage.map((item, index) => (
            <li key={item.scenario} data-reveal data-delay={index * 50}>
              <details className="coverage-item" open={index === 0}>
                <summary>
                  <h3>{item.scenario}</h3>
                  <span className="coverage-line">{item.cover}</span>
                  <span className="disclosure-symbol" aria-hidden="true"><span /><span /></span>
                </summary>
                <div className="coverage-explanation"><p>{item.detail}</p></div>
              </details>
            </li>
          ))}
        </ul>
      </section>

      <section className="detail-gap" aria-labelledby="gap-title" data-reveal>
        <div>
          <p className="section-label">Where a standard approach can fall short</p>
          <h2 id="gap-title">{sector.gap.title}</h2>
        </div>
        <p>{sector.gap.body}</p>
      </section>

      <section className="detail-section assessment-section" aria-labelledby="assessment-title">
        <div className="assessment-main">
          <div className="detail-section-heading" data-reveal>
            <p className="section-label">How Boundry helps</p>
            <h2 id="assessment-title">Make the technical detail useful.</h2>
            <p>We gather and assess the evidence behind your system, helping insurers understand the deployment and the questions that still need answers.</p>
          </div>
          <dl className="evidence-list">
            {sector.evidence.map((item, index) => (
              <div key={item.title} data-reveal data-delay={index * 50}>
                <dt>{item.title}</dt>
                <dd>{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
        <aside className="detail-expertise-frame" aria-labelledby="expertise-title" data-reveal data-tilt="5">
          <div className="detail-expertise card-surface">
            <span className="proof-mark" aria-hidden="true" />
            <p className="section-label">Why Boundry</p>
            <h3 id="expertise-title">Built by technical experts.</h3>
            <p>Our background combines AI and cybersecurity PhD research funded by Cisco with engineering experience at AWS.</p>
          </div>
        </aside>
      </section>

      <section className="detail-closing" aria-labelledby="sector-cta-title" data-reveal>
        <div>
          <p className="section-label">Your next step</p>
          <h2 id="sector-cta-title">{sector.ctaTitle}</h2>
        </div>
        <div className="detail-closing-actions">
          <ContactButton variant="butter">Talk through your deployment</ContactButton>
          <a className="text-link" href="/#who-we-help">Explore other sectors</a>
        </div>
      </section>

      <div className="detail-notes">
        <p>These examples are a starting point for a conversation, not a coverage recommendation or offer of insurance. Cover is subject to underwriting, policy terms and availability.</p>
        <details className="source-notes">
          <summary>Sources and further reading</summary>
          <ul>{sector.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<span className="visually-hidden"> (opens in a new tab)</span></a></li>)}</ul>
        </details>
      </div>
    </article>
  )
}
