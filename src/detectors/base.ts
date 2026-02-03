import { VibeScore } from '../types.js';

export interface Detector {
  name: string;
  detect(text: string): Promise<VibeScore[]>;
}
