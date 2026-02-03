import { Detector } from './base.js';
import { VibeType, VibeScore } from '../types.js';

export class PatternDetector implements Detector {
  name = 'PatternDetector';

  async detect(text: string): Promise<VibeScore[]> {
    const scores: VibeScore[] = [];

    // Check for aggressive caps
    const upperCount = text.replace(/[^A-Z]/g, '').length;
    const totalCount = text.replace(/[^a-zA-Z]/g, '').length;
    if (totalCount > 10 && upperCount / totalCount > 0.6) {
      scores.push({
        type: VibeType.Aggressive,
        confidence: 0.8,
        reasoning: 'Excessive use of ALL CAPS.'
      });
    }

    // Check for enthusiastic exclamation
    const exclamationCount = (text.match(/!/g) || []).length;
    if (exclamationCount > 2) {
      scores.push({
        type: VibeType.Enthusiastic,
        confidence: Math.min(exclamationCount * 0.15, 0.9),
        reasoning: 'Multiple exclamation marks detected.'
      });
    }

    // Check for casual ellipses
    if (text.includes('...')) {
        scores.push({
            type: VibeType.Casual,
            confidence: 0.3,
            reasoning: 'Uses ellipses, conversational style.'
        });
    }

    return scores;
  }
}
