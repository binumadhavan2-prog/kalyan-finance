# Kalyan Finance

Static marketing site. React + Vite + React Router, no backend — builds to plain
files in `dist/`.

## Commands

```
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run preview  # serve the production build
npm run lint
```

## Pages

| Page              | Route            |
| ----------------- | ---------------- |
| Home              | `/`              |
| Loan Products     | `/loan-products` |
| About Us          | `/about`         |
| Why Kalyan        | `/why-us`        |
| Contact Us        | `/contact`       |
| Not found         | any other path   |

Routing is client-side (`BrowserRouter`). **The host must rewrite unknown paths
to `index.html`**, or a hard refresh on `/about` will 404 at the CDN before
React ever loads. On Netlify that is a `_redirects` file with
`/* /index.html 200`; on Vercel a `rewrites` entry; on nginx `try_files`. The
dev server already does this, so the failure only shows up in production.

## Layout

- `src/index.css` — design tokens (colour, spacing, type) and the base reset.
- `src/App.css` — layout primitives: `.shell`, `.section`, `.stack`, `.btn`.
- `src/App.jsx` — routes.
- `src/components/Layout.jsx` — header, footer, per-route `<title>`, scroll reset.
- `src/pages/` — one file per route.
- `src/content.js` — all site copy and data.

## Content rules

`src/content.js` separates three tiers, and the split is deliberate:

- `company`, `services` — **client-supplied**, wording unchanged.
- `contact`, `founder`, `recognition`, `productDetail`, `stats` — **facts nobody
  has given us**. Left `null`/empty so the page renders a visible
  "Not supplied yet" chip. Do not fill these from guesswork: an invented rate,
  eligibility rule or award on a finance site is a false claim, not a placeholder.
- `draft` — **wording written to fill out the layout, approved by nobody.**
  Renders with a dotted underline. Set `markDraftCopy = false` once signed off.

## Open items

- All `draft` copy needs client sign-off.
- Contact details, founder profile, recognition, product terms and eligibility
  are unsupplied.
- The enquiry form has nowhere to POST (`contact.formEndpoint` is `null`), so it
  validates and then blocks submission rather than dropping enquiries silently.
- Brand palette is committed greyscale; `--accent` in `src/index.css` is the
  single token to change.
- `index.html` carries a hand-written meta description that is not client-approved.
