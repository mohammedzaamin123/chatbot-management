
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Analytics } from '../types';

interface AnalyticsState {
  analytics: Analytics;
}

const initialState: AnalyticsState = {
  analytics: {
    totalPosts: 45,
    engagement: 85.2,
    reach: 12500,
    activeUsers: 278000,
    totalMessages: 18260,
    responseTime: 2.4,
  },
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    updateAnalytics: (state, action: PayloadAction<Partial<Analytics>>) => {
      state.analytics = { ...state.analytics, ...action.payload };
    },
  },
});

export const { updateAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer;
