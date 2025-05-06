// src/ai/flows/analyze-kaizen-document.ts
'use server';
/**
 * @fileOverview Analyzes a Kaizen-related document to identify areas for improvement and generate insights.
 *
 * - analyzeKaizenDocument - A function that analyzes a Kaizen document.
 * - AnalyzeKaizenDocumentInput - The input type for the analyzeKaizenDocument function.
 * - AnalyzeKaizenDocumentOutput - The return type for the analyzeKaizenDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeKaizenDocumentInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      'The document to analyze, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected the expected format description
    ),
});
export type AnalyzeKaizenDocumentInput = z.infer<
  typeof AnalyzeKaizenDocumentInputSchema
>;

const AnalyzeKaizenDocumentOutputSchema = z.object({
  areasForImprovement: z
    .array(z.string())
    .describe('Potential areas for improvement identified in the document.'),
  keyInsights: z
    .array(z.string())
    .describe('Key insights extracted from the document relevant to Kaizen principles.'),
});

export type AnalyzeKaizenDocumentOutput = z.infer<
  typeof AnalyzeKaizenDocumentOutputSchema
>;

export async function analyzeKaizenDocument(
  input: AnalyzeKaizenDocumentInput
): Promise<AnalyzeKaizenDocumentOutput> {
  return analyzeKaizenDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeKaizenDocumentPrompt',
  input: {schema: AnalyzeKaizenDocumentInputSchema},
  output: {schema: AnalyzeKaizenDocumentOutputSchema},
  prompt: `You are a Kaizen expert. Analyze the provided document and identify potential areas for improvement and generate insights relevant to Kaizen principles.

Document: {{media url=documentDataUri}}

Areas for Improvement (as a bulleted list):

Key Insights (as a bulleted list):
`,
});

const analyzeKaizenDocumentFlow = ai.defineFlow(
  {
    name: 'analyzeKaizenDocumentFlow',
    inputSchema: AnalyzeKaizenDocumentInputSchema,
    outputSchema: AnalyzeKaizenDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
