import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      postalCode,
      city,
      country,
      productName,
      quantity,
      subtotal,
      shipping,
      total,
    } = body;

    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      return NextResponse.json(
        {
          success: false,
          error: "Configuration SMTP manquante.",
        },
        {
          status: 500,
        },
      );
    }

    const transporter = nodemailer.createTransport({
      host: "ssl0.ovh.net",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.verify();

    const info = await transporter.sendMail({
      from: `"SBI PARIS" <${process.env.SMTP_USER}>`,

      // Les nouvelles commandes arrivent ici
      to: "contactsbiparis@gmail.com",

      // Si tu réponds à l'e-mail, la réponse va au client
      replyTo: email,

      subject: `Nouvelle commande SBI PARIS - ${firstName} ${lastName}`,

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #0f172a;
            max-width: 650px;
            margin: 0 auto;
          "
        >
          <h1 style="margin-bottom: 24px;">
            Nouvelle commande SBI PARIS
          </h1>

          <h2>Client</h2>

          <p>
            <strong>Nom :</strong>
            ${firstName} ${lastName}
          </p>

          <p>
            <strong>Email :</strong>
            ${email}
          </p>

          <p>
            <strong>Téléphone :</strong>
            ${phone || "-"}
          </p>

          <hr
            style="
              margin: 24px 0;
              border: 0;
              border-top: 1px solid #e2e8f0;
            "
          />

          <h2>Adresse de livraison</h2>

          <p>
            ${address}<br />
            ${postalCode} ${city}<br />
            ${country}
          </p>

          <hr
            style="
              margin: 24px 0;
              border: 0;
              border-top: 1px solid #e2e8f0;
            "
          />

          <h2>Commande</h2>

          <p>
            <strong>Produit :</strong>
            ${productName}
          </p>

          <p>
            <strong>Quantité :</strong>
            ${quantity}
          </p>

          <p>
            <strong>Sous-total :</strong>
            ${subtotal} €
          </p>

          <p>
            <strong>Livraison :</strong>
            ${shipping} €
          </p>

          <h2>
            Total : ${total} €
          </h2>
        </div>
      `,
    });

    console.log("EMAIL SENT:", info.messageId);

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("EMAIL ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Erreur inconnue",
      },
      {
        status: 500,
      },
    );
  }
}