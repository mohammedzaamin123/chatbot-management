
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chatbot } from '../types';

interface ChatbotState {
  chatbots: Chatbot[];
}

const initialState: ChatbotState = {
  chatbots: [
    {
      id: '1',
      name: 'Customer Support Bot',
      status: 'active',
      platforms: [
        {
          platform: 'whatsapp',
          webhook: {
            url: 'https://api.example.com/webhook/whatsapp',
            enabled: true
          },
          phone_number: '+1234567890'
        }
      ],
      model: 'gpt-4o',
      conversations: 1247,
      system_prompt: 'You are a helpful customer support assistant.',
      greeting: 'Hi! How can I help you today?',
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Sales Assistant',
      status: 'active',
      platforms: [
        {
          platform: 'telegram',
          webhook: {
            url: 'https://api.example.com/webhook/telegram',
            enabled: true
          },
          bot_token: '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11'
        }
      ],
      model: 'claude',
      conversations: 856,
      system_prompt: 'You are a sales assistant helping customers with purchases.',
      greeting: 'Welcome! I\'m here to help you find what you need.',
      created_at: new Date().toISOString(),
    },
  ],
};

const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    addChatbot: (state, action: PayloadAction<Omit<Chatbot, 'id' | 'created_at'>>) => {
      const newChatbot: Chatbot = {
        ...action.payload,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      };
      state.chatbots.push(newChatbot);
    },
    updateChatbot: (state, action: PayloadAction<{ id: string; updates: Partial<Chatbot> }>) => {
      const { id, updates } = action.payload;
      const botIndex = state.chatbots.findIndex(bot => bot.id === id);
      if (botIndex !== -1) {
        state.chatbots[botIndex] = { ...state.chatbots[botIndex], ...updates };
      }
    },
    deleteChatbot: (state, action: PayloadAction<string>) => {
      state.chatbots = state.chatbots.filter(bot => bot.id !== action.payload);
    },
  },
});

export const { addChatbot, updateChatbot, deleteChatbot } = chatbotSlice.actions;
export default chatbotSlice.reducer;
