type JsonLdProps = {
  data: Record<string, unknown>;
};

function JsonLd({data}: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "SBI PARIS",
        url: "https://www.sbiparis.com",
        logo: "https://www.sbiparis.com/logo.png",
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{
    name: string;
    url: string;
  }>;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

export function ProductJsonLd({
  name,
  description,
  image,
  url,
  price,
  currency = "EUR",
  availability,
}: {
  name: string;
  description: string;
  image?: string;
  url: string;
  price?: number;
  currency?: string;
  availability?: "InStock" | "OutOfStock";
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name,
        description,
        ...(image ? {image: [image]} : {}),
        url,
        brand: {
          "@type": "Brand",
          name: "SBI PARIS",
        },
        ...(typeof price === "number"
          ? {
              offers: {
                "@type": "Offer",
                url,
                priceCurrency: currency,
                price,
                availability: `https://schema.org/${
                  availability ?? "InStock"
                }`,
              },
            }
          : {}),
      }}
    />
  );
}