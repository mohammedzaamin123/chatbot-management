
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../types';

interface MessageState {
  messages: Message[];
}

const initialState: MessageState = {
  messages: [
    {
      id: '1',
      content: 'Hello, I need help with my order',
      platform: 'whatsapp',
      status: 'unread',
      from: 'John Doe',
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      content: 'Great product! When will you restock?',
      platform: 'instagram',
      status: 'read',
      from: 'Sarah Wilson',
      timestamp: new Date().toISOString(),
    },
  ],
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    updateMessage: (state, action: PayloadAction<{ id: string; updates: Partial<Message> }>) => {
      const { id, updates } = action.payload;
      const messageIndex = state.messages.findIndex(message => message.id === id);
      if (messageIndex !== -1) {
        state.messages[messageIndex] = { ...state.messages[messageIndex], ...updates };
      }
    },
  },
});

export const { updateMessage } = messageSlice.actions;
export default messageSlice.reducer;
