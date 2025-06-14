
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'super_admin';
  tenant_id: string;
  avatar?: string;
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
  created_at: string;
  is_active: boolean;
}

interface Chatbot {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'training';
  model: 'gpt-4o' | 'claude' | 'gemini';
  conversations: number;
  created_at: string;
  system_prompt: string;
  greeting: string;
  avatar?: string;
  database_config?: {
    connection_id: string;
    permissions: ('READ' | 'WRITE' | 'UPDATE' | 'DELETE')[];
  };
}

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  platform: 'meta' | 'google' | 'all';
  budget: number;
  spent: number;
  reach: number;
  ctr: number;
  roi: number;
  created_at: string;
}

interface ScheduledPost {
  id: string;
  content: string;
  platforms: ('instagram' | 'facebook' | 'twitter' | 'linkedin')[];
  scheduled_at: string;
  status: 'scheduled' | 'published' | 'failed';
  media?: string[];
}

interface Message {
  id: string;
  platform: 'whatsapp' | 'instagram' | 'telegram' | 'facebook';
  from: string;
  content: string;
  timestamp: string;
  status: 'unread' | 'read' | 'replied';
  assigned_to?: string;
}

interface DatabaseConnection {
  id: string;
  name: string;
  type: 'mongodb' | 'postgresql' | 'airtable';
  status: 'connected' | 'disconnected' | 'error';
  collections: string[];
  last_sync: string;
}

interface AppStore {
  // User & Auth
  user: User | null;
  isAuthenticated: boolean;
  currentTenant: Tenant | null;
  
  // Data
  chatbots: Chatbot[];
  campaigns: Campaign[];
  scheduledPosts: ScheduledPost[];
  messages: Message[];
  databases: DatabaseConnection[];
  tenants: Tenant[];
  
  // UI State
  sidebarCollapsed: boolean;
  currentView: string;
  loading: boolean;
  
  // Analytics
  analytics: {
    totalMessages: number;
    totalPosts: number;
    responseTime: number;
    activeUsers: number;
    growth: number;
  };
  
  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (auth: boolean) => void;
  setCurrentTenant: (tenant: Tenant | null) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setCurrentView: (view: string) => void;
  setLoading: (loading: boolean) => void;
  
  // CRUD Operations
  addChatbot: (chatbot: Omit<Chatbot, 'id' | 'created_at'>) => void;
  updateChatbot: (id: string, updates: Partial<Chatbot>) => void;
  deleteChatbot: (id: string) => void;
  
  addCampaign: (campaign: Omit<Campaign, 'id' | 'created_at'>) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  
  addScheduledPost: (post: Omit<ScheduledPost, 'id'>) => void;
  updateScheduledPost: (id: string, updates: Partial<ScheduledPost>) => void;
  deleteScheduledPost: (id: string) => void;
  
  addMessage: (message: Omit<Message, 'id'>) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  deleteMessage: (id: string) => void;
  
  addDatabase: (db: Omit<DatabaseConnection, 'id'>) => void;
  updateDatabase: (id: string, updates: Partial<DatabaseConnection>) => void;
  deleteDatabase: (id: string) => void;
  
  // Super Admin
  addTenant: (tenant: Omit<Tenant, 'id' | 'created_at'>) => void;
  updateTenant: (id: string, updates: Partial<Tenant>) => void;
  deleteTenant: (id: string) => void;
  
