import { z } from 'zod';

export enum VibeType {
  Professional = 'professional',
  Casual = 'casual',
  Aggressive = 'aggressive',
  Helpful = 'helpful',
  Sarcastic = 'sarcastic',
  Enthusiastic = 'enthusiastic',
  Neutral = 'neutral'
}

export const VibeSchema = z.nativeEnum(VibeType);

export interface VibeScore {
  type: VibeType;
  confidence: number; // 0.0 to 1.0
  reasoning: string;
}

export interface AnalysisResult {
  primaryVibe: VibeType;
  scores: VibeScore[];
  summary: string;
}
