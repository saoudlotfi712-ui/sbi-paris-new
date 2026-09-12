import {getTranslations} from "next-intl/server";

import {
  BadgeCheck,
  Headphones,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";

import LuxuryHero from "./components/LuxuryHero";
import {ParisUniverse} from "./components/ParisUniverse";
import HomeSportSection from "./components/HomeSportSection";
import WholesaleSection from "./components/WholesaleSection";
import PromotionsShowcase from "./components/PromotionsShowcase/PromotionsShowcase";

export default async function HomePage() {
  const t = await getTranslations("home");

  const trustItems = [
    {
      title: t("trust.internationalDelivery.title"),
      description: t("trust.internationalDelivery.description"),
      icon: Truck,
    },
    {
      title: t("trust.securePayment.title"),
      description: t("trust.securePayment.description"),
      icon: ShieldCheck,
    },
    {
      title: t("trust.customerSupport.title"),
      description: t("trust.customerSupport.description"),
      phone: "",
      phoneHref: "tel:+33743594159",
      icon: Headphones,
    },
    {
      title: t("trust.selectedProducts.title"),
      description: t("trust.selectedProducts.description"),
      icon: BadgeCheck,
    },
    {
      title: t("trust.availableStock.title"),
      description: t("trust.availableStock.description"),
      phone: "",
      phoneHref: "tel:+33622196858",
      icon: PackageCheck,
    },
  ];

  return (
    <main>
      <LuxuryHero />

      <HistorySection t={t} />

      <ParisUniverse />

      <HomeSportSection />

      <WholesaleSection />

      <PromotionsShowcase />

      <TrustSection trustItems={trustItems} />
    </main>
  );
}

type TrustItem = {
  title: string;
  description: string;
  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    "aria-hidden"?: boolean | "true" | "false";
    style?: React.CSSProperties;
  }>;
  phone?: string;
  phoneHref?: string;
};

type TrustSectionProps = {
  trustItems: TrustItem[];
};

function TrustSection({
  trustItems,
}: TrustSectionProps) {
  return (
    <section
      style={{
        padding: "34px 4%",
        backgroundColor: "#ffffff",
        borderTop: "1px solid #e8ebf0",
        borderBottom: "1px solid #e8ebf0",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1450px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(230px, 1fr))",
          alignItems: "stretch",
        }}
      >
        {trustItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              style={{
                minHeight: "125px",
                padding: "20px 26px",
                display: "flex",
                alignItems: "center",
                gap: "18px",
                borderRight:
                  index === trustItems.length - 1
                    ? "none"
                    : "1px solid #e1e5eb",
              }}
            >
              <Icon
                size={43}
                strokeWidth={1.55}
                aria-hidden="true"
                style={{
                  flex: "0 0 auto",
                  color: "#071a3d",
                }}
              />

              <div>
                <h3
                  style={{
                    margin: 0,
                    color: "#071a3d",
                    fontSize: "13px",
                    fontWeight: 900,
                    lineHeight: 1.3,
                    textTransform: "uppercase",
                    letterSpacing: "0.025em",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    margin: "7px 0 0",
                    color: "#596579",
                    fontSize: "12px",
                    lineHeight: 1.5,
                  }}
                >
                  {item.description}
                </p>

                {item.phone && item.phoneHref && (
                  <a
                    href={item.phoneHref}
                    style={{
                      display: "inline-block",
                      marginTop: "7px",
                      color: "#e30613",
                      fontSize: "14px",
                      fontWeight: 800,
                      textDecoration: "none",
                    }}
                  >
                    {item.phone}
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

type TranslationFunction = Awaited<
  ReturnType<typeof getTranslations>
>;

type HistorySectionProps = {
  t: TranslationFunction;
};

function HistorySection({
  t,
}: HistorySectionProps) {
  return (
    <section
      style={{
        padding: "80px 5%",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
          gap: "60px",
          alignItems: "center",
        }}
      >
        <div>
          <img
            src="/store.jpg"
            alt={t("history.imageAlt")}
            style={{
              display: "block",
              width: "100%",
              height: "520px",
              objectFit: "cover",
              borderRadius: "18px",
            }}
          />
        </div>

        <div style={{textAlign: "center"}}>
          <p
            style={{
              margin: 0,
              color: "#e30613",
              fontSize: "15px",
              fontWeight: 800,
              letterSpacing: "0.2em",
            }}
          >
            {t("history.kicker")}
          </p>

          <h2
            style={{
              margin: "12px 0 0",
              color: "#071a3d",
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: "clamp(48px, 5vw, 66px)",
              fontWeight: 500,
              lineHeight: 1,
            }}
          >
            1994
          </h2>

          <div
            aria-hidden="true"
            style={{
              width: "48px",
              height: "3px",
              margin: "12px auto 22px",
              backgroundColor: "#e30613",
            }}
          />

          <h3
            style={{
              margin: 0,
              color: "#071a3d",
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: "clamp(38px, 4vw, 54px)",
              fontWeight: 500,
              letterSpacing: "0.05em",
              lineHeight: 1.1,
            }}
          >
            SBI PARIS
          </h3>

          <p
            style={{
              maxWidth: "680px",
              margin: "26px auto 0",
              color: "#3f4a5a",
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: "clamp(16px, 1.5vw, 19px)",
              fontStyle: "italic",
              lineHeight: 1.8,
            }}
          >
            {t("history.description")}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(130px, 1fr))",
              marginTop: "45px",
              borderTop: "1px solid #e5e7eb",
            }}
          >

            <Stat
              value="30"
              label={t("history.stats.countries")}
            />

            <Stat
              value={t("history.stats.quality")}
              label={t("history.stats.premium")}
              isLast
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type StatProps = {
  value: string;
  label: string;
  isLast?: boolean;
};

function Stat({
  value,
  label,
  isLast = false,
}: StatProps) {
  return (
    <div
      style={{
        padding: "30px 12px",
        borderRight: isLast
          ? "none"
          : "1px solid #e5e7eb",
      }}
    >
      <strong
        style={{
          display: "block",
          color: "#e30613",
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: "clamp(25px, 2.5vw, 34px)",
          fontWeight: 500,
          lineHeight: 1.1,
        }}
      >
        {value}
      </strong>

      <span
        style={{
          display: "block",
          marginTop: "8px",
          color: "#071a3d",
          fontSize: "11px",
          fontWeight: 800,
          letterSpacing: "0.08em",
        }}
      >
        {label}
      </span>
    </div>
  );
}
