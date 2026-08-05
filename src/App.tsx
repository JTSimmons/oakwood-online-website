import { useState } from 'react'
import { Menu, X, ExternalLink } from 'lucide-react'
import { siteContent } from './data/siteContent'
import { LinkButton, ScenePlaceholder, SectionHeading } from './components'

function Navigation() {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Oakwood Online home">
        <img className="brand-logo" src={`${import.meta.env.BASE_URL}assets/oakwood-online-logo.webp`} alt="" width="919" height="280" />
      </a>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-nav" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>
      <nav id="main-nav" className={open ? 'main-nav main-nav--open' : 'main-nav'} aria-label="Main navigation">
        {siteContent.navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
        <a className="nav-cta" href="#playtest" onClick={() => setOpen(false)}>Steam Playtest</a>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}assets/oakwood-header.webp)` }}>
      <Navigation />
      <div className="hero__content page-shell">
        <p className="eyebrow"><span aria-hidden="true" />{siteContent.hero.eyebrow}</p>
        <h1>{siteContent.hero.title}</h1>
        <p className="hero__copy">{siteContent.hero.description}</p>
        <div className="hero__actions">
          <LinkButton href={siteContent.hero.primaryCta.href}>{siteContent.hero.primaryCta.label}</LinkButton>
          <LinkButton href={siteContent.hero.secondaryCta.href} variant="text">{siteContent.hero.secondaryCta.label}</LinkButton>
        </div>
      </div>
      <div className="hero__foot page-shell"><span>Oakwood is growing</span><a href="#world">Discover what awaits <span aria-hidden="true">↓</span></a></div>
    </section>
  )
}

function Overview() {
  return (
    <section className="section overview" id="world">
      <div className="page-shell overview__grid">
        <SectionHeading eyebrow={siteContent.overview.eyebrow} title={siteContent.overview.title} />
        <div className="overview__copy">{siteContent.overview.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </div>
      <div className="page-shell value-strip">
        {siteContent.overview.values.map((item, index) => <div className="value" key={item.value}><span>0{index + 1}</span><strong>{item.value}</strong><small>{item.label}</small></div>)}
      </div>
    </section>
  )
}

function Features() {
  return (
    <section className="section features" id="features">
      <div className="page-shell">
        <SectionHeading eyebrow="Ways to live" title="Make your place in the world" intro="Oakwood’s systems are connected by one idea: useful work should feel meaningful, especially when it is shared." />
        <div className="feature-grid">
          {siteContent.features.map(({ icon: Icon, number, title, description }) => (
            <article className="feature-card" key={title}>
              <div className="feature-card__top"><Icon aria-hidden="true" /><span>{number}</span></div>
              <h3>{title}</h3><p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Screenshots() {
  return (
    <section className="section gallery" aria-label="Oakwood development screenshots">
      <div className="page-shell">
        <div className="gallery__heading"><SectionHeading eyebrow="From the world" title="See Oakwood take shape" /><p>Development imagery will be added here as the world becomes ready to share.</p></div>
        <div className="gallery-grid">
          {siteContent.screenshots.map((shot, index) => (
            <figure className={index === 0 ? 'screenshot screenshot--large' : 'screenshot'} key={shot.title}>
              <ScenePlaceholder variant={shot.variant} label={shot.title} />
              <figcaption><span>{shot.label}</span><strong>{shot.title}</strong></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function Development() {
  return (
    <section className="section development-preview" id="development">
      <div className="page-shell development-preview__grid">
        <div>
          <SectionHeading eyebrow="Development notes" title="Building the world, and the systems behind it." />
          <p className="development-preview__copy">Devlogs follow Oakwood’s progress. Engineering notes go deeper into the Unity, FishNet, Steam, and backend decisions behind the game.</p>
          <LinkButton href="/development/" variant="text">Browse development notes</LinkButton>
        </div>
        <div className="publication-preview-list">
          {siteContent.publications.map((publication) => <article className="publication-preview-card" key={publication.href}>
            <p className="publication-preview-card__meta">{publication.type} · {publication.readTime}</p>
            <h3><a href={publication.href}>{publication.title}</a></h3>
            <p>{publication.description}</p>
            <a className="publication-preview-card__link" href={publication.href}>Read the {publication.type.toLowerCase()} <span aria-hidden="true">→</span></a>
          </article>)}
        </div>
      </div>
    </section>
  )
}

function CallsToAction() {
  return (
    <section className="community" id="community" aria-label="Join the Oakwood Online community">
      <article className="cta-panel cta-panel--steam" id="playtest">
        <div><p className="eyebrow"><span aria-hidden="true" />Coming to Steam Playtest</p><h2>Be there when the gates first open.</h2><p>Play early builds, help test the world, and leave your mark on what Oakwood becomes.</p></div>
        <LinkButton href={siteContent.links.steam}>Steam page coming soon</LinkButton>
      </article>
      <article className="cta-panel cta-panel--discord">
        <div><p className="eyebrow"><span aria-hidden="true" />Join the campfire</p><h2>Follow development on Discord.</h2><p>See work in progress, meet future neighbors, and help shape the community from the beginning.</p></div>
        <LinkButton href={siteContent.links.discord} variant="secondary" external>Join the Discord</LinkButton>
      </article>
    </section>
  )
}

function FAQ() {
  return (
    <section className="section faq" id="faq">
      <div className="page-shell faq__grid">
        <div><SectionHeading eyebrow="Questions & answers" title="Before you set out" /><p>More details will be shared as development and playtesting progress.</p></div>
        <div className="faq-list">
          {siteContent.faq.map((item, index) => <details key={item.question} open={index === 0}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="page-shell footer__top">
        <a className="brand brand--footer" href="#top"><img className="brand-mark" src={`${import.meta.env.BASE_URL}assets/oakwood-emblem.webp`} alt="" width="44" height="44" /><span><strong>Oakwood</strong><small>Online</small></span></a>
        <p>A medieval world built by hand.<br />An independent game in development.</p>
        <div className="footer__links"><a href="#playtest">Steam <ExternalLink aria-hidden="true" /></a><a href={siteContent.links.discord} target="_blank" rel="noreferrer">Discord <ExternalLink aria-hidden="true" /></a></div>
      </div>
      <div className="page-shell footer__bottom"><span>© {new Date().getFullYear()} Oakwood Online</span><span>All footage and features are work in progress.</span></div>
    </footer>
  )
}

export default function App() {
  return <><Hero /><main><Overview /><Features /><Screenshots /><Development /><CallsToAction /><FAQ /></main><Footer /></>
}
