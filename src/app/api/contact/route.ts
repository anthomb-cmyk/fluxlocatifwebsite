import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
  propertyCount: z.string().min(1),
  message: z.string().min(10),
});

function buildHtmlEmail(data: z.infer<typeof contactSchema>) {
  return `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #0f172a; line-height: 1.5;">
      <h2 style="margin: 0 0 16px;">Nouvelle demande de contact FluxLocatif</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 680px;">
        <tr><td style="padding: 8px; border: 1px solid #e2e8f0;"><strong>Nom</strong></td><td style="padding: 8px; border: 1px solid #e2e8f0;">${data.name}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e2e8f0;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #e2e8f0;">${data.email}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e2e8f0;"><strong>Entreprise</strong></td><td style="padding: 8px; border: 1px solid #e2e8f0;">${data.company || "-"}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e2e8f0;"><strong>Téléphone</strong></td><td style="padding: 8px; border: 1px solid #e2e8f0;">${data.phone || "-"}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e2e8f0;"><strong>Logements en gestion</strong></td><td style="padding: 8px; border: 1px solid #e2e8f0;">${data.propertyCount}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e2e8f0;"><strong>Message</strong></td><td style="padding: 8px; border: 1px solid #e2e8f0; white-space: pre-wrap;">${data.message}</td></tr>
      </table>
    </div>
  `;
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const parsed = contactSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Données invalides." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || "FluxLocatif <onboarding@resend.dev>";

    if (!apiKey || !toEmail) {
      return NextResponse.json(
        {
          message:
            "Configuration email manquante. Ajoutez RESEND_API_KEY et CONTACT_TO_EMAIL.",
        },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: parsed.data.email,
        subject: `Nouveau lead contact: ${parsed.data.name}`,
        html: buildHtmlEmail(parsed.data),
      }),
    });

    if (!response.ok) {
      const resendError = await response.text();
      console.error("Resend API error:", resendError);
      return NextResponse.json(
        { message: "Impossible d'envoyer l'email de notification." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form API error:", error);
    return NextResponse.json(
      { message: "Erreur serveur lors de l'envoi du formulaire." },
      { status: 500 }
    );
  }
}
