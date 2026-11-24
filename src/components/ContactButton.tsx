const bookingUrl = 'https://calendly.com/khalilismail616/ismail-boundry-meeting'

interface ContactButtonProps {
  children?: string
  variant?: 'outline' | 'butter'
}

export function ContactButton({ children = 'Discuss your insurance needs', variant }: ContactButtonProps) {
  return (
    <a
      className={`button${variant ? ` button--${variant}` : ''}`}
      data-ink=""
      href={bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${children} — opens scheduling in a new tab`}
    >
      <span className="button-label">{children}</span>
      <span className="button-ink" aria-hidden="true" />
    </a>
  )
}
