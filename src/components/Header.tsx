
import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, User, LogOut, Settings, UserCircle, CreditCard, HelpCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ThemeToggle } from './ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useStore } from '../store/useStore';

export const Header: React.FC = () => {
  const { user, currentTenant } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const isMessagesPage = location.pathname === '/messages';

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleBillingClick = () => {
    navigate('/billing');
  };

  const handleSupportClick = () => {
    navigate('/support');
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
  };

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

        {/* Theme Toggle - Hide on messages page */}
        {!isMessagesPage && <ThemeToggle />}

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-neon-magenta rounded-full flex items-center justify-center text-xs">
            3
          </span>
        </Button>

        {/* User Menu with Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer">
              {user && (
                <>
                  <div className="hidden sm:block text-right">
                    <div className="font-medium text-sm">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </div>
                  
                  <div className="w-10 h-10 bg-neon-gradient rounded-full flex items-center justify-center text-white font-bold hover:scale-105 transition-transform">
                    {user.name.charAt(0)}
                  </div>
                </>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="w-56 glass-strong border-white/20 bg-background/95 backdrop-blur-md" 
            align="end"
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleBillingClick} className="cursor-pointer">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSupportClick} className="cursor-pointer">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-400">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
};
