
import React from 'react';
import { Github, FileCode2, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="w-full py-6 px-8 flex justify-between items-center border-b border-border animate-fade-in">
      <div className="flex items-center space-x-2">
        <FileCode2 className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-semibold tracking-tight">BIN to Z80</h1>
      </div>

      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
          className="hover-lift"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 hover-lift"
          asChild
        >
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </Button>
      </div>
    </header>
  );
};

export default Header;
