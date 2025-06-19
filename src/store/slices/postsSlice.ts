
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DraftPost, ScheduledPost } from '../types';

interface PostsState {
  draftPosts: DraftPost[];
  scheduledPosts: ScheduledPost[];
}

const initialState: PostsState = {
  draftPosts: [],
  scheduledPosts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addDraftPost: (state, action: PayloadAction<Omit<DraftPost, 'id' | 'created_at'>>) => {
      const newPost: DraftPost = {
        ...action.payload,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      };
      state.draftPosts.push(newPost);
    },
    addScheduledPost: (state, action: PayloadAction<Omit<ScheduledPost, 'id' | 'created_at'>>) => {
      const newPost: ScheduledPost = {
        ...action.payload,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      };
      state.scheduledPosts.push(newPost);
    },
    updateScheduledPost: (state, action: PayloadAction<{ id: string; updates: Partial<ScheduledPost> }>) => {
      const { id, updates } = action.payload;
      const postIndex = state.scheduledPosts.findIndex(post => post.id === id);
      if (postIndex !== -1) {
        state.scheduledPosts[postIndex] = { ...state.scheduledPosts[postIndex], ...updates };
      }
    },
    deleteDraftPost: (state, action: PayloadAction<string>) => {
      state.draftPosts = state.draftPosts.filter(post => post.id !== action.payload);
    },
  },
});

export const { addDraftPost, addScheduledPost, updateScheduledPost, deleteDraftPost } = postsSlice.actions;
export default postsSlice.reducer;
