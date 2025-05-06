'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing Kaizen methodology guidance.
 *
 * - provideKaizenGuidance - A function that provides guidance on Kaizen methodologies.
 * - ProvideKaizenGuidanceInput - The input type for the provideKaizenGuidance function.
 * - ProvideKaizenGuidanceOutput - The return type for the provideKaizenGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideKaizenGuidanceInputSchema = z.object({
  kaizenMethodology: z
    .string()
    .describe('The specific Kaizen methodology the user is working on (e.g., Value Stream Mapping, Pareto Analysis, Problem Solving Process).'),
  userQuestion: z.string().describe('The user question about the Kaizen methodology.'),
});
export type ProvideKaizenGuidanceInput = z.infer<typeof ProvideKaizenGuidanceInputSchema>;

const ProvideKaizenGuidanceOutputSchema = z.object({
  guidance: z.string().describe('The AI guidance, explanations, examples, and best practices related to the user question about the Kaizen methodology.'),
});
export type ProvideKaizenGuidanceOutput = z.infer<typeof ProvideKaizenGuidanceOutputSchema>;

export async function provideKaizenGuidance(input: ProvideKaizenGuidanceInput): Promise<ProvideKaizenGuidanceOutput> {
  return provideKaizenGuidanceFlow(input);
}

const provideKaizenGuidancePrompt = ai.definePrompt({
  name: 'provideKaizenGuidancePrompt',
  input: {schema: ProvideKaizenGuidanceInputSchema},
  output: {schema: ProvideKaizenGuidanceOutputSchema},
  prompt: `You are an expert in Kaizen methodologies. A user is working on the following methodology: {{kaizenMethodology}}. The user has the following question: {{userQuestion}}. Provide real-time guidance, offering explanations, examples, and best practices to answer the user's question and help them effectively apply the Kaizen methodology.`,
});

const provideKaizenGuidanceFlow = ai.defineFlow(
  {
    name: 'provideKaizenGuidanceFlow',
    inputSchema: ProvideKaizenGuidanceInputSchema,
    outputSchema: ProvideKaizenGuidanceOutputSchema,
  },
  async input => {
    const {output} = await provideKaizenGuidancePrompt(input);
    return output!;
  }
);
