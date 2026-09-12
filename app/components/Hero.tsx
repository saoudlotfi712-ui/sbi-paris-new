export default function Hero() {
  return (
    <section className="bannerHero">
      <img src="/banner.jpg" alt="SBI Paris" />

      <div className="bannerText">
        <h1>
          <span className="blue">L&apos;ÉLÉGANCE</span>
          <span className="red">PARISIENNE</span>
          <span className="blue">POUR TOUS</span>
        </h1>

        <p>
          <span>L&apos;ART DE L&apos;ÉLÉGANCE</span>
          <span className="redSmall"> AU QUOTIDIEN.</span>
        </p>

        <div className="heroButtons">
          <button className="btnPrimary">
            DÉCOUVRIR LA COLLECTION <span>→</span>
          </button>

          <button className="btnSecondary">
            💼 ESPACE PROFESSIONNEL
          </button>
        </div>
      </div>
    </section>
  );
}
