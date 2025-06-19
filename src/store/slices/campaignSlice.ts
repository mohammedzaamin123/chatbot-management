
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Campaign } from '../types';

interface CampaignState {
  campaigns: Campaign[];
}

const initialState: CampaignState = {
  campaigns: [
    {
      id: '1',
      name: 'Summer Sale 2024',
      status: 'active',
      budget: 5000,
      platform: 'meta',
      spent: 2340,
      reach: 45000,
      ctr: 2.8,
      roi: 185,
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Brand Awareness',
      status: 'paused',
      budget: 3000,
      platform: 'google',
      spent: 1200,
      reach: 28000,
      ctr: 1.9,
      roi: 142,
      created_at: new Date().toISOString(),
    },
  ],
};

const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    addCampaign: (state, action: PayloadAction<Omit<Campaign, 'id' | 'created_at'>>) => {
      const newCampaign: Campaign = {
        ...action.payload,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      };
      state.campaigns.push(newCampaign);
    },
    updateCampaign: (state, action: PayloadAction<{ id: string; updates: Partial<Campaign> }>) => {
      const { id, updates } = action.payload;
      const campaignIndex = state.campaigns.findIndex(campaign => campaign.id === id);
      if (campaignIndex !== -1) {
        state.campaigns[campaignIndex] = { ...state.campaigns[campaignIndex], ...updates };
      }
    },
  },
});

export const { addCampaign, updateCampaign } = campaignSlice.actions;
export default campaignSlice.reducer;
