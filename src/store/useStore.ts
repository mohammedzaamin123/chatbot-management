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
  usage: {
    messages: number;
    posts: number;
    storage: number;
  };
  limits: {
    messages: number;
    posts: number;
    storage: number;
  };
  is_active: boolean;
  created_at: string;
}

interface WebhookConfig {
  url: string;
  secret?: string;
  enabled: boolean;
}

interface PlatformConfig {
  platform: 'whatsapp' | 'telegram' | 'instagram' | 'facebook' | 'discord' | 'slack' | 'website';
  webhook?: WebhookConfig;
  api_token?: string;
  phone_number?: string;
  bot_token?: string;
}

interface Chatbot {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'training';
  platforms: PlatformConfig[];
  model: 'gpt-4o' | 'claude' | 'gemini';
  conversations: number;
  system_prompt: string;
  greeting: string;
  database_config?: {
    connection_id: string;
    permissions: ('READ' | 'WRITE' | 'UPDATE' | 'DELETE')[];
    collection?: string;
  };
  created_at: string;
}

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  budget: number;
  platform: 'meta' | 'google' | 'all';
  spent: number;
  reach: number;
  ctr: number;
  roi: number;
  created_at: string;
}

interface Message {
  id: string;
  content: string;
  platform: 'whatsapp' | 'instagram' | 'telegram' | 'facebook';
  status: 'unread' | 'read' | 'replied';
  from: string;
  timestamp: string;
  assigned_to?: string;
}

interface Analytics {
  totalPosts: number;
  engagement: number;
  reach: number;
  activeUsers: number;
  totalMessages: number;
  responseTime: number;
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
  addChatbot: (chatbot: Omit<Chatbot, 'id' | 'created_at'>) => void;
  updateChatbot: (id: string, updates: Partial<Chatbot>) => void;
  deleteChatbot: (id: string) => void;

  campaigns: Campaign[];
  addCampaign: (campaign: Omit<Campaign, 'id' | 'created_at'>) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;

  messages: Message[];
  updateMessage: (id: string, updates: Partial<Message>) => void;

  tenants: Tenant[];
  addTenant: (tenant: Omit<Tenant, 'id' | 'created_at'>) => void;
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
    plan: 'enterprise',
    usage: { messages: 15420, posts: 245, storage: 12.5 },
    limits: { messages: 100000, posts: 5000, storage: 50 },
    is_active: true,
    created_at: new Date().toISOString()
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
          created_at: new Date().toISOString(),
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
          created_at: new Date().toISOString(),
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
          created_at: new Date().toISOString(),
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
    reach: 0,
    activeUsers: 0,
    totalMessages: 0,
    responseTime: 0
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
      ] : state.chatbots,
      campaigns: state.campaigns.length === 0 ? [
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
      ] : state.campaigns,
      messages: state.messages.length === 0 ? [
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
      ] : state.messages,
      tenants: state.tenants.length === 0 ? [
        {
          id: '1',
          name: 'ChronoSync AI',
          plan: 'enterprise',
          usage: { messages: 15420, posts: 245, storage: 12.5 },
          limits: { messages: 100000, posts: 5000, storage: 50 },
          is_active: true,
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Demo Company',
          plan: 'pro',
          usage: { messages: 2840, posts: 89, storage: 3.2 },
          limits: { messages: 50000, posts: 1000, storage: 10 },
          is_active: true,
          created_at: new Date().toISOString(),
        },
      ] : state.tenants,
      analytics: {
        totalPosts: 45,
        engagement: 85.2,
        reach: 12500,
        activeUsers: 278000,
        totalMessages: 18260,
        responseTime: 2.4,
      },
    })),
}));
