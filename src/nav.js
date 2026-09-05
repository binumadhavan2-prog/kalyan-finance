/**
 * Primary navigation, shared by the header, the footer and the 404 page.
 *
 * `end` on Home stops NavLink marking it active on every route: "/" is a
 * prefix of every other path, so without it Home would highlight everywhere.
 */
export const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/loan-products', label: 'Loan Products' },
  { to: '/about', label: 'About' },
  { to: '/why-us', label: 'Why Kalyan Finance' },
  { to: '/contact', label: 'Contact Us' },
]
