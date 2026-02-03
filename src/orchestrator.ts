import { Detector } from './detectors/base.js';
import { AnalysisResult, VibeScore, VibeType } from './types.js';

export class Orchestrator {
  private detectors: Detector[] = [];

  registerDetector(detector: Detector) {
    this.detectors.push(detector);
  }

  async analyze(text: string): Promise<AnalysisResult> {
    const allScores: VibeScore[] = [];

    // Run all detectors
    for (const detector of this.detectors) {
      const scores = await detector.detect(text);
      allScores.push(...scores);
    }

    // Aggregate scores
    const vibeMap = new Map<VibeType, { totalConfidence: number; count: number; reasons: string[] }>();

    for (const score of allScores) {
      const current = vibeMap.get(score.type) || { totalConfidence: 0, count: 0, reasons: [] };
      current.totalConfidence += score.confidence;
      current.count += 1;
      current.reasons.push(score.reasoning);
      vibeMap.set(score.type, current);
    }

    // Determine primary vibe
    let primaryVibe = VibeType.Neutral;
    let maxConfidence = 0;
    const finalScores: VibeScore[] = [];

    for (const [type, data] of vibeMap.entries()) {
      // Simple aggregation: sum of confidence (could average, but sum rewards multi-detector agreement)
      // Cap at 1.0 for the final output score representation if desired, but for selection we use raw sum.
      
      const normalizedConfidence = Math.min(data.totalConfidence, 1.0); // Clamp for display
      
      finalScores.push({
        type,
        confidence: normalizedConfidence,
        reasoning: data.reasons.join(' | ')
      });

      if (data.totalConfidence > maxConfidence) {
        maxConfidence = data.totalConfidence;
        primaryVibe = type;
      }
    }

    // Sort scores
    finalScores.sort((a, b) => b.confidence - a.confidence);

    return {
      primaryVibe,
      scores: finalScores,
      summary: `Identified as ${primaryVibe} with confidence score ${maxConfidence.toFixed(2)} based on ${finalScores.length} indicators.`
    };
  }
}
