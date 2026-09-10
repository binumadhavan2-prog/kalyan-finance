import Draft from './Draft'

/**
 * The banner the inner pages open with, so they share a silhouette with the
 * home hero without repeating its scale.
 *
 * On --hero-ground since 2026-09-09 — the home hero's own lavender, asked for
 * outright so that every page on the site opens on the colour the home page
 * opens on. It was --primary-deep before that, and --page before that.
 *
 * Which makes it a light band, so it no longer carries .section--dark. That
 * class is what flipped --ink, --ink-soft, --line and --on-light to their
 * invert values, and with the ground light they are all wanted the way they
 * are: dark heading, soft ink under it, a hairline that divides rather than one
 * drawn in white. The colours the banner does not take from the base pair are
 * in App.css beside the ground.
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
 * banner rather than in a band below it. They take the light ground's own
 * colours like any other light band — including the ghost button's border,
 * which is why the ground re-points --line rather than leaving it at a value
 * mixed for the near-white surfaces.
 *
 * `aside` is a second column beside the copy, the way the home hero puts the
 * clip beside its lockup. It goes with `fill` in practice: a screen-tall banner
 * carrying one heading and a button row is mostly empty primary, and the width is
 * where the emptiness shows. Without it the copy keeps the full shell, which is
 * what the three banners that pass no aside want.
 *
 * `image` no longer shows. The scrim over it had to go opaque when the band
 * went light — see the note on `.page-head--image::before` — so the four pages
 * that pass /page-header.webp are fetching a picture that paints nothing. The
 * prop and the plumbing are left in place for a backdrop cut for a light
 * ground; if none is coming, drop the prop from the four pages.
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
        'section page-head' +
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
