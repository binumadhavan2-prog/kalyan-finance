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

/**
 * Supplied 2026-09-05: the reasons to choose Kalyan Finance, for /why-us and
 * its preview on the home page.
 *
 * Terms only, exactly as `coreValues` is. No explanation is written under any
 * of them, because none was given — and the four drafted differentiators these
 * replaced are the reason that rule exists.
 */
export const whyPoints = [
  'Trust',
  'Transparency',
  'Customer-focused approach',
  'Simple process',
  'Local relationship',
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
  {
    id: 'business',
    title: 'Business Finance',
    icon: 'briefcase',
    /**
     * Client-supplied on 2026-09-05. Optional — not every product has one.
     * The intrinsic size travels with the file so the markup can reserve the
     * right box before it loads; these two are different shapes.
     */
    image: { src: '/product-business.webp', width: 1080, height: 960 },
  },
  {
    id: 'personal',
    title: 'Personal Finance Assistance',
    icon: 'person',
    /** Client-supplied on 2026-09-05. */
    image: { src: '/product-personal.jpg', width: 709, height: 433 },
  },
  {
    id: 'short-term',
    title: 'Short-Term Financial Support',
    icon: 'clock',
    /**
     * Client-supplied on 2026-09-05. Unlike the other two this is a finished
     * banner with its own type in it, so it is `wide` — squeezed into the side
     * column its body text renders at a few pixels and cannot be read. Text
     * baked into a picture is also invisible to a screen reader, hence `alt`.
     */
    image: {
      src: '/product-short-term.webp',
      width: 1536,
      height: 1024,
      wide: true,
      alt:
        'Short Term Financial Support from Kalyan Finance — quick financial ' +
        'solutions for your immediate needs: quick approval, flexible tenure ' +
        'and a hassle-free process.',
    },
  },
  {
    id: 'customer-focused',
    title: 'Customer-Focused Financial Solutions',
    icon: 'heart',
    /** Client-supplied on 2026-09-05. A finished banner, like short-term. */
    image: {
      src: '/product-customer-focused.webp',
      width: 1536,
      height: 1024,
      wide: true,
      alt:
        'Customer-Focused Financial Solutions from Kalyan Finance — tailored ' +
        'financial solutions designed around your needs, helping you manage ' +
        "today's requirements with confidence and plan for tomorrow: flexible " +
        'financial options, a quick and simple process, transparent terms, ' +
        'solutions tailored to your needs, and trusted customer support.',
    },
  },
  {
    id: 'tailored',
    title: 'Tailored Financial Support for Individuals and Businesses',
    icon: 'sliders',
    /** Client-supplied on 2026-09-05. A finished banner, 2:1 rather than 3:2. */
    image: {
      src: '/product-tailored.webp',
      width: 1774,
      height: 887,
      wide: true,
      alt:
        'Tailored Financial Support for Individuals and Businesses from ' +
        'Kalyan Finance — personalized solutions, flexible financial support, ' +
        'empowering growth and trusted partnership.',
    },
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

/**
 * Worked examples for /loan-products, shown under a standing "Illustrative
 * only" notice and with an Illustrative chip on every single one. The marking
 * is not decoration: an example on a lender's site is read as an offer unless
 * it is impossible to mistake for one.
 *
 * Empty on purpose. These are figures, and the rule at the top of this file
 * holds for them however they are labelled — an illustrative amount is still a
 * number a visitor will anchor on, so it comes from the client or not at all.
 *
 * Shape, once there is something to show:
 *   business: [{ id, scenario, amount, tenure, repayment, note }]
 * `scenario` says who the example is about, `note` anything that qualifies it.
 * Leave any field out and the row is simply not rendered.
 */
export const indicativeExamples = {
  business: [],
  personal: [],
  'short-term': [],
  'customer-focused': [],
  tailored: [],
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
  /** Full profile URL. Supplied by the client on 2026-09-05. */
  instagram: 'https://instagram.com/kal_yan_fin_ance',
  /** The same account as it is written for readers. */
  instagramHandle: '@kal_yan_fin_ance',
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
 * The 6-second brand animation beside the home hero copy. Unlike the
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
  ctaButton: 'Start a conversation',
  /* Sits under the buttons. Deliberately about effort and obligation rather
     than speed: a response time is a promise, and nobody has given us one. */
  ctaNote:
    'No documents needed to start — just tell us roughly what you are looking for.',

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

  indicativeTitle: 'Indicative examples',
  indicativeLede:
    'Worked examples of how an arrangement can be structured, to show the shape of it before you enquire.',
  /* The standing notice above the examples. Wording is drafted like everything
     else here, but the substance of it is not optional: whatever the client
     signs off has to say these are illustrations and not offers. */
  indicativeNotice:
    'Illustrative only. These are examples, not offers, and not a quotation. Nothing here is a commitment to lend, and the terms of any arrangement are confirmed for your own circumstances in writing before you sign.',
  indicativePending:
    'Examples will be published here once the figures behind them are confirmed. Until then, tell us what you need and we will talk it through.',

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
  /* Sits in the story section's empty-state panel. Says what is missing
     without pretending to be the history itself — how the business started
     and what it has done since is the client's to tell, not ours to draft. */
  storyPending:
    'How the business started, and what it has taken on since, will be told here once Kalyan Finance has set it down.',

  /* ---------- Why us ---------- */
  whyTitle: 'Why Kalyan Finance',
  whyLede:
    'What actually differs when you bring a requirement to us.',
  /* The four drafted differentiators that used to sit here (One point of
     contact, Terms in plain language, Fit before product, Available
     afterwards) were written to fill the band. Supplied wording replaced
     them — see `whyPoints` above. */

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

  differentiatorsTitle: "What's actually different",

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
