import { ContactButton } from '../components/ContactButton'

const partnershipBenefits = [
  {
    title: 'Relevant AI opportunities',
    body: 'Connect with companies building and deploying AI, from software agents to robots working on customer sites.',
    className: 'opportunities',
  },
  {
    title: 'Evidence you can question',
    body: 'Understand how a system operates, how it can fail and what supports its safeguards. See where evidence is still missing.',
    className: 'evidence',
  },
  {
    title: 'Your appetite, from the start',
    body: 'Help define the technologies, activities and deployment stages you want to see, alongside the information your team needs.',
    className: 'appetite',
  },
]

export function InsurersPage() {
  return (
    <article className="detail-page insurers-page">
      <nav className="detail-breadcrumbs" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">For insurers</span>
      </nav>

      <section className="detail-hero insurer-hero" aria-labelledby="insurers-title">
        <div className="detail-hero-copy" data-reveal>
          <p className="section-label">For carriers, MGAs and insurance partners</p>
          <h1 id="insurers-title">New AI opportunities. The technical evidence to assess them.</h1>
          <p className="detail-intro">Partner with Boundry to source physical and digital AI opportunities and translate system design, testing and safeguards into clear underwriting evidence. Help shape the types of business and submissions we bring to you.</p>
          <ContactButton>Discuss your appetite</ContactButton>
        </div>
        <div className="assessment-sheet-frame" data-reveal data-delay="100" data-tilt="5">
          <div className="assessment-sheet card-surface">
            <p className="section-label">Inside a technical assessment</p>
            <div className="assessment-sheet-heading">
              <span className="assessment-sheet-mark" aria-hidden="true"><span /><span /><span /></span>
              <h2>The system behind the submission.</h2>
            </div>
            <dl>
              <div><dt>Operating context</dt><dd>What it does, where it runs and who is exposed.</dd></div>
              <div><dt>Failure scenarios</dt><dd>How things could go wrong and what the consequences could be.</dd></div>
              <div><dt>Safeguards & evidence gaps</dt><dd>Controls, test results and the assumptions that need checking.</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="detail-section partnership-section" aria-labelledby="partnership-title">
        <div className="detail-section-heading" data-reveal>
          <p className="section-label">Working together</p>
          <h2 id="partnership-title">Bring unfamiliar technology<br />into a useful conversation.</h2>
        </div>
        <ul className="partnership-benefits">
          {partnershipBenefits.map((item, index) => (
            <li key={item.title} className={`partnership-benefit--${item.className}`} data-reveal data-delay={index * 60} data-tilt="4">
              <div className="partnership-benefit card-surface">
                <span className="benefit-mark" aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="insurer-expertise detail-section" aria-labelledby="insurer-expertise-title">
        <div data-reveal>
          <p className="section-label">Why Boundry</p>
          <h2 id="insurer-expertise-title">Technical expertise<br />on your side of the table.</h2>
          <p className="insurer-credentials">Our background combines AI and cybersecurity PhD research funded by Cisco with engineering experience at AWS.</p>
        </div>
        <div className="appetite-note" data-reveal>
          <h3>Start with what you want to understand.</h3>
          <p>Tell us which AI businesses interest you, where you write and the evidence you need to consider a risk. We can explore where sourcing and technical assessment would be useful.</p>
          <a className="text-link" href="/#who-we-help">Explore the companies we focus on</a>
        </div>
      </section>

      <section className="detail-closing" aria-labelledby="insurer-cta-title" data-reveal>
        <div>
          <p className="section-label">Build the relationship early</p>
          <h2 id="insurer-cta-title">Let’s talk about your appetite for AI.</h2>
        </div>
        <div className="detail-closing-actions">
          <ContactButton variant="butter">Discuss your appetite</ContactButton>
          <a className="text-link" href="/#who-we-help">Building an AI company?</a>
        </div>
      </section>
    </article>
  )
}
