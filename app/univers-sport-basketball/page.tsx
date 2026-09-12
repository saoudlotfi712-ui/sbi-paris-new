import {getLocale} from "next-intl/server";
import {translateSportTree, type SportLocale} from "@/app/lib/translateSportTree";
import Link from "next/link";
import styles from "./BasketballPage.module.css";

const disciplines = [
  {
    name: "Football",
    icon: "⚽",
    href: "/univers-sport-football",
  },
  {
    name: "Basketball",
    icon: "🏀",
    href: "/univers-sport-basketball",
  },
  {
    name: "Tennis",
    icon: "🎾",
    href: "/univers-sport-tennis",
  },
  {
    name: "Padel",
    icon: "◉",
    href: "/univers-sport-padel",
  },
  {
    name: "Running",
    icon: "🏃",
    href: "/univers-sport-running",
  },
];

const categories = [
  {
    name: "Maillots",
    count: "96 produits",
    image: "/univers-sport/femme/products/basketball.jpg",
  },
  {
    name: "Shorts",
    count: "82 produits",
    image: "/univers-sport/femme/products/basketball.jpg",
  },
  {
    name: "Survêtements",
    count: "64 produits",
    image: "/univers-sport/homme/banner/banner-homme.jpg",
  },
  {
    name: "Chaussures",
    count: "108 produits",
    image: "/univers-sport/femme/products/basketball.jpg",
  },
  {
    name: "Accessoires",
    count: "71 produits",
    image: "/univers-sport/femme/products/basketball.jpg",
  },
];

const products = [
  {
    name: "SBI PARIS Air Court Pro",
    price: "89,90 €",
    oldPrice: "129,90 €",
    badge: "NOUVEAU",
    symbol: "👟",
  },
  {
    name: "SBI PARIS Elite Basket High",
    price: "99,90 €",
    oldPrice: "149,90 €",
    badge: "PROMO",
    symbol: "👟",
  },
  {
    name: "SBI PARIS Fast Court One",
    price: "79,90 €",
    oldPrice: "119,90 €",
    badge: "NOUVEAU",
    symbol: "👟",
  },
  {
    name: "SBI PARIS Dynamic Basket Pro",
    price: "84,90 €",
    oldPrice: "124,90 €",
    badge: "PROMO",
    symbol: "👟",
  },
  {
    name: "SBI PARIS Performance Court",
    price: "94,90 €",
    oldPrice: "139,90 €",
    badge: "NOUVEAU",
    symbol: "👟",
  },
];

