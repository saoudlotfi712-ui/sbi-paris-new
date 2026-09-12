import {NextResponse} from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const type = String(formData.get("type") ?? "contact");
    const email = String(formData.get("email") ?? "").trim();
    const consent = formData.get("consent");

    if (!email || !consent) {
      return NextResponse.json(
        {success: false, error: "Données manquantes."},
        {status: 400},
      );
    }

    if (
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASSWORD
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Configuration SMTP manquante.",
        },
        {status: 500},
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

    if (type === "newsletter") {
      await transporter.sendMail({
        from: `"SBI PARIS" <${process.env.SMTP_USER}>`,
        to: "contactsbiparis@gmail.com",
        replyTo: email,
        subject: "Nouvelle inscription Newsletter SBI PARIS",
        text: `Nouvelle inscription newsletter : ${email}`,
      });

      return NextResponse.redirect(
        new URL("/?newsletter=success", request.url),
        303,
      );
    }

    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const subject = String(formData.get("subject") ?? "")
      .replace(/[\r\n]+/g, " ")
      .trim();
    const message = String(
      formData.get("message") ?? "",
    ).trim();

    if (!name || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Champs obligatoires manquants.",
        },
        {status: 400},
      );
    }

    await transporter.sendMail({
      from: `"SBI PARIS" <${process.env.SMTP_USER}>`,
      to: "contactsbiparis@gmail.com",
      replyTo: email,
      subject: `Contact SBI PARIS - ${subject}`,
      text: [
        `Nom : ${name}`,
        `Email : ${email}`,
        `Téléphone : ${phone || "-"}`,
        "",
        `Sujet : ${subject}`,
        "",
        "Message :",
        message,
      ].join("\n"),
    });

    return NextResponse.redirect(
      new URL("/contact?sent=success", request.url),
      303,
    );
  } catch (error) {
    console.error("CONTACT EMAIL ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de l'envoi.",
      },
      {status: 500},
    );
  }
}