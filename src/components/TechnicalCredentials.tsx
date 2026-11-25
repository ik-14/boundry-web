export function TechnicalCredentials({ className = 'credentials' }: { className?: string }) {
  return (
    <p className={`technical-credentials ${className}`}>
      Our background combines AI and cybersecurity PhD research funded by{' '}
      <img className="credential-logo credential-logo--cisco" src="/assets/brands/cisco.svg" alt="Cisco" width="108" height="57" loading="lazy" decoding="async" />
      {' '}with engineering experience at{' '}
      <span className="credential-brand"><img className="credential-logo credential-logo--aws" src="/assets/brands/aws.svg" alt="AWS" width="478" height="296" loading="lazy" decoding="async" />.</span>
    </p>
  )
}