  // Initialize sample data
  initializeSampleData: () => void;
}

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      currentTenant: null,
      chatbots: [],
      campaigns: [],
      scheduledPosts: [],
      messages: [],
      databases: [],
      tenants: [],
      sidebarCollapsed: false,
      currentView: 'dashboard',
      loading: false,
      analytics: {
        totalMessages: 0,
        totalPosts: 0,
        responseTime: 0,
        activeUsers: 0,
        growth: 0,
      },
      
      // Basic actions
      setUser: (user) => set({ user }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setCurrentTenant: (currentTenant) => set({ currentTenant }),
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
      setCurrentView: (currentView) => set({ currentView }),
      setLoading: (loading) => set({ loading }),
      
      // Chatbot CRUD
      addChatbot: (chatbot) => set((state) => ({
        chatbots: [...state.chatbots, {
          ...chatbot,
          id: `bot_${Date.now()}`,
          created_at: new Date().toISOString(),
        }]
      })),
      updateChatbot: (id, updates) => set((state) => ({
        chatbots: state.chatbots.map(bot => 
          bot.id === id ? { ...bot, ...updates } : bot
        )
      })),
      deleteChatbot: (id) => set((state) => ({
        chatbots: state.chatbots.filter(bot => bot.id !== id)
      })),
      
      // Campaign CRUD
      addCampaign: (campaign) => set((state) => ({
        campaigns: [...state.campaigns, {
          ...campaign,
          id: `camp_${Date.now()}`,
          created_at: new Date().toISOString(),
        }]
      })),
      updateCampaign: (id, updates) => set((state) => ({
        campaigns: state.campaigns.map(camp => 
          camp.id === id ? { ...camp, ...updates } : camp
        )
      })),
      deleteCampaign: (id) => set((state) => ({
        campaigns: state.campaigns.filter(camp => camp.id !== id)
      })),
      
      // Post CRUD
      addScheduledPost: (post) => set((state) => ({
        scheduledPosts: [...state.scheduledPosts, {
          ...post,
          id: `post_${Date.now()}`,
        }]
      })),
      updateScheduledPost: (id, updates) => set((state) => ({
        scheduledPosts: state.scheduledPosts.map(post => 
          post.id === id ? { ...post, ...updates } : post
        )
      })),
      deleteScheduledPost: (id) => set((state) => ({
        scheduledPosts: state.scheduledPosts.filter(post => post.id !== id)
      })),
      
      // Message CRUD
      addMessage: (message) => set((state) => ({
        messages: [...state.messages, {
          ...message,
          id: `msg_${Date.now()}`,
        }]
      })),
      updateMessage: (id, updates) => set((state) => ({
        messages: state.messages.map(msg => 
          msg.id === id ? { ...msg, ...updates } : msg
        )
      })),
      deleteMessage: (id) => set((state) => ({
        messages: state.messages.filter(msg => msg.id !== id)
      })),
      
      // Database CRUD
      addDatabase: (db) => set((state) => ({
        databases: [...state.databases, {
          ...db,
          id: `db_${Date.now()}`,
        }]
      })),
      updateDatabase: (id, updates) => set((state) => ({
        databases: state.databases.map(db => 
          db.id === id ? { ...db, ...updates } : db
        )
      })),
      deleteDatabase: (id) => set((state) => ({
        databases: state.databases.filter(db => db.id !== id)
      })),
      
      // Tenant CRUD (Super Admin)
      addTenant: (tenant) => set((state) => ({
        tenants: [...state.tenants, {
          ...tenant,
          id: `tenant_${Date.now()}`,
          created_at: new Date().toISOString(),
        }]
      })),
      updateTenant: (id, updates) => set((state) => ({
        tenants: state.tenants.map(tenant => 
          tenant.id === id ? { ...tenant, ...updates } : tenant
        )
      })),
      deleteTenant: (id) => set((state) => ({
        tenants: state.tenants.filter(tenant => tenant.id !== id)
      })),
      
      // Initialize sample data
      initializeSampleData: () => {
        const sampleUser: User = {
          id: 'user_1',
          name: 'Alex Rodriguez',
          email: 'alex@chronosync.ai',
          role: 'admin',
          tenant_id: 'tenant_1',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        };

        const sampleTenant: Tenant = {
          id: 'tenant_1',
          name: 'ChronoSync Labs',
          plan: 'pro',
          usage: { messages: 12450, posts: 340, storage: 2.1 },
          limits: { messages: 50000, posts: 1000, storage: 10 },
          created_at: '2024-01-15T00:00:00Z',
          is_active: true
        };

        const sampleChatbots: Chatbot[] = [
          {
            id: 'bot_1',
            name: 'Customer Support AI',
            status: 'active',
            model: 'gpt-4o',
            conversations: 1247,
            created_at: '2024-01-20T00:00:00Z',
            system_prompt: 'You are a helpful customer support assistant.',
            greeting: 'Hi! How can I help you today?',
            database_config: {
              connection_id: 'db_1',
              permissions: ['READ', 'WRITE']
            }
          },
          {
            id: 'bot_2',
            name: 'Sales Assistant',
            status: 'active',
            model: 'claude',
            conversations: 892,
            created_at: '2024-01-22T00:00:00Z',
            system_prompt: 'You are a sales assistant focused on converting leads.',
            greeting: 'Welcome! Ready to find the perfect solution for you?'
          },
          {
            id: 'bot_3',
            name: 'Technical Support',
            status: 'training',
            model: 'gemini',
            conversations: 234,
            created_at: '2024-01-25T00:00:00Z',
            system_prompt: 'You provide technical support and troubleshooting.',
            greeting: 'Hi! I\'m here to help with any technical issues.'
          }
        ];

        const sampleCampaigns: Campaign[] = [
          {
            id: 'camp_1',
            name: 'Q1 Product Launch',
            status: 'active',
            platform: 'meta',
            budget: 5000,
            spent: 2340,
            reach: 45600,
            ctr: 3.2,
            roi: 280,
            created_at: '2024-01-10T00:00:00Z'
          },
          {
            id: 'camp_2',
            name: 'Brand Awareness',
            status: 'active',
            platform: 'google',
            budget: 3000,
            spent: 1890,
            reach: 32100,
            ctr: 2.8,
            roi: 220,
            created_at: '2024-01-15T00:00:00Z'
          }
        ];

        const sampleDatabases: DatabaseConnection[] = [
          {
            id: 'db_1',
            name: 'Customer Data',
            type: 'postgresql',
            status: 'connected',
            collections: ['users', 'orders', 'support_tickets'],
            last_sync: '2024-01-30T12:00:00Z'
          },
          {
            id: 'db_2',
            name: 'Product Catalog',
            type: 'mongodb',
            status: 'connected',
            collections: ['products', 'categories', 'inventory'],
            last_sync: '2024-01-30T11:30:00Z'
          }
        ];

        const sampleTenants: Tenant[] = [
          sampleTenant,
          {
            id: 'tenant_2',
            name: 'TechCorp Solutions',
            plan: 'enterprise',
            usage: { messages: 28900, posts: 780, storage: 5.4 },
            limits: { messages: 100000, posts: 5000, storage: 50 },
            created_at: '2024-01-10T00:00:00Z',
            is_active: true
          },
          {
            id: 'tenant_3',
            name: 'StartupXYZ',
            plan: 'free',
            usage: { messages: 450, posts: 12, storage: 0.2 },
            limits: { messages: 1000, posts: 50, storage: 1 },
            created_at: '2024-01-25T00:00:00Z',
            is_active: true
          }
        ];

        set({
          user: sampleUser,
          isAuthenticated: true,
          currentTenant: sampleTenant,
          chatbots: sampleChatbots,
          campaigns: sampleCampaigns,
          databases: sampleDatabases,
          tenants: sampleTenants,
          analytics: {
            totalMessages: 12450,
            totalPosts: 340,
            responseTime: 1.2,
            activeUsers: 278000,
            growth: 23.5
          }
        });
      }
    }),
    {
      name: 'chronosync-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        currentTenant: state.currentTenant,
        sidebarCollapsed: state.sidebarCollapsed
      })
    }
  )
);
