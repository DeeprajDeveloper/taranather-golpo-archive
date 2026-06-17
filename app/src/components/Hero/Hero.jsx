import './Hero.scss';

export function Hero({ storyCountLabel, isHidden }) {
  return (
    <section
      className={`page-hero${isHidden ? ' page-hero--hidden' : ''}`}
      aria-label="Site introduction"
    >
      <h1 className="page-hero__heading">
        <em>Stories of Taranath Tantrik - Explore the Mysteries of the Tantric Tradition</em>
      </h1>
      <p className="page-hero__subtext">
        Taranath Tantrik has walked roads the living avoid. These are the stories he brought back.
      </p>
      <span className="page-hero__count">{storyCountLabel}</span>
    </section>
  );
}
