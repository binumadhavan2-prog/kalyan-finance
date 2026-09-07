/**
 * Stands in for a fact the client has not supplied.
 *
 * It used to render a visible "Not supplied yet" chip, on the argument that a
 * blank space reads as finished. As of 2026-09-07 the client asked for the
 * labels off: the gap is left empty instead, and the containers around it —
 * the dashed `.panel`, `.map--empty` and `.person__portrait` boxes — are what
 * show that something is meant to go there.
 *
 * The component stays rather than being deleted from ~15 call sites, so the
 * gaps are still marked in the source and every one of them comes back by
 * restoring the span below. The call sites still pass a description of what is
 * missing as children; React drops it, and it stays there as the note to
 * whoever fills the gap in.
 */
export default function Missing() {
  return null
}
