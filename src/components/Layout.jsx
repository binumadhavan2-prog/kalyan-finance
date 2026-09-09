import { useEffect, useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useCopy } from '../i18n'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import ScrollProgress from './ScrollProgress'

export default function Layout() {
  const { company, ui } = useCopy()
  const { pathname } = useLocation()

  /*
   * A single-page app keeps one <title> for every route unless something
   * updates it. Titles matter here: they are what shows in tabs, bookmarks
   * and results.
   *
   * Built inside the component rather than at module load, because the
   * words in it change with the language while the paths do not.
   */
  const titles = useMemo(
    () => ({
      '/': company.name,
      '/loan-products': `${ui.titleLoanProducts} — ${company.name}`,
      '/about': `${ui.titleAbout} — ${company.name}`,
      '/why-us': `${ui.titleWhy} ${company.name}`,
      '/contact': `${ui.titleContact} — ${company.name}`,
    }),
    [company, ui],
  )

  useEffect(() => {
    document.title = titles[pathname] ?? `${ui.titleNotFound} — ${company.name}`
  }, [pathname, titles, ui, company])

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
        {ui.skipToContent}
      </a>
      <SiteHeader />
      {/*
       * Every route, not just the home page, since 2026-09-09.
       *
       * Here rather than in each page for the reason the masthead and footer
       * are here: it belongs to the frame around a route, not to any route.
       * It reads document.documentElement, so it needs nothing from the page
       * under it, and the effect that drives it re-runs on scroll rather than
       * on navigation — the route change resets the scroll position above and
       * the bar's own scroll listener follows it down to zero.
       *
       * On a page shorter than the viewport the component holds the fill at
       * zero, so what is left is the 3px primary track. On the inner pages
       * that track sits between the primary masthead and the primary banner
       * and cannot be seen at all; on the home page it reads as a rule under
       * the masthead, which is what it already did there.
       */}
      <ScrollProgress />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  )
}
