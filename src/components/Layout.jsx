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
