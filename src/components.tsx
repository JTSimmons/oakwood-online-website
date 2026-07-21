import type { ReactNode } from 'react'
import { ArrowDownRight, ArrowRight } from 'lucide-react'

export function SectionHeading({ eyebrow, title, intro, align = 'left' }: { eyebrow: string; title: string; intro?: string; align?: 'left' | 'center' }) {
  return (
    <header className={`section-heading section-heading--${align}`}>
      <p className="eyebrow"><span aria-hidden="true" />{eyebrow}</p>
      <h2>{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </header>
  )
}

export function LinkButton({ href, children, variant = 'primary', external = false }: { href: string; children: ReactNode; variant?: 'primary' | 'secondary' | 'text'; external?: boolean }) {
  return (
    <a className={`button button--${variant}`} href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      <span>{children}</span>{variant === 'text' ? <ArrowDownRight aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
    </a>
  )
}

export function OakMark() {
  return (
    <svg className="oak-mark" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 42V21m0 9-8-7m8 1 9-8M24 7c-7-5-14 1-11 8-8 1-8 12 0 14 2 7 12 7 15 1 8 3 13-6 8-11 4-7-5-15-12-12Z" />
    </svg>
  )
}

export function ScenePlaceholder({ variant, label }: { variant: string; label: string }) {
  return (
    <div className={`scene scene--${variant}`} role="img" aria-label={`Placeholder artwork: ${label}`}>
      <span className="scene__sun" />
      <span className="scene__ridge scene__ridge--back" />
      <span className="scene__ridge scene__ridge--front" />
      <span className="scene__tree scene__tree--one" />
      <span className="scene__tree scene__tree--two" />
      <span className="scene__subject" />
      <span className="scene__placeholder">Game screenshot coming soon</span>
    </div>
  )
}
