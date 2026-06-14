import './Hero.scss';

export function Hero({ storyCountLabel, isHidden }) {
  return (
    <section
      className={`page-hero${isHidden ? ' page-hero--hidden' : ''}`}
      aria-label="Site introduction"
    >
      <h1 className="page-hero__heading">
        <em>Stories of Taranath Tantrik | Exploring the Unknown, Dread & Mystery</em>
      </h1>
      <p className="page-hero__subtext">
        He has walked roads the living avoid. These are the stories he brought back.
      </p>
      <span className="page-hero__count">{storyCountLabel}</span>
    </section>
  );
}
