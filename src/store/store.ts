
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';
import uiReducer from './slices/uiSlice';
import userReducer from './slices/userSlice';
import databaseReducer from './slices/databaseSlice';
import chatbotReducer from './slices/chatbotSlice';
import campaignReducer from './slices/campaignSlice';
import messageReducer from './slices/messageSlice';
import tenantReducer from './slices/tenantSlice';
import analyticsReducer from './slices/analyticsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    ui: uiReducer,
    user: userReducer,
    database: databaseReducer,
    chatbot: chatbotReducer,
    campaign: campaignReducer,
    message: messageReducer,
    tenant: tenantReducer,
    analytics: analyticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
