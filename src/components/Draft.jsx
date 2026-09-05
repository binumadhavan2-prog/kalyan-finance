import { markDraftCopy } from '../content'

/**
 * Wraps unapproved wording so it is visually distinguishable during review.
 * Renders a bare fragment once `markDraftCopy` is off, leaving no stray markup.
 */
export default function Draft({ children, as: Tag = 'span' }) {
  if (!markDraftCopy) return children
  return <Tag className="draft">{children}</Tag>
}
