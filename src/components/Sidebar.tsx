
import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Bot, 
  Sparkles, 
  Calendar, 
  Target, 
  MessageSquare, 
  Workflow, 
  Database, 
  Users, 
  Settings,
  Menu,
  Zap
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from './ui/button';

const navItems = [
  { 
    path: '/', 
    icon: LayoutDashboard, 
    label: 'Dashboard',
    description: 'Overview & Analytics'
  },
  { 
    path: '/chatbots', 
    icon: Bot, 
    label: 'Chatbots',
    description: 'AI Assistant Manager'
  },
  { 
    path: '/content', 
    icon: Sparkles, 
    label: 'Content Creator',
    description: 'AI-Powered Content'
  },
  { 
    path: '/scheduler', 
    icon: Calendar, 
    label: 'Post Scheduler',
    description: 'Social Media Planner'
  },
  { 
    path: '/campaigns', 
    icon: Target, 
    label: 'Campaigns',
    description: 'Ads & Marketing'
  },
  { 
    path: '/messages', 
    icon: MessageSquare, 
    label: 'Messages',
    description: 'Unified Inbox'
  },
  { 
    path: '/automation', 
    icon: Workflow, 
    label: 'Automation',
    description: 'Flow Builder'
  },
  { 
    path: '/database', 
    icon: Database, 
    label: 'Database',
    description: 'Data Management'
  },
  { 
    path: '/tenants', 
    icon: Users, 
    label: 'Tenants',
    description: 'Multi-Tenant Admin'
  },
  { 
    path: '/settings', 
    icon: Settings, 
    label: 'Settings',
    description: 'Configuration'
  }
];

export const Sidebar: React.FC = () => {
  const { sidebarCollapsed, setSidebarCollapsed, user } = useStore();

  // Hide tenant management for non-super admins
  const filteredNavItems = navItems.filter(item => 
    item.path !== '/tenants' || user?.role === 'super_admin'
  );

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className={`fixed left-0 top-0 h-full z-50 transition-all duration-300 ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="h-full glass-strong border-r border-white/10 backdrop-blur-2xl">
        {/* Logo & Toggle */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-neon-gradient rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg neon-text">ChronoSync</h1>
                  <p className="text-xs text-muted-foreground">AI Platform</p>
                </div>
              </motion.div>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-white/10"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {filteredNavItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-item group ${isActive ? 'active' : ''}`
                }
              >
                <item.icon className="w-5 h-5 shrink-0" />
                
                {!sidebarCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {item.description}
                    </div>
                  </div>
                )}
                
                {sidebarCollapsed && (
                  <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                )}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* User Info */}
        <div className="absolute bottom-4 left-4 right-4">
          {!sidebarCollapsed && user && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-xl p-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-neon-gradient rounded-full flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{user.name}</div>
                  <div className="text-xs text-muted-foreground capitalize">
                    {user.role.replace('_', ' ')}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.aside>
  );
};
