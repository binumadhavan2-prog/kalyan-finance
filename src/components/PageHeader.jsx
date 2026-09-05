import Draft from './Draft'

/**
 * The dark banner every inner page opens with, so the pages share a silhouette
 * with the home hero without repeating its scale.
 *
 * `drafted` is true by default because most page copy still is. Pass false
 * where the wording is client-approved, so it renders without the dotted mark.
 */
/* Hoisted, not inlined in the render: a component defined during render is a
   new type every pass, which remounts its subtree. */
function Plain({ children }) {
  return children
}

export default function PageHeader({ eyebrow, title, lede, drafted = true }) {
  const Wrap = drafted ? Draft : Plain

  return (
    <section className="section section--dark page-head">
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
