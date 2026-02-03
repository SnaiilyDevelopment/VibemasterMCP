import { Detector } from './base.js';
import { VibeType, VibeScore } from '../types.js';

export class KeywordDetector implements Detector {
  name = 'KeywordDetector';

  private keywords: Record<VibeType, string[]> = {
    [VibeType.Professional]: ['regards', 'sincerely', 'deadline', 'objective', 'workflow', 'leverage', 'synergy'],
    [VibeType.Casual]: ['hey', 'lol', 'cool', 'stuff', 'gonna', 'wanna', 'yeah', 'vibes'],
    [VibeType.Aggressive]: ['stupid', 'idiot', 'wrong', 'fail', 'bad', 'hate', 'worst', 'shut up'],
    [VibeType.Helpful]: ['assist', 'guide', 'help', 'support', 'solution', 'recommend', 'tip'],
    [VibeType.Sarcastic]: ['great job', 'obviously', 'clearly', 'sure', 'wow'], // Context dependent, hard for keywords
    [VibeType.Enthusiastic]: ['awesome', 'amazing', 'love', 'fantastic', 'excited', 'great!', 'wow!'],
    [VibeType.Neutral]: []
  };

  async detect(text: string): Promise<VibeScore[]> {
    const lowerText = text.toLowerCase();
    const scores: VibeScore[] = [];

    for (const [vibe, words] of Object.entries(this.keywords)) {
      if (vibe === VibeType.Neutral) continue;
      
      let matchCount = 0;
      const foundWords: string[] = [];

      for (const word of words) {
        if (lowerText.includes(word)) {
          matchCount++;
          foundWords.push(word);
        }
      }

      if (matchCount > 0) {
        scores.push({
          type: vibe as VibeType,
          confidence: Math.min(matchCount * 0.2, 1.0), // Simple heuristic
          reasoning: `Found keywords: ${foundWords.join(', ')}`
        });
      }
    }

    if (scores.length === 0) {
      scores.push({
        type: VibeType.Neutral,
        confidence: 0.5,
        reasoning: 'No specific vibe keywords detected.'
      });
    }

    return scores;
  }
}
