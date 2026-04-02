'use server';
/**
 * @fileOverview This flow analyzes contact form inquiries using AI to identify prospect's key needs,
 * suggest relevant next steps, and propose suitable sales team members for efficient lead qualification and personalized responses.
 *
 * - aiLeadQualificationAndRouting - A function that handles AI-driven lead qualification and routing.
 * - AiLeadQualificationAndRoutingInput - The input type for the aiLeadQualificationAndRouting function.
 * - AiLeadQualificationAndRoutingOutput - The return type for the aiLeadQualificationAndRouting function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiLeadQualificationAndRoutingInputSchema = z.object({
  name: z.string().describe('The name of the prospect.'),
  email: z.string().email().describe('The email address of the prospect.'),
  company: z.string().optional().describe('The company name of the prospect, if provided.'),
  phone: z.string().optional().describe('The phone number of the prospect, if provided.'),
  propertyCount: z.string().optional().describe('The number of properties managed by the prospect (e.g., "1-5", "5-10", "10-20", "20-50", "50-100", "100-200", "200-500", "500+").'),
  message: z.string().describe('The inquiry message from the prospect, detailing their needs or questions.'),
});
export type AiLeadQualificationAndRoutingInput = z.infer<typeof AiLeadQualificationAndRoutingInputSchema>;

const AiLeadQualificationAndRoutingOutputSchema = z.object({
  keyNeeds: z.array(z.string()).describe('A list of the primary needs or pain points identified from the prospect\'s message, directly related to FluxLocatif\'s services.'),
  customerType: z.enum(['Landlord', 'Investor', 'Larger Property Owner', 'Property Management Company', 'Other']).describe('The identified type of customer based on the inquiry, aligned with FluxLocatif\'s target audience.'),
  qualificationScore: z.number().int().min(1).max(5).describe('A score from 1 (low) to 5 (high) indicating the qualification level of the lead, based on alignment with FluxLocatif\'s target audience and services.'),
  priority: z.enum(['Low', 'Medium', 'High', 'Urgent']).describe('The suggested priority for following up with this lead.'),
  suggestedNextSteps: z.array(z.string()).describe('A list of recommended next actions for the sales team, e.g., "Schedule a demo call", "Send pricing details", "Forward to specific sales agent".'),
  suggestedSalesTeamMember: z.string().optional().describe('Suggests a specific sales team member or department best suited to handle this lead, based on the inquiry details.'),
});
export type AiLeadQualificationAndRoutingOutput = z.infer<typeof AiLeadQualificationAndRoutingOutputSchema>;

export async function aiLeadQualificationAndRouting(input: AiLeadQualificationAndRoutingInput): Promise<AiLeadQualificationAndRoutingOutput> {
  return aiLeadQualificationAndRoutingFlow(input);
}

const aiLeadQualificationAndRoutingPrompt = ai.definePrompt({
  name: 'aiLeadQualificationAndRoutingPrompt',
  input: { schema: AiLeadQualificationAndRoutingInputSchema },
  output: { schema: AiLeadQualificationAndRoutingOutputSchema },
  prompt: `You are an expert sales assistant for FluxLocatif, a leasing optimization service.
FluxLocatif helps landlords, real estate investors, larger property owners, and property management companies manage rental inquiries, prequalify applicants, organize applicant pipelines, and support the leasing process.
Your task is to analyze a prospect's inquiry message from a contact form and extract key information to help qualify the lead and suggest next steps for the sales team.

Based on the following inquiry:

Prospect Name: {{{name}}}
Prospect Email: {{{email}}}
{{#if company}}Company: {{{company}}}{{/if}}
{{#if phone}}Phone: {{{phone}}}{{/if}}
{{#if propertyCount}}Number of properties: {{{propertyCount}}}{{/if}}
Message: {{{message}}}

Analyze the message to identify:
1.  **Key Needs**: What specific problems or requirements does the prospect express that align with FluxLocatif's services? Focus on managing inquiries, prequalifying applicants, organizing pipelines, or leasing support.
2.  **Customer Type**: Is the prospect a 'Landlord', 'Investor', 'Larger Property Owner', 'Property Management Company', or 'Other'? Categorize based on the description and volume of properties. For volume 50+, they are likely a 'Larger Property Owner' or 'Property Management Company'.
3.  **Qualification Score**: Rate the lead's qualification from 1 to 5, where 5 indicates a strong fit for FluxLocatif's premium services (e.g., expresses pain points directly addressed by FluxLocatif, is a target customer type, has a significant number of units).
4.  **Priority**: Assign a follow-up priority: 'Low' (generic inquiry), 'Medium' (clear interest, some details), 'High' (strong need, good fit), or 'Urgent' (expresses immediate need or large scale, 100+ units).
5.  **Suggested Next Steps**: What immediate actions should the sales team take? Be specific, for example, "Schedule a demo call to discuss leasing pipeline optimization", "Send information on our Growth plan for multi-unit owners", "Forward to a Senior Account Manager specializing in property management companies."
6.  **Suggested Sales Team Member**: If applicable, suggest a type of sales team member (e.g., 'Account Manager for Large Portfolios', 'Sales Rep for Individual Investors', 'Customer Success for Property Managers') based on the prospect's profile or needs. If unsure, leave blank.

Output your analysis in the specified JSON format. Ensure all fields in the JSON schema are populated.`,
});

const aiLeadQualificationAndRoutingFlow = ai.defineFlow(
  {
    name: 'aiLeadQualificationAndRoutingFlow',
    inputSchema: AiLeadQualificationAndRoutingInputSchema,
    outputSchema: AiLeadQualificationAndRoutingOutputSchema,
  },
  async (input) => {
    const { output } = await aiLeadQualificationAndRoutingPrompt(input);
    return output!;
  }
);