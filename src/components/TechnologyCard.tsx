import { useEffect, useLayoutEffect, useReducer, useRef } from 'react'
import type { Technology } from '../data/technologies'

interface CardState {
  inside: boolean
  focused: boolean
  pinned: boolean
  suppressed: boolean
}

type CardAction =
  | { type: 'enter' }
  | { type: 'leave' }
  | { type: 'focus'; visible: boolean }
  | { type: 'blur' }
  | { type: 'toggle' }
  | { type: 'escape' }

const initialState: CardState = { inside: false, focused: false, pinned: false, suppressed: false }
const hoverQuery = '(hover: hover) and (pointer: fine)'

function cardReducer(state: CardState, action: CardAction): CardState {
  switch (action.type) {
    case 'enter': return { ...state, inside: true, suppressed: false }
    case 'leave': return { ...state, inside: false, suppressed: state.focused && state.suppressed }
    case 'focus': return { ...state, focused: action.visible, suppressed: !action.visible && state.suppressed }
    case 'blur': return { ...state, focused: false, suppressed: state.inside && state.suppressed }
    case 'toggle': return { ...state, pinned: !state.pinned, suppressed: state.pinned }
    case 'escape': return { ...state, pinned: false, suppressed: true }
  }
}

interface TechnologyCardProps {
  technology: Technology
  delay: number
}

export function TechnologyCard({ technology, delay }: TechnologyCardProps) {
  const [state, dispatch] = useReducer(cardReducer, initialState)
  const cardRef = useRef<HTMLElement>(null)
  const open = state.pinned || (!state.suppressed && (state.inside || state.focused))
  const actionLabel = state.pinned ? 'Close' : open ? 'Keep open' : 'Explore'
  const detailsId = `risk-${technology.id}`

  // These two classes share the element with pointer lighting and reveal
  // classes owned by the motion hook, so avoid overwriting its class list.
  useLayoutEffect(() => {
    cardRef.current?.classList.toggle('is-details-open', open)
    cardRef.current?.classList.toggle('is-details-pinned', state.pinned)
  }, [open, state.pinned])

  useEffect(() => {
    const hover = window.matchMedia(hoverQuery)
    const resetHover = () => dispatch({ type: 'leave' })
    hover.addEventListener('change', resetHover)
    return () => hover.removeEventListener('change', resetHover)
  }, [])

  return (
    <article
      ref={cardRef}
      className="domain-card"
      data-card-name={technology.name}
      data-tilt=""
      data-reveal=""
      data-delay={delay || undefined}
      onPointerEnter={(event) => {
        if (event.pointerType !== 'touch' && window.matchMedia(hoverQuery).matches) {
          dispatch({ type: 'enter' })
        }
      }}
      onPointerLeave={() => dispatch({ type: 'leave' })}
      onPointerCancel={() => dispatch({ type: 'leave' })}
    >
      <div className="card-surface">
        <div className="card-front" aria-hidden={open} inert={open}>
          <div className="domain-image">
            <img src={technology.image} alt={technology.imageAlt} loading="lazy" decoding="async" width={technology.imageWidth} height={technology.imageHeight} />
          </div>
          <div className="domain-copy">
            <h3>{technology.name}</h3>
            <p>{technology.summary}</p>
          </div>
        </div>
        <div className="risk-details" id={detailsId} aria-hidden={!open} inert={!open}>
          <h3>{technology.name}</h3>
          <dl>
            <div><dt>Risk scenarios</dt><dd>{technology.risk}</dd></div>
            <div><dt>Evidence we examine</dt><dd>{technology.evidence}</dd></div>
            <div><dt>Insurance questions</dt><dd>{technology.questions}</dd></div>
          </dl>
        </div>
        <button
          className="domain-toggle"
          type="button"
          aria-controls={detailsId}
          aria-expanded={open}
          aria-label={`${actionLabel} ${technology.name.toLowerCase()} risks`}
          onFocus={(event) => dispatch({ type: 'focus', visible: event.currentTarget.matches(':focus-visible') })}
          onBlur={() => dispatch({ type: 'blur' })}
          onClick={() => dispatch({ type: 'toggle' })}
          onKeyDown={(event) => {
            if (event.key === 'Escape' && open) {
              dispatch({ type: 'escape' })
              event.preventDefault()
              event.stopPropagation()
            }
          }}
        >
          <span className="card-hint" aria-hidden="true">
            <span className="card-hint-label">{actionLabel}</span>
            <span className="card-plus" />
          </span>
        </button>
      </div>
    </article>
  )
}
