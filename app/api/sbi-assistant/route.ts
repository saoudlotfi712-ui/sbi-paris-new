import { NextRequest, NextResponse } from "next/server";

type Locale = "fr" | "en" | "ar" | "de" | "es" | "it" | "zh";

type Intent =
  | "tracking"
  | "delivery"
  | "sport"
  | "perfume"
  | "mobility"
  | "product"
  | "default";

const locales: Locale[] = ["fr", "en", "ar", "de", "es", "it", "zh"];

function normalizeLocale(value: unknown): Locale {
  const locale = String(value || "fr").split("-")[0] as Locale;
  return locales.includes(locale) ? locale : "fr";
}

function detectIntent(message: string): Intent {
  const text = message.toLowerCase();

  const has = (...words: string[]) =>
    words.some((word) => text.includes(word));

  if (
    has(
      "commande",
      "suiv",
      "track",
      "order",
      "bestellung",
      "pedido",
      "ordine",
      "طلب",
      "订单"
    )
  ) {
    return "tracking";
  }

  if (
    has(
      "livraison",
      "retour",
      "delivery",
      "return",
      "shipping",
      "versand",
      "entrega",
      "consegna",
      "توصيل",
      "إرجاع",
      "配送",
      "退货"
    )
  ) {
    return "delivery";
  }

  if (
    has(
      "sport",
      "football",
      "basket",
      "tennis",
      "padel",
      "running",
      "رياض",
      "运动"
    )
  ) {
    return "sport";
  }

  if (
    has(
      "parfum",
      "perfume",
      "profum",
      "duft",
      "عطر",
      "香水"
    )
  ) {
    return "perfume";
  }

  if (
    has(
      "mobil",
      "valise électrique",
      "electric suitcase",
      "تنقل",
      "出行"
    )
  ) {
    return "mobility";
  }

  if (
    has(
      "produit",
      "product",
      "artikel",
      "producto",
      "prodotto",
      "catalog",
      "منتج",
      "商品"
    )
  ) {
    return "product";
  }

  return "default";
}

