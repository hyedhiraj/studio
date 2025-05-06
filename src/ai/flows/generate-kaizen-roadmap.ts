// This is a server-side file.
'use server';

/**
 * @fileOverview Generates a step-by-step roadmap for implementing Kaizen principles.
 *
 * - generateKaizenRoadmap - A function that generates a Kaizen roadmap.
 * - GenerateKaizenRoadmapInput - The input type for the generateKaizenRoadmap function.
 * - GenerateKaizenRoadmapOutput - The return type for the generateKaizenRoadmap function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateKaizenRoadmapInputSchema = z.object({
  analysisResults: z
    .string()
    .describe('The insights derived from the analyzed document.'),
  userGoals: z.string().describe('The specific goals of the user.'),
});
export type GenerateKaizenRoadmapInput = z.infer<typeof GenerateKaizenRoadmapInputSchema>;

const GenerateKaizenRoadmapOutputSchema = z.object({
  roadmap: z.string().describe('A step-by-step roadmap with actionable steps for implementing Kaizen principles.'),
});
export type GenerateKaizenRoadmapOutput = z.infer<typeof GenerateKaizenRoadmapOutputSchema>;

export async function generateKaizenRoadmap(input: GenerateKaizenRoadmapInput): Promise<GenerateKaizenRoadmapOutput> {
  return generateKaizenRoadmapFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateKaizenRoadmapPrompt',
  input: {schema: GenerateKaizenRoadmapInputSchema},
  output: {schema: GenerateKaizenRoadmapOutputSchema},
  prompt: `Based on the following analysis results and user goals, generate a detailed, step-by-step roadmap with actionable steps for implementing Kaizen principles.

Analysis Results: {{{analysisResults}}}

User Goals: {{{userGoals}}}

Roadmap:`,
});

const generateKaizenRoadmapFlow = ai.defineFlow(
  {
    name: 'generateKaizenRoadmapFlow',
    inputSchema: GenerateKaizenRoadmapInputSchema,
    outputSchema: GenerateKaizenRoadmapOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
