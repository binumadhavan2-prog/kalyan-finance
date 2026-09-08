import Draft from './Draft'

/**
 * The banner the inner pages open with, so they share a silhouette with the
 * home hero without repeating its scale.
 *
 * On --navy-deep, a step below the ground the sections under it sit on, so the
 * banner reads as its own band and the page has an edge under its heading.
 *
 * It sat on --page for a while, and the reason was Loan Products: that page had
 * no banner and opened in plain --page, so putting the other three a step down
 * left four inner pages with two different opening colours. All four carry
 * /page-header.webp now, so they step together and the flat version has nothing
 * left to argue for it. Nothing else moves with the ground: --ink-soft and
 * --ink-invert-soft are both --nav-soft, --ink and --ink-invert are both white,
 * and both clear easily on the deeper band (white 15.8:1, --nav-soft 7.6:1).
 *
 * `drafted` is true by default because most page copy still is. Pass false
 * where the wording is client-approved, so it renders without the dotted mark.
 *
 * `image` is an optional backdrop, opt-in per page: the banner is plain --page
 * without it. It always renders under a scrim, because the type here is white
 * and soft-blue on whatever the image happens to be, and the page cannot know
 * that in advance. All four inner pages pass the same /page-header.webp; a page
 * that passes none gets the band flat, which is the same step either way.
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
