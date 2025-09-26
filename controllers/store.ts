import { create } from 'zustand';
import { GameStoreState, GameStoreActions } from './types';
import { initialState } from './initialState';
import { createUiActionsSlice } from './uiActions';
import { createGameActionsSlice } from './gameActions';
import { createAssetActionsSlice } from './assetActions';
import { createTalentActionsSlice } from './talentActions';
import { createLivestreamActionsSlice } from './livestreamActions';
import { createProductionActionsSlice } from './productionActions';
import { createRiskActionsSlice } from './riskActions';
import { createGachaActionsSlice } from './gachaActions';

export const useGameStore = create<GameStoreState & GameStoreActions>((set, get) => ({
  ...initialState,
  ...createUiActionsSlice(set, get),
  ...createGameActionsSlice(set, get),
  ...createAssetActionsSlice(set, get),
  ...createTalentActionsSlice(set, get),
  ...createLivestreamActionsSlice(set, get),
  ...createProductionActionsSlice(set, get),
  ...createRiskActionsSlice(set, get),
  ...createGachaActionsSlice(set, get),
}));
