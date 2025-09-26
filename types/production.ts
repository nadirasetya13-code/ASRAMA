import { ActiveBuff } from './buff';

export interface ProductionSetup {
  talentId: string;
  batchSize?: number;
  contentType?: 'Foto' | 'Video';
  theme?: string;
}

export interface ProductionResult {
  talentId: string;
  contentType: 'Foto' | 'Video';
  producedItemsCount: number;
  averageQuality: number;
  totalCost: number;
  scandal: ActiveBuff | null;
  xpGained: number;
}