export default async function BasketballPage() {
  const locale = (await getLocale()) as SportLocale;
  return translateSportTree((
    <main className={styles.page}>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.brand}>
            <span>UNIVERS SPORT</span>
            <strong>HOMME</strong>
            <i />
          </div>

          <Link
            href="/univers-sport-homme"
            className={styles.homeLink}
          >
            <span>⌂</span>
            Accueil Univers Sport
          </Link>

          <p className={styles.menuTitle}>
            DISCIPLINES
          </p>

          <nav className={styles.disciplineNav}>
            {disciplines.map((item) => {
              const active =
                item.name === "Basketball";

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={
                    active
                      ? `${styles.navItem} ${styles.active}`
                      : styles.navItem
                  }
                >
                  <span>{item.icon}</span>

                  <strong>{item.name}</strong>

                  {active && <b>›</b>}
                </Link>
              );
            })}
          </nav>

          <div className={styles.divider} />

          <p className={styles.menuTitle}>
            INFOS UTILES
          </p>

          <div className={styles.infoLinks}>
            <div>⌁ Guide des tailles</div>
            <div>▱ Livraison & Retours</div>
            <div>◯ FAQ</div>
          </div>

          <div className={styles.sidebarServices}>
            <div>
              <span>▣</span>

              <p>
                <strong>
                  Livraison Rapide
                </strong>
                <small>
                  Partout en France
                </small>
              </p>
            </div>

            <div>
              <span>♙</span>

              <p>
                <strong>
                  Paiement Sécurisé
                </strong>
                <small>
                  100% sécurisé
                </small>
              </p>
            </div>

            <div>
              <span>↻</span>

              <p>
                <strong>
                  Retours Faciles
                </strong>
                <small>
                  Sous 14 jours
                </small>
              </p>
            </div>

            <div>
              <span>◯</span>

              <p>
                <strong>
                  Service Client
                </strong>
                <small>
                  7j/7 à votre écoute
                </small>
              </p>
            </div>
          </div>
        </aside>

        <section className={styles.content}>
          <section className={styles.top}>
            <div className={styles.intro}>
              <p className={styles.breadcrumb}>
                Accueil
                <span>›</span>
                Univers Sport
                <span>›</span>
                Homme
                <span>›</span>
                <strong>
                  Basketball
                </strong>
              </p>

              <h1>Basketball</h1>

              <div className={styles.titleLine} />

              <p className={styles.description}>
                Découvrez notre sélection complète
                d&apos;équipements de basketball
                pour allier performance, confort et
                style sur le terrain.
              </p>
            </div>

            <div className={styles.hero}>
              <img
                src="/univers-sport/femme/products/basketball.jpg"
                alt="SBI PARIS Basketball"
              />

              <div className={styles.heroOverlay} />
            </div>
          </section>

          <section className={styles.categoryGrid}>
            {categories.map((category) => (
              <a
                href="#products"
                key={category.name}
                className={styles.categoryCard}
              >
                <div className={styles.categoryImage}>
                  <img
                    src={category.image}
                    alt={category.name}
                  />
                </div>

                <div>
                  <h3>{category.name}</h3>
                  <p>{category.count}</p>

                  <span>
                    Découvrir
                    <b>→</b>
                  </span>
                </div>
              </a>
            ))}
          </section>

          <section
            id="products"
            className={styles.productsSection}
          >
            <div className={styles.productsTop}>
              <div>
                <p className={styles.redLabel}>
                  CHAUSSURES DE BASKETBALL
                </p>

                <h2>
                  Nos Chaussures de Basketball
                </h2>
              </div>

              <div className={styles.filters}>
                <label>
                  <span>Trier par</span>

                  <select defaultValue="best">
                    <option value="best">
                      Meilleures ventes
                    </option>
                    <option value="new">
                      Nouveautés
                    </option>
                    <option value="low">
                      Prix croissant
                    </option>
                  </select>
                </label>

                <label>
                  <span>Marque</span>

                  <select defaultValue="sbi">
                    <option value="sbi">
                      SBI PARIS
                    </option>
                  </select>
                </label>

                <label>
                  <span>Pointure</span>

                  <select defaultValue="all">
                    <option value="all">
                      Toutes
                    </option>
                    <option>38</option>
                    <option>39</option>
                    <option>40</option>
                    <option>41</option>
                    <option>42</option>
                    <option>43</option>
                    <option>44</option>
                    <option>45</option>
                    <option>46</option>
                    <option>47</option>
                    <option>48</option>
                  </select>
                </label>

                <label>
                  <span>Couleur</span>

                  <select defaultValue="all">
                    <option value="all">
                      Toutes
                    </option>
                    <option>Noir</option>
                    <option>Blanc</option>
                    <option>Rouge</option>
                    <option>Bleu</option>
                  </select>
                </label>

                <button
                  type="button"
                  className={styles.filterButton}
                >
                  ☷ Filtres
                </button>
              </div>
            </div>

            <div className={styles.productGrid}>
              {products.map((product, index) => (
                <article
                  key={product.name}
                  className={styles.productCard}
                >
                  <div className={styles.productVisual}>
                    <span
                      className={
                        product.badge === "PROMO"
                          ? styles.promoBadge
                          : styles.newBadge
                      }
                    >
                      {product.badge}
                    </span>

                    <button
                      type="button"
                      className={styles.favorite}
                      aria-label="Ajouter aux favoris"
                    >
                      ♡
                    </button>

                    <div className={styles.shoe}>
                      {product.symbol}
                    </div>
                  </div>

                  <div className={styles.productInfo}>
                    <h3>{product.name}</h3>

                    <div className={styles.prices}>
                      <strong>
                        {product.price}
                      </strong>

                      <del>
                        {product.oldPrice}
                      </del>
                    </div>

                    <div className={styles.productBottom}>
                      <span className={styles.rating}>
                        ★★★★★
                        <small>
                          ({index * 8 + 19})
                        </small>
                      </span>

                      <button
                        type="button"
                        className={styles.cartButton}
                        aria-label="Ajouter au panier"
                      >
                        🛒
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className={styles.paginationBar}>
              <p>
                Affichage de 1 à 12 sur 108 produits
              </p>

              <div className={styles.pagination}>
                <button type="button">‹</button>

                <button
                  type="button"
                  className={styles.current}
                >
                  1
                </button>

                <button type="button">2</button>
                <button type="button">3</button>

                <span>...</span>

                <button type="button">9</button>
                <button type="button">›</button>
              </div>

              <label>
                Produits par page

                <select defaultValue="12">
                  <option value="12">12</option>
                  <option value="24">24</option>
                  <option value="48">48</option>
                </select>
              </label>
            </div>
          </section>
        </section>
      </div>
    </main>
  ), locale);
}
