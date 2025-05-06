import { config } from 'dotenv';
config();

import '@/ai/flows/provide-kaizen-guidance.ts';
import '@/ai/flows/generate-kaizen-roadmap.ts';
import '@/ai/flows/analyze-kaizen-document.ts';