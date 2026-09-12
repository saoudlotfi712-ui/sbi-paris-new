"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Menu,
  Search,
  UserRound,
  Heart,
  X,
  ChevronRight,
  ShoppingBag,
  Truck,
  RefreshCcw,
  Headphones,
} from "lucide-react";

import styles from "./Header.module.css";

import CollectionMenu from "./CollectionMenu";
import HommeMenu from "./HommeMenu";
import FemmeMenu from "./FemmeMenu";
import EnfantMenu from "./EnfantMenu";
import ParfumMenu from "./ParfumMenu";
import MobiliteMenu from "./MobiliteMenu";
import PromotionsMenu from "./PromotionsMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import CartButton from "./CartButton";

export default function Header() {
  const t = useTranslations("header");
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  return (
    <>
      <section className={styles.topBar}>
        <div className={styles.marquee}>
          <div className={styles.track}>
            <details className={styles.item}>
              <summary>
                <Truck size={18} strokeWidth={1.8} />
                <span>{t("shipping")}</span>
              </summary>

              <p>{t("shippingDetails")}</p>
            </details>

            <details className={styles.item}>
              <summary>
                <RefreshCcw size={18} strokeWidth={1.8} />
                <span>{t("returns")}</span>
              </summary>

              <p>{t("returnsDetails")}</p>
            </details>

            <details className={styles.item}>
              <summary>
                <Headphones size={18} strokeWidth={1.8} />
                <span>{t("support")}</span>
              </summary>

              <p>{t("supportDetails")}</p>
            </details>
          </div>
        </div>
      </section>

      <header className={styles.hero}>
        <div className={styles.headerLeft}>
          <button
            type="button"
            aria-label={t("openMenu")}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className={styles.iconButton}
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={31} strokeWidth={1.8} />
          </button>

          <button
            type="button"
            aria-label={t("search")}
            className={styles.iconButton}
          >
            <Search size={31} strokeWidth={1.8} />
          </button>
        </div>

        <Link href="/" aria-label="Accueil SBI PARIS">
          <img
            src="/logo.png"
            alt="SBI Paris"
            className={styles.logo}
          />
        </Link>

        <div className={styles.headerRight}>
          <LanguageSwitcher />

          <Link
            href="/compte"
            aria-label={t("account")}
            className={styles.iconButton}
          >
            <UserRound size={31} strokeWidth={1.8} />
          </Link>

          <Link
            href="/favoris"
            aria-label={t("favorites")}
            className={styles.iconButton}
          >
            <Heart size={31} strokeWidth={1.8} />
          </Link>

          <CartButton label={t("cart")} />
        </div>
      </header><nav className={styles.navBar}>
        <div className={`${styles.navItem} navItem ${styles.collection}`}>
          <Link href="/collection">
            {t("collection")} <span>▼</span>
          </Link>
          <CollectionMenu />
        </div>

        <div className={`${styles.navItem} navItem`}>
          <Link href="/homme">
            {t("men")} <span>▼</span>
          </Link>
          <HommeMenu />
        </div>

        <div className={`${styles.navItem} navItem`}>
          <Link href="/femme">
            {t("women")} <span>▼</span>
          </Link>
          <FemmeMenu />
        </div>

        <div className={`${styles.navItem} navItem`}>
          <Link href="/enfant">
            {t("kids")} <span>▼</span>
          </Link>
          <EnfantMenu />
        </div>

        <div className={`${styles.navItem} navItem`}>
          <Link href="/parfum">
            {t("perfume")} <span>▼</span>
          </Link>
          <ParfumMenu />
        </div>

        <div className={`${styles.navItem} navItem`}>
          <Link href="/mobilite">
            {t("mobility")} <span>▼</span>
          </Link>
          <MobiliteMenu />
        </div>

        <div className={`${styles.navItem} navItem ${styles.promo}`}>
          <Link href="/promotions">
            {t("promotions")} <span>▼</span>
          </Link>
          <PromotionsMenu />
        </div>
      </nav>

      <div
        className={`${styles.menuOverlay} ${
          menuOpen ? styles.menuOverlayOpen : ""
        }`}
        onClick={closeMenu}
        aria-hidden={!menuOpen}
      />

      <aside
        id="mobile-navigation"
        className={`${styles.mobileMenu} ${
          menuOpen ? styles.mobileMenuOpen : ""
        }`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.mobileMenuHeader}>
          <Link
            href="/"
            className={styles.mobileMenuBrand}
            onClick={closeMenu}
          >
            <img src="/logo.png" alt="SBI Paris" />
            <span>SBI PARIS</span>
          </Link>

          <button
            type="button"
            aria-label="Fermer le menu"
            className={styles.mobileCloseButton}
            onClick={closeMenu}
          >
            <X size={28} strokeWidth={1.8} />
          </button>
        </div>

        <div className={styles.mobileMenuContent}>
          <Link
            href="/collection"
            className={styles.mobileMenuLink}
            onClick={closeMenu}
          >
            <span>{t("collection")}</span>
            <ChevronRight size={20} />
          </Link>

          <Link
            href="/homme"
            className={styles.mobileMenuLink}
            onClick={closeMenu}
          >
            <span>{t("men")}</span>
            <ChevronRight size={20} />
          </Link>

          <Link
            href="/femme"
            className={styles.mobileMenuLink}
            onClick={closeMenu}
          >
            <span>{t("women")}</span>
            <ChevronRight size={20} />
          </Link>

          <Link
            href="/enfant"
            className={styles.mobileMenuLink}
            onClick={closeMenu}
          >
            <span>{t("kids")}</span>
            <ChevronRight size={20} />
          </Link>

          <Link
            href="/parfum"
            className={styles.mobileMenuLink}
            onClick={closeMenu}
          >
            <span>{t("perfume")}</span>
            <ChevronRight size={20} />
          </Link>

          <Link
            href="/mobilite"
            className={styles.mobileMenuLink}
            onClick={closeMenu}
          >
            <span>{t("mobility")}</span>
            <ChevronRight size={20} />
          </Link>

          <Link
            href="/promotions"
            className={`${styles.mobileMenuLink} ${styles.mobilePromotion}`}
            onClick={closeMenu}
          >
            <span>{t("promotions")}</span>
            <ChevronRight size={20} />
          </Link>
        </div>

        <div className={styles.mobileMenuFooter}>
          <Link
            href="/compte"
            className={styles.mobileUtilityLink}
            onClick={closeMenu}
          >
            <UserRound size={21} strokeWidth={1.8} />
            <span>{t("account")}</span>
          </Link>

          <Link
            href="/favoris"
            className={styles.mobileUtilityLink}
            onClick={closeMenu}
          >
            <Heart size={21} strokeWidth={1.8} />
            <span>{t("favorites")}</span>
          </Link>

          <Link
            href="/cart"
            className={styles.mobileUtilityLink}
            onClick={closeMenu}
          >
            <ShoppingBag size={21} strokeWidth={1.8} />
            <span>{t("cart")}</span>
          </Link>

          <div className={styles.mobileLanguage}>
            <LanguageSwitcher />
          </div>
        </div>
      </aside>
    </>
  );
}
