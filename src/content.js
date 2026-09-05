/**
 * All site copy lives here so wording can be changed without touching markup.
 *
 * Three tiers, and the distinction matters:
 *   - `company` / `services`  — supplied by the client, wording unchanged.
 *   - `contact` / `founder` /
 *     `recognition` / product
 *     eligibility              — FACTS nobody has given us. Left null so the
 *                                page renders a visible "Not supplied yet"
 *                                chip instead of an invented value.
 *   - `draft`                  — wording written to fill out the layout.
 *                                NOT approved by anyone.
 *
 * Anything in `draft` renders with a dotted underline so unapproved wording
 * cannot ship unnoticed. Replace the strings as the client confirms them, then
 * set `markDraftCopy` to false.
 *
 * Rule of thumb for this file: opinions and phrasing may be drafted. Numbers,
 * names, rates, eligibility rules and contact details may not — on a finance
 * site an invented figure is not a placeholder, it is a false claim.
 */

/** Set to false once every string in `draft` is client-approved. */
export const markDraftCopy = true

/** Client-supplied company facts, wording unchanged. */
export const company = {
  name: 'Kalyan Finance',
  /* Not in the company profile PDF, which is where the rest of this object
     comes from. Confirmed separately by the client on 2026-09-05. */
  tagline: 'Building Better Futures Together',
  established: '2023',
  type: 'Financial Services',
  location: 'Sivagangai, Tamil Nadu',
}

/**
 * Client-supplied vision statement, wording unchanged. Leads the home hero.
 * Not in `draft` and not underlined — this one is approved.
 */
export const vision =
  'To become one of the most trusted and respected financial service providers.'

/**
 * Client-supplied mission statement, wording unchanged. Sits beside the vision
 * on the About page, the pairing it arrived in.
 */
export const mission =
  'To provide accessible, ethical and dependable financial solutions that ' +
  'empower individuals and businesses.'

/**
 * Client-supplied core values, wording unchanged. Supplied as five terms and
 * nothing more: there is deliberately no body copy under each one, because
 * none was given and writing it would be putting words in the client's mouth.
 */
export const coreValues = [
  'Trust',
  'Integrity',
  'Transparency',
  'Customer Commitment',
  'Excellence',
]

/** Client-supplied About copy, wording unchanged. Leads the About page. */
export const about = {
  title: 'About Kalyan Finance',
  body:
    'Kalyan Finance is committed to providing reliable, transparent and ' +
    'customer-focused financial services. We support individuals and ' +
    'businesses with timely financial assistance while building long-term ' +
    'relationships based on trust, integrity and professionalism.',
}

/** Client-supplied service list, wording unchanged. */
export const services = [
  { id: 'business', title: 'Business Finance', icon: 'briefcase' },
  { id: 'personal', title: 'Personal Finance Assistance', icon: 'person' },
  { id: 'short-term', title: 'Short-Term Financial Support', icon: 'clock' },
  {
    id: 'customer-focused',
    title: 'Customer-Focused Financial Solutions',
    icon: 'heart',
  },
  {
    id: 'tailored',
    title: 'Tailored Financial Support for Individuals and Businesses',
    icon: 'sliders',
  },
]

/**
 * Per-product detail for /loan-products. `blurb` is drafted wording; every
 * other field is a factual term of the product and stays null until the client
 * supplies it. Do not fill amounts, tenures or eligibility rules from guesswork.
 */
export const productDetail = {
  business: { amount: null, tenure: null, eligibility: [], documents: [] },
  personal: { amount: null, tenure: null, eligibility: [], documents: [] },
  'short-term': { amount: null, tenure: null, eligibility: [], documents: [] },
  'customer-focused': { amount: null, tenure: null, eligibility: [], documents: [] },
  tailored: { amount: null, tenure: null, eligibility: [], documents: [] },
}

/** Client-supplied where filled in; the rest is not yet confirmed. */
export const contact = {
  phone: null,
  /** Confirmed by the client on 2026-09-05. */
  email: 'skalyansundaram24289@gmail.com',
  /** Town and state are known; the full postal address is not. */
  location: 'Sivagangai, Tamil Nadu',
  address: null,
  /** Google Maps embed or link for the location block. */
  mapUrl: null,
  /** Full profile URL, e.g. https://instagram.com/... */
  instagram: null,
  /**
   * Where the enquiry form POSTs. Null keeps the form visibly disabled rather
   * than silently dropping enquiries — there is no backend in this project.
   */
  formEndpoint: null,
  hours: null,
}

/**
 * The founder section on /about. Name, role and photograph are supplied; the
 * biography is not, and stays null rather than being written for him.
 */
export const founder = {
  name: 'Mr. Kalyana Sundaram S',
  role: 'Founder',
  bio: null,
  photo: '/founder.png',
}

/**
 * Awards, press and recognition. Empty on purpose. Populate with entries of
 * { id, title, issuer, year } once there is something real to list — a
 * fabricated award on a finance site is a serious misrepresentation.
 */
export const recognition = []

/**
 * A supplied clip for the recognition section. Never autoplayed and only its
 * metadata is preloaded, so the file is not pulled down until someone presses
 * play — it is large, and most visitors will not watch it.
 */
export const recognitionVideo = '/recognition.mp4'

/**
 * The 6-second brand animation that opens the home page. Unlike the
 * recognition clip this one autoplays, which is only defensible because it is
 * under a megabyte and silent — it carries no audio track at all, so there is
 * nothing to unmute and nothing to interrupt.
 *
 * It renders one unconfirmed fact: the contact card shows a visible
 * "PHONE - TO BE SUPPLIED" placeholder, matching the null in `contact`. Replace
 * the number in `video/edit.jsx` and re-render before this ships.
 */
