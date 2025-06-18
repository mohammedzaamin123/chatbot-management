
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { useStore } from '../store/useStore';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useStore();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Apply theme to document
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="glass border-border hover:scale-105 transition-all duration-200 w-10 h-10 p-0 hover:bg-accent"
    >
      {theme === 'light' ? (
        <Moon className="w-4 h-4" />
      ) : (
        <Sun className="w-4 h-4" />
      )}
    </Button>
  );
};
