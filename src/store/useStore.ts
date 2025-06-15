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

export interface DatabaseConnection {
  id: string;
  name: string;
  type: 'postgresql' | 'mongodb' | 'airtable';
  status: 'connected' | 'error' | 'connecting';
  collections: string[];
  last_sync: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'editor' | 'viewer';
}

interface Tenant {
  id: string;
  name: string;
  plan: 'free' | 'pro' | 'enterprise';
}

interface Chatbot {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  platform: string;
}

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  budget: number;
}

interface Message {
  id: string;
  content: string;
  platform: string;
  status: 'unread' | 'read';
}

interface Analytics {
  totalPosts: number;
  engagement: number;
  reach: number;
}

interface Store {
  // Posts
  draftPosts: DraftPost[];
  scheduledPosts: ScheduledPost[];
  addDraftPost: (post: Omit<DraftPost, 'id' | 'created_at'>) => void;
  addScheduledPost: (post: Omit<ScheduledPost, 'id' | 'created_at'>) => void;
  updateScheduledPost: (id: string, updates: Partial<ScheduledPost>) => void;
  deleteDraftPost: (id: string) => void;

  // UI State
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;

  // User & Tenant
  user: User | null;
  currentTenant: Tenant | null;

  // Database
  databases: DatabaseConnection[];
  addDatabase: (database: Omit<DatabaseConnection, 'id'>) => void;
  updateDatabase: (id: string, updates: Partial<DatabaseConnection>) => void;
  deleteDatabase: (id: string) => void;

  // Other entities
  chatbots: Chatbot[];
  addChatbot: (chatbot: Omit<Chatbot, 'id'>) => void;
  updateChatbot: (id: string, updates: Partial<Chatbot>) => void;
  deleteChatbot: (id: string) => void;

  campaigns: Campaign[];
  addCampaign: (campaign: Omit<Campaign, 'id'>) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;

  messages: Message[];
  updateMessage: (id: string, updates: Partial<Message>) => void;

  tenants: Tenant[];
  addTenant: (tenant: Omit<Tenant, 'id'>) => void;
  updateTenant: (id: string, updates: Partial<Tenant>) => void;
  deleteTenant: (id: string) => void;

  analytics: Analytics;

  // Initialize sample data
  initializeSampleData: () => void;
}

export const useStore = create<Store>((set) => ({
  // Posts
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

  // UI State
  sidebarCollapsed: false,
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  theme: 'dark',
  setTheme: (theme) => set({ theme }),

  // User & Tenant
  user: {
    id: '1',
    name: 'Alex Rodriguez',
    email: 'alex@chronosync.ai',
    role: 'super_admin'
  },
  currentTenant: {
    id: '1',
    name: 'ChronoSync AI',
    plan: 'enterprise'
  },

  // Database
  databases: [],
  addDatabase: (database) =>
    set((state) => ({
      databases: [
        ...state.databases,
        {
          ...database,
          id: Date.now().toString(),
        },
      ],
    })),

  updateDatabase: (id, updates) =>
    set((state) => ({
      databases: state.databases.map((db) =>
        db.id === id ? { ...db, ...updates } : db
      ),
    })),

  deleteDatabase: (id) =>
    set((state) => ({
      databases: state.databases.filter((db) => db.id !== id),
    })),

  // Other entities
  chatbots: [],
  addChatbot: (chatbot) =>
    set((state) => ({
      chatbots: [
        ...state.chatbots,
        {
          ...chatbot,
          id: Date.now().toString(),
        },
      ],
    })),

  updateChatbot: (id, updates) =>
    set((state) => ({
      chatbots: state.chatbots.map((bot) =>
        bot.id === id ? { ...bot, ...updates } : bot
      ),
    })),

  deleteChatbot: (id) =>
    set((state) => ({
      chatbots: state.chatbots.filter((bot) => bot.id !== id),
    })),

  campaigns: [],
  addCampaign: (campaign) =>
    set((state) => ({
      campaigns: [
        ...state.campaigns,
        {
          ...campaign,
          id: Date.now().toString(),
        },
      ],
    })),

  updateCampaign: (id, updates) =>
    set((state) => ({
      campaigns: state.campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, ...updates } : campaign
      ),
    })),

  messages: [],
  updateMessage: (id, updates) =>
    set((state) => ({
      messages: state.messages.map((message) =>
        message.id === id ? { ...message, ...updates } : message
      ),
    })),

  tenants: [],
  addTenant: (tenant) =>
    set((state) => ({
      tenants: [
        ...state.tenants,
        {
          ...tenant,
          id: Date.now().toString(),
        },
      ],
    })),

  updateTenant: (id, updates) =>
    set((state) => ({
      tenants: state.tenants.map((tenant) =>
        tenant.id === id ? { ...tenant, ...updates } : tenant
      ),
    })),

  deleteTenant: (id) =>
    set((state) => ({
      tenants: state.tenants.filter((tenant) => tenant.id !== id),
    })),

  analytics: {
    totalPosts: 0,
    engagement: 0,
    reach: 0
  },

  initializeSampleData: () =>
    set((state) => ({
      databases: state.databases.length === 0 ? [
        {
          id: '1',
          name: 'Customer Database',
          type: 'postgresql',
          status: 'connected',
          collections: ['users', 'orders', 'products'],
          last_sync: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Analytics DB',
          type: 'mongodb',
          status: 'connected',
          collections: ['events', 'sessions'],
          last_sync: new Date().toISOString(),
        },
      ] : state.databases,
      chatbots: state.chatbots.length === 0 ? [
        {
          id: '1',
          name: 'Customer Support Bot',
          status: 'active',
          platform: 'WhatsApp',
        },
        {
          id: '2',
          name: 'Sales Assistant',
          status: 'active',
          platform: 'Instagram',
        },
      ] : state.chatbots,
      campaigns: state.campaigns.length === 0 ? [
        {
          id: '1',
          name: 'Summer Sale 2024',
          status: 'active',
          budget: 5000,
        },
        {
          id: '2',
          name: 'Brand Awareness',
          status: 'paused',
          budget: 3000,
        },
      ] : state.campaigns,
      messages: state.messages.length === 0 ? [
        {
          id: '1',
          content: 'Hello, I need help with my order',
          platform: 'WhatsApp',
          status: 'unread',
        },
        {
          id: '2',
          content: 'Great product! When will you restock?',
          platform: 'Instagram',
          status: 'read',
        },
      ] : state.messages,
      tenants: state.tenants.length === 0 ? [
        {
          id: '1',
          name: 'ChronoSync AI',
          plan: 'enterprise',
        },
        {
          id: '2',
          name: 'Demo Company',
          plan: 'pro',
        },
      ] : state.tenants,
      analytics: {
        totalPosts: 45,
        engagement: 85.2,
        reach: 12500,
      },
    })),
}));
