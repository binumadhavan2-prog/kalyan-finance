import { useCopy } from '../i18n'
import Draft from './Draft'
import Missing from './Missing'

/**
 * Awards, press and recognition.
 *
 * The video carries the section when there is one. `preload="metadata"` and no
 * autoplay are deliberate: the file is tens of megabytes, and pulling it down
 * for every visitor — most of whom will not watch it — would dominate the page
 * weight on a mobile connection.
 */
export default function Recognition() {
  const { draft, recognition, recognitionVideo } = useCopy()
  return (
    /* Cream rather than the plain page ground since 2026-09-09: on both pages
       that render this, it falls between a --raised band and a dark one, and
       on --page it was the only light band in that run with no ground of its
       own. */
    <section className="section section--cream">
      <div className="shell stack-lg">
        <div className="stack prose">
          <p className="eyebrow">
            <Draft>{draft.recognitionTitle}</Draft>
          </p>
        </div>

        {recognitionVideo ? (
          <video
            className="video"
            src={recognitionVideo}
            controls
            playsInline
            preload="metadata"
          />
        ) : null}

        {recognition.length > 0 ? (
          <ul className="grid" role="list">
            {recognition.map((item) => (
              <li className="card" key={item.id}>
                <p className="eyebrow">{item.year}</p>
                <h3 className="card__title">{item.title}</h3>
                <p className="lede">{item.issuer}</p>
              </li>
            ))}
          </ul>
        ) : recognitionVideo ? null : (
          /* Only when there is nothing at all to show. With a video present the
             "nothing confirmed" note would contradict what is on screen. */
          <div className="panel">
            <Missing>No recognition confirmed yet</Missing>
            <p className="lede">
              <Draft>{draft.recognitionEmpty}</Draft>
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
