import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { company } from '../content'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'

/**
 * A single-page app keeps one <title> for every route unless something updates
 * it. Titles matter here: they are what shows in tabs, bookmarks and results.
 */
const titles = {
  '/': company.name,
  '/loan-products': `Loan Products — ${company.name}`,
  '/about': `About Us — ${company.name}`,
  '/why-us': `Why ${company.name}`,
  '/contact': `Contact Us — ${company.name}`,
}

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = titles[pathname] ?? `Page not found — ${company.name}`
  }, [pathname])

  // Client-side navigation keeps the previous scroll position otherwise.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  /*
   * Sections fade and rise as they come into view.
   *
   * The hidden state is applied here rather than in the stylesheet, and that
   * is the whole safety argument: with no JavaScript, no IntersectionObserver
   * or reduced motion asked for, the class is never added and every section
   * renders plainly. Content is never hidden by a stylesheet that something
   * else has to come along and un-hide.
   *
   * Only sections starting below the fold are touched. Animating what is
   * already on screen at load would flash the hero in after the paint.
   */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        }
      },
      // A touch inside the bottom edge, so a section starts moving once it is
      // properly in view rather than the instant its first pixel appears.
      { rootMargin: '0px 0px -12% 0px' },
    )

    const sections = document.querySelectorAll('#main .section')
    for (const section of sections) {
      if (section.getBoundingClientRect().top < window.innerHeight) continue
      section.classList.add('reveal')
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [pathname])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  )
}
