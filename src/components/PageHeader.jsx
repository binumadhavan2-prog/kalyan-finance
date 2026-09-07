import Draft from './Draft'

/**
 * The banner the inner pages open with, so they share a silhouette with the
 * home hero without repeating its scale.
 *
 * On --page, not --navy-deep. It used to carry `section--dark`, which put
 * About, Why Kalyan Finance and Contact a step below the ground their own
 * content sits on, while Loan Products — which has no banner — opened in plain
 * --page. Four inner pages, two different opening colours. This is the one they
 * now agree on. Nothing else moves with it: --ink-soft and --ink-invert-soft
 * are both --nav-soft, and --ink and --ink-invert are both white, so the
 * eyebrow, heading and lede render identically either side of the change
 * (white 13.5:1 and --nav-soft 6.5:1 on --navy, both clear).
 *
 * `drafted` is true by default because most page copy still is. Pass false
 * where the wording is client-approved, so it renders without the dotted mark.
 *
 * `image` is an optional backdrop, opt-in per page: the banner is plain --page
 * without it. It always renders under a scrim, because the type here is white
 * and soft-blue on whatever the image happens to be, and the page cannot know
 * that in advance. About, Why Kalyan Finance and Contact all pass the same
 * /page-header.webp; Loan Products is the one inner page with no banner at all.
 */
/* Hoisted, not inlined in the render: a component defined during render is a
   new type every pass, which remounts its subtree. */
function Plain({ children }) {
  return children
}

export default function PageHeader({
  eyebrow,
  title,
  lede,
  drafted = true,
  image = null,
}) {
  const Wrap = drafted ? Draft : Plain

  return (
    <section
      className={'section page-head' + (image ? ' page-head--image' : '')}
      style={image ? { backgroundImage: `url("${image}")` } : undefined}
    >
      <div className="shell stack">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="heading">
          <Wrap>{title}</Wrap>
        </h1>
        {lede ? (
          <p className="lede page-head__lede">
            <Wrap>{lede}</Wrap>
          </p>
        ) : null}
      </div>
    </section>
  )
}
