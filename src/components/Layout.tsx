
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { FloatingChatbot } from './FloatingChatbot';
import { useStore } from '../store/useStore';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { sidebarCollapsed, initializeSampleData, theme } = useStore();

  useEffect(() => {
    // Initialize sample data on first load
    initializeSampleData();
    
    // Initialize theme - light theme is default
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [initializeSampleData, theme]);

  return (
    <div className="min-h-screen bg-background text-foreground flex transition-all duration-300">
      <Sidebar />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarCollapsed ? 'ml-20' : 'ml-64'
      }`}>
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>
      
      <FloatingChatbot />
    </div>
  );
};
