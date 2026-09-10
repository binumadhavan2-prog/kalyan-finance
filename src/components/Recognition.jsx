import { useCopy } from '../i18n'
import Draft from './Draft'
import Missing from './Missing'

/**
 * Awards, press and recognition.
 *
 * One award, supplied 2026-09-10, so the band is built around it rather than
 * around the card grid: heading and subtitle over the clip, then the clip with
 * the citation beside it. The grid is still there and still empty, and takes
 * over the moment a second award exists — see the note in content.js.
 *
 * The video carries the section when there is one. `preload="metadata"` and no
 * autoplay are deliberate: the file is tens of megabytes, and pulling it down
 * for every visitor — most of whom will not watch it — would dominate the page
 * weight on a mobile connection.
 *
 * Which is what the poster is for. With no first frame fetched the band opened
 * on a black rectangle; the still stands in until someone presses play, and
 * costs a hundredth of what the clip would.
 */
export default function Recognition() {
  const { draft, recognition, recognitionFeature, recognitionPoster, recognitionVideo } =
    useCopy()
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
          <h2 className="heading">{recognitionFeature.title}</h2>
          <p className="lede">{recognitionFeature.subtitle}</p>
        </div>

        {/* Clip and citation side by side, the clip first. Below 56rem they
            stack in that order, which is the order they are read in: the still
            says an award is being given, the words say which and to whom. */}
        <div className="recognition__feature">
          {recognitionVideo ? (
            <video
              className="video"
              src={recognitionVideo}
              poster={recognitionPoster}
              controls
              playsInline
              preload="metadata"
            />
          ) : null}

          <div className="stack recognition__citation">
            <p className="lede">
              <strong>{recognitionFeature.recipients}</strong>{' '}
              {recognitionFeature.honour}
            </p>
            <p>{recognitionFeature.citation}</p>
            <p className="recognition__closing">{recognitionFeature.closing}</p>
            <p className="recognition__invitation">
              {recognitionFeature.invitation}
            </p>
          </div>
        </div>

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
