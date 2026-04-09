import { NextResponse } from "next/server";
import { z } from "zod";
import { aiLeadQualificationAndRouting } from "@/ai/flows/ai-lead-qualification-and-routing";

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

function buildAiAnalysisHtml(
  data: z.infer<typeof contactSchema>,
  analysis: Awaited<ReturnType<typeof aiLeadQualificationAndRouting>>
) {
  const keyNeedsHtml = analysis.keyNeeds
    .map((need) => `<li style="margin-bottom: 6px;">${need}</li>`)
    .join("");
  const nextStepsHtml = analysis.suggestedNextSteps
    .map((step) => `<li style="margin-bottom: 6px;">${step}</li>`)
    .join("");

  return `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #0f172a; line-height: 1.5;">
      <h2 style="margin: 0 0 16px;">Analyse IA du lead : ${data.name}</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 680px; margin-bottom: 16px;">
        <tr><td style="padding: 8px; border: 1px solid #e2e8f0;"><strong>Score</strong></td><td style="padding: 8px; border: 1px solid #e2e8f0;">${analysis.qualificationScore}/5</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e2e8f0;"><strong>Priorité</strong></td><td style="padding: 8px; border: 1px solid #e2e8f0;">${analysis.priority}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e2e8f0;"><strong>Type de client</strong></td><td style="padding: 8px; border: 1px solid #e2e8f0;">${analysis.customerType}</td></tr>
      </table>

      <h3 style="margin: 0 0 8px;">Besoins clés identifiés</h3>
      <ul style="margin: 0 0 16px 20px; padding: 0;">${keyNeedsHtml}</ul>

      <h3 style="margin: 0 0 8px;">Prochaines étapes suggérées</h3>
      <ul style="margin: 0 0 16px 20px; padding: 0;">${nextStepsHtml}</ul>

      ${
        analysis.suggestedSalesTeamMember
          ? `<p style="margin: 0;"><strong>Routage conseillé :</strong> ${analysis.suggestedSalesTeamMember}</p>`
          : ""
      }
    </div>
  `;
}

async function sendResendEmail({
  apiKey,
  fromEmail,
  toEmail,
  replyTo,
  subject,
  html,
}: {
  apiKey: string;
  fromEmail: string;
  toEmail: string;
  replyTo?: string;
  subject: string;
  html: string;
}) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: replyTo,
      subject,
      html,
    }),
  });
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

    const response = await sendResendEmail({
      apiKey,
      fromEmail,
      toEmail,
      replyTo: parsed.data.email,
      subject: `Nouveau lead contact: ${parsed.data.name}`,
      html: buildHtmlEmail(parsed.data),
    });

    if (!response.ok) {
      const resendError = await response.text();
      console.error("Resend API error:", resendError);
      return NextResponse.json(
        { message: "Impossible d'envoyer l'email de notification." },
        { status: 502 }
      );
    }

    try {
      const aiAnalysis = await aiLeadQualificationAndRouting({
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company,
        phone: parsed.data.phone,
        propertyCount: parsed.data.propertyCount,
        message: parsed.data.message,
      });

      const aiEmailResponse = await sendResendEmail({
        apiKey,
        fromEmail,
        toEmail,
        replyTo: parsed.data.email,
        subject: `Analyse IA du lead : ${parsed.data.name}`,
        html: buildAiAnalysisHtml(parsed.data, aiAnalysis),
      });

      if (!aiEmailResponse.ok) {
        const aiEmailError = await aiEmailResponse.text();
        console.error("Resend AI analysis email error:", aiEmailError);
      }
    } catch (aiError) {
      console.error("AI lead analysis failed:", aiError);
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