const replies: Record<Locale, Record<Intent, string>> = {
  fr: {
    tracking:
      "Pour suivre votre commande, ouvrez la page de suivi puis saisissez votre numéro de commande et l'adresse e-mail utilisée lors de l'achat.",
    delivery:
      "La livraison SBI PARIS est offerte à partir de 200 €. En dessous, les frais standards sont de 29 €. Pour les retours, vous pouvez aussi contacter notre service client.",
    sport:
      "Univers Sport SBI PARIS comprend Homme et Femme, avec Football, Basketball, Tennis, Padel et Running.",
    perfume:
      "Vous pouvez découvrir directement la collection Parfums SBI PARIS.",
    mobility:
      "Vous pouvez découvrir directement l'univers Mobilité SBI PARIS.",
    product:
      "Je peux vous orienter vers Collection, Homme, Femme ou Enfant pour trouver votre produit.",
    default:
      "Je peux vous aider pour les produits, commandes, livraison, Univers Sport, parfums et mobilité.",
  },

  en: {
    tracking:
      "To track your order, open the tracking page and enter your order number and the email used for the purchase.",
    delivery:
      "SBI PARIS delivery is free from €200. Below that amount, the standard fee is €29. Customer service can also help with returns.",
    sport:
      "SBI PARIS Sport Universe includes Men and Women, with Football, Basketball, Tennis, Padel and Running.",
    perfume:
      "You can discover the SBI PARIS Perfume collection directly.",
    mobility:
      "You can discover the SBI PARIS Mobility universe directly.",
    product:
      "I can guide you to Collection, Men, Women or Children to find your product.",
    default:
      "I can help with products, orders, delivery, Sport Universe, perfumes and mobility.",
  },

  ar: {
    tracking:
      "لتتبع طلبك، افتح صفحة تتبع الطلب وأدخل رقم الطلب والبريد الإلكتروني المستخدم أثناء الشراء.",
    delivery:
      "التوصيل مجاني في SBI PARIS ابتداءً من 200 €. وإذا كان المبلغ أقل فتكلفة التوصيل العادية 29 €. وللإرجاع يمكنك التواصل مع خدمة العملاء.",
    sport:
      "عالم الرياضة SBI PARIS مقسم إلى رجال ونساء ويشمل كرة القدم وكرة السلة والتنس والبادل والجري.",
    perfume:
      "يمكنك اكتشاف مجموعة عطور SBI PARIS مباشرة.",
    mobility:
      "يمكنك اكتشاف مجموعة التنقل SBI PARIS مباشرة.",
    product:
      "يمكنني توجيهك إلى المجموعة أو الرجال أو النساء أو الأطفال للعثور على المنتج.",
    default:
      "يمكنني مساعدتك في المنتجات والطلبات والتوصيل وعالم الرياضة والعطور والتنقل.",
  },

  de: {
    tracking:
      "Um Ihre Bestellung zu verfolgen, öffnen Sie die Sendungsverfolgung und geben Sie Bestellnummer und E-Mail-Adresse ein.",
    delivery:
      "Die Lieferung ist ab 200 € kostenlos. Darunter beträgt die Standardgebühr 29 €. Bei Rückgaben hilft der Kundenservice.",
    sport:
      "SBI PARIS Sport umfasst Herren und Damen sowie Fußball, Basketball, Tennis, Padel und Running.",
    perfume:
      "Sie können die SBI PARIS Parfum-Kollektion direkt entdecken.",
    mobility:
      "Sie können den SBI PARIS Mobilitätsbereich direkt entdecken.",
    product:
      "Ich kann Sie zu Kollektion, Herren, Damen oder Kinder führen.",
    default:
      "Ich helfe bei Produkten, Bestellungen, Lieferung, Sport, Parfums und Mobilität.",
  },

  es: {
    tracking:
      "Para seguir tu pedido, abre la página de seguimiento e introduce el número de pedido y el correo usado en la compra.",
    delivery:
      "El envío es gratuito desde 200 €. Por debajo, la tarifa estándar es de 29 €. Atención al cliente puede ayudarte con devoluciones.",
    sport:
      "Universo Sport SBI PARIS incluye Hombre y Mujer, con Fútbol, Baloncesto, Tenis, Pádel y Running.",
    perfume:
      "Puedes descubrir directamente la colección de perfumes SBI PARIS.",
    mobility:
      "Puedes descubrir directamente el universo Movilidad SBI PARIS.",
    product:
      "Puedo dirigirte a Colección, Hombre, Mujer o Niño.",
    default:
      "Puedo ayudarte con productos, pedidos, entrega, deporte, perfumes y movilidad.",
  },

  it: {
    tracking:
      "Per seguire il tuo ordine, apri la pagina di tracciamento e inserisci numero ordine ed e-mail usata per l'acquisto.",
    delivery:
      "La consegna è gratuita da 200 €. Sotto questa soglia il costo standard è 29 €. Il servizio clienti può aiutarti con i resi.",
    sport:
      "Universo Sport SBI PARIS comprende Uomo e Donna, con Calcio, Basket, Tennis, Padel e Running.",
    perfume:
      "Puoi scoprire direttamente la collezione Profumi SBI PARIS.",
    mobility:
      "Puoi scoprire direttamente l'universo Mobilità SBI PARIS.",
    product:
      "Posso indirizzarti verso Collezione, Uomo, Donna o Bambino.",
    default:
      "Posso aiutarti con prodotti, ordini, consegna, sport, profumi e mobilità.",
  },

  zh: {
    tracking:
      "如需追踪订单，请打开订单追踪页面，并输入订单号和购买时使用的电子邮箱。",
    delivery:
      "订单满 200 欧元免运费，低于该金额的标准运费为 29 欧元。退货问题可联系客服。",
    sport:
      "SBI PARIS 运动系列分为男士和女士，包括足球、篮球、网球、板式网球和跑步。",
    perfume:
      "您可以直接查看 SBI PARIS 香水系列。",
    mobility:
      "您可以直接查看 SBI PARIS 出行系列。",
    product:
      "我可以引导您前往系列、男士、女士或儿童分类寻找商品。",
    default:
      "我可以帮助您了解商品、订单、配送、运动系列、香水和出行产品。",
  },
};

function actions(intent: Intent) {
  switch (intent) {
    case "tracking":
      return [
        {
          label: "Suivre ma commande",
          href: "/suivi-commande",
        },
      ];

    case "delivery":
      return [
        {
          label: "Contacter SBI PARIS",
          href: "/contact",
        },
        {
          label: "Suivre ma commande",
          href: "/suivi-commande",
        },
      ];

    case "sport":
      return [
        {
          label: "Univers Sport Homme",
          href: "/univers-sport-homme",
        },
        {
          label: "Univers Sport Femme",
          href: "/univers-sport-femme",
        },
      ];

    case "perfume":
      return [
        {
          label: "Parfums",
          href: "/parfum",
        },
      ];

    case "mobility":
      return [
        {
          label: "Mobilité",
          href: "/mobilite",
        },
      ];

    case "product":
      return [
        {
          label: "Collection",
          href: "/collection",
        },
        {
          label: "Homme",
          href: "/homme",
        },
        {
          label: "Femme",
          href: "/femme",
        },
        {
          label: "Enfant",
          href: "/enfant",
        },
      ];

    default:
      return [
        {
          label: "Promotions",
          href: "/promotions",
        },
        {
          label: "Contact",
          href: "/contact",
        },
      ];
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const message = String(body?.message || "")
      .trim()
      .slice(0, 1200);

    const locale = normalizeLocale(body?.locale);

    if (!message) {
      return NextResponse.json(
        { error: "message_required" },
        { status: 400 }
      );
    }

    const intent = detectIntent(message);

    return NextResponse.json({
      reply: replies[locale][intent],
      actions: actions(intent),
      mode: "local",
    });
  } catch {
    return NextResponse.json(
      { error: "assistant_unavailable" },
      { status: 500 }
    );
  }
}
