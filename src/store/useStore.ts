import { create } from 'zustand';

interface DraftPost {
  id: string;
  content: string;
  platforms: ('instagram' | 'facebook' | 'twitter' | 'linkedin')[];
  media: string[];
  created_at: string;
}

interface ScheduledPost {
  id: string;
  content: string;
  platforms: ('instagram' | 'facebook' | 'twitter' | 'linkedin')[];
  scheduled_at: string;
  status: 'scheduled' | 'published' | 'failed';
  media: string[];
  created_at: string;
}

interface Store {
  draftPosts: DraftPost[];
  scheduledPosts: ScheduledPost[];
  addDraftPost: (post: Omit<DraftPost, 'id' | 'created_at'>) => void;
  addScheduledPost: (post: Omit<ScheduledPost, 'id' | 'created_at'>) => void;
  updateScheduledPost: (id: string, updates: Partial<ScheduledPost>) => void;
  deleteDraftPost: (id: string) => void;
}

export const useStore = create<Store>((set) => ({
  draftPosts: [],
  scheduledPosts: [],
  
  addDraftPost: (post) => 
    set((state) => ({
      draftPosts: [
        ...state.draftPosts,
        {
          ...post,
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
        },
      ],
    })),

  addScheduledPost: (post) =>
    set((state) => ({
      scheduledPosts: [
        ...state.scheduledPosts,
        {
          ...post,
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
        },
      ],
    })),

  updateScheduledPost: (id, updates) =>
    set((state) => ({
      scheduledPosts: state.scheduledPosts.map((post) =>
        post.id === id ? { ...post, ...updates } : post
      ),
    })),

  deleteDraftPost: (id) =>
    set((state) => ({
      draftPosts: state.draftPosts.filter((post) => post.id !== id),
    })),
}));
