import Draft from './Draft'

/**
 * The banner the inner pages open with, so they share a silhouette with the
 * home hero without repeating its scale.
 *
 * On --primary-deep, a step below the ground the sections under it sit on, so the
 * banner reads as its own band and the page has an edge under its heading.
 *
 * It sat on --page for a while, and the reason was Loan Products: that page had
 * no banner and opened in plain --page, so putting the other three a step down
 * left four inner pages with two different opening colours. All four carry
 * /page-header.webp now, so they step together and the flat version has nothing
 * left to argue for it. Nothing else moves with the ground: --ink-soft and
 * --ink-invert-soft are both --primary-soft, --ink and --ink-invert are both white,
 * and both clear easily on the deeper band (white 15.8:1, --primary-soft 7.6:1).
 *
 * `drafted` is true by default because most page copy still is. Pass false
 * where the wording is client-approved, so it renders without the dotted mark.
 *
 * `fill` opts the banner into the home hero's opening: one screen tall, the
 * copy centred in it, rather than the shorter band the other inner pages take.
 * Off by default — it is the opening of a page whose banner IS the arrival, not
 * a heading over the sections below it.
 *
 * `children` render under the lede, for a page that puts its way onward in the
 * banner rather than in a band below it. The banner is primary on a light page, so
 * it carries .section--dark like any other inverted band — that is what hands
 * the copy, the buttons and anything in the aside the invert pair.
 *
 * `aside` is a second column beside the copy, the way the home hero puts the
 * clip beside its lockup. It goes with `fill` in practice: a screen-tall banner
 * carrying one heading and a button row is mostly empty primary, and the width is
 * where the emptiness shows. Without it the copy keeps the full shell, which is
 * what the three banners that pass no aside want.
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
  fill = false,
  aside = null,
  children = null,
}) {
  const Wrap = drafted ? Draft : Plain

  return (
    <section
      className={
        'section section--dark page-head' +
        (image ? ' page-head--image' : '') +
        (fill ? ' page-head--fill' : '')
      }
      style={image ? { backgroundImage: `url("${image}")` } : undefined}
    >
      {/* The copy is its own .stack inside the shell rather than being the
          shell, so the shell is free to become a two-column grid when there is
          an aside to put beside it. With no aside the grid is one column and
          this is the same box it always was. */}
      <div className={'shell' + (aside ? ' page-head__grid' : '')}>
        <div className="stack">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1 className="heading">
            <Wrap>{title}</Wrap>
          </h1>
          {lede ? (
            <p className="lede page-head__lede">
              <Wrap>{lede}</Wrap>
            </p>
          ) : null}
          {children}
        </div>
        {aside}
      </div>
    </section>
  )
}
