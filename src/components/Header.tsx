
import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, User, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useStore } from '../store/useStore';

export const Header: React.FC = () => {
  const { user, currentTenant } = useStore();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-16 glass-strong border-b border-white/10 backdrop-blur-2xl px-6 flex items-center justify-between"
    >
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search anything..."
            className="pl-10 glass border-white/20 focus:border-neon-purple"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Tenant Info */}
        {currentTenant && (
          <div className="hidden md:block text-right">
            <div className="font-medium text-sm">{currentTenant.name}</div>
            <div className="text-xs text-muted-foreground capitalize">
              {currentTenant.plan} plan
            </div>
          </div>
        )}

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-neon-magenta rounded-full flex items-center justify-center text-xs">
            3
          </span>
        </Button>

        {/* User Menu */}
        <div className="flex items-center gap-3">
          {user && (
            <>
              <div className="hidden sm:block text-right">
                <div className="font-medium text-sm">{user.name}</div>
                <div className="text-xs text-muted-foreground">{user.email}</div>
              </div>
              
              <div className="w-10 h-10 bg-neon-gradient rounded-full flex items-center justify-center text-white font-bold">
                {user.name.charAt(0)}
              </div>
            </>
          )}
          
          <Button variant="ghost" size="sm">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.header>
  );
};