export const heroVideo = '/kalyan-finance-6s.mp4'

/** Figures for the stats band. Left null on purpose; see the note above. */
export const stats = [
  { id: 'established', value: '2023', label: 'Established' },
  { id: 'clients', value: null, label: 'Clients supported' },
  { id: 'turnaround', value: null, label: 'Typical turnaround' },
]

/** Provisional wording. Every string here needs client sign-off. */
export const draft = {
  /* ---------- Home ---------- */
  heroTitle: 'Finance that fits the way you actually work',
  heroLede:
    'Business and personal finance support, arranged around your circumstances rather than a fixed product list.',

  productPreviewTitle: 'What we do',
  productPreviewLede:
    'Five ways we help individuals and businesses find the right financial footing.',

  /* The drafted "How we work" values that used to sit here (Direct, Clear,
     Flexible) were invented to fill the band. The client has since supplied
     their own five core values, so the real ones ship instead — see
     `coreValues` above. */

  recognitionTitle: 'Recognition',
  recognitionEmpty:
    'Awards and press coverage will be listed here once there is something confirmed to show.',

  statsTitle: 'By the numbers',

  ctaTitle: 'Talk to us about what you need',
  ctaBody: 'A first conversation costs nothing and commits you to nothing.',
  ctaButton: 'Get in touch',

  /* ---------- Loan products ---------- */
  productsTitle: 'Loan products',
  productsLede:
    'Each of these starts with a conversation about what you need the money to do. Terms are confirmed in writing before anything is signed.',
  productBlurbs: {
    business:
      'Funding for working capital, equipment and growth, structured around how the business actually earns.',
    personal:
      'Help arranging personal borrowing, with the trade-offs explained before you commit.',
    'short-term':
      'Bridging a defined gap, with a clear repayment date agreed at the outset.',
    'customer-focused':
      'Where the standard products do not fit, we look at what will.',
    tailored:
      'Arrangements built for a specific situation rather than a category.',
  },

  termsPending:
    'Amounts, tenure, eligibility and the documents needed are confirmed for your situation before you commit to anything.',

  eligibilityTitle: 'Eligibility',
  eligibilityLede:
    'Eligibility depends on the product and on your circumstances. The criteria below are confirmed per product before you apply.',

  howToApplyTitle: 'How to apply',
  applySteps: [
    {
      id: 'enquire',
      title: 'Send an enquiry',
      body: 'Tell us what you need and when. No documents at this stage.',
    },
    {
      id: 'review',
      title: 'We review the fit',
      body: 'We come back on which products realistically suit your situation.',
    },
    {
      id: 'documents',
      title: 'Prepare documents',
      body: 'We tell you exactly what is needed so nothing is gathered twice.',
    },
    {
      id: 'decision',
      title: 'Decision and terms',
      body: 'Terms confirmed in writing before you commit to anything.',
    },
  ],

  /* ---------- About ----------
     The page intro is client-approved and lives in `about` above; only the
     founder label is still drafted here. */
  founderTitle: 'Founder',

  /* ---------- Why us ---------- */
  whyTitle: 'Why Kalyan Finance',
  whyLede:
    'What actually differs when you bring a requirement to us.',
  differentiators: [
    {
      id: 'one-contact',
      title: 'One point of contact',
      body: 'The person you speak to first stays with your case to completion.',
    },
    {
      id: 'plain-terms',
      title: 'Terms in plain language',
      body: 'Costs, timelines and obligations written out before you sign.',
    },
    {
      id: 'fit-first',
      title: 'Fit before product',
      body: 'We establish what the money needs to do before discussing how it is structured.',
    },
    {
      id: 'after',
      title: 'Available afterwards',
      body: 'We stay reachable once an arrangement is in place, not just until it completes.',
    },
  ],

  processTitle: 'How it works',
  steps: [
    {
      id: 'talk',
      title: 'Talk it through',
      body: 'Tell us what you need and when you need it. No paperwork at this stage.',
    },
    {
      id: 'assess',
      title: 'Assess the options',
      body: 'We work out which forms of support realistically fit your circumstances.',
    },
    {
      id: 'arrange',
      title: 'Arrange the finance',
      body: 'Paperwork prepared and submitted, with the terms confirmed in writing.',
    },
    {
      id: 'support',
      title: 'Stay in touch',
      body: 'We remain available once the arrangement is in place, not just until it completes.',
    },
  ],

  differentiatorsTitle: 'What actually differs',

  trustTitle: 'Trust factors',
  /* This used to be a note to the client about what belonged here, which was
     rendering on the live page. It now reads as site copy; the note moved to
     `trustPending`, which sits inside the visible empty-state panel. */
  trustLede:
    'Who we are, where we work from, and the details that let you check us out before you commit to anything.',
  trustPending:
    'Registration number, regulatory status and any professional memberships will be listed here once confirmed.',

  /* ---------- Contact ---------- */
  contactTitle: 'Contact us',
  contactLede:
    'Tell us roughly what you need and we will come back to you.',
  formTitle: 'Send an enquiry',
  locationTitle: 'Where to find us',
  followTitle: 'Follow',

  /* ---------- 404 ---------- */
  notFoundTitle: 'That page has moved or never existed',
  notFoundBody:
    'The link may be out of date. The pages below cover everything on the site.',

  /* ---------- Generic error ---------- */
  errorTitle: 'Something went wrong at our end',
  errorBody:
    'The page failed to load. Reloading usually clears it; if not, get in touch and we will look into it.',
}
