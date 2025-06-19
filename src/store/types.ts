
export interface DraftPost {
  id: string;
  content: string;
  platforms: ('instagram' | 'facebook' | 'twitter' | 'linkedin')[];
  media: string[];
  created_at: string;
}

export interface ScheduledPost {
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

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'editor' | 'viewer';
}

export interface Tenant {
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

export interface WebhookConfig {
  url: string;
  secret?: string;
  enabled: boolean;
}

export interface PlatformConfig {
  platform: 'whatsapp' | 'telegram' | 'instagram' | 'facebook' | 'discord' | 'slack' | 'website';
  webhook?: WebhookConfig;
  api_token?: string;
  phone_number?: string;
  bot_token?: string;
}

export interface Chatbot {
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

export interface Campaign {
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

export interface Message {
  id: string;
  content: string;
  platform: 'whatsapp' | 'instagram' | 'telegram' | 'facebook';
  status: 'unread' | 'read' | 'replied';
  from: string;
  timestamp: string;
  assigned_to?: string;
}

export interface Analytics {
  totalPosts: number;
  engagement: number;
  reach: number;
  activeUsers: number;
  totalMessages: number;
  responseTime: number;
}
