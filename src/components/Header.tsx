
import React from 'react';
import { Github, FileCode2, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { CPU_ARCHITECTURES } from '@/lib/cpu/constants';
import intel8080Chip from '@/assets/intel-8080-chip.jpg';
import intel8085Chip from '@/assets/intel-8085-chip.jpg';
import z80Chip from '@/assets/z80-chip.jpg';

interface HeaderProps {
  selectedCpu?: string;
}

const Header: React.FC<HeaderProps> = ({ selectedCpu }) => {
  const { theme, setTheme } = useTheme();
  
  const getChipImage = () => {
    switch (selectedCpu) {
      case CPU_ARCHITECTURES.INTEL_8080:
        return intel8080Chip;
      case CPU_ARCHITECTURES.INTEL_8085:
        return intel8085Chip;
      case CPU_ARCHITECTURES.Z80:
        return z80Chip;
      default:
        return null;
    }
  };

  const chipImage = getChipImage();

  return (
    <header className="relative w-full py-6 px-8 flex justify-between items-center border-b border-border animate-fade-in overflow-hidden">
      {chipImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm transition-all duration-500"
          style={{ backgroundImage: `url(${chipImage})` }}
        />
      )}
      <div className="relative flex items-center space-x-2 z-10">
        <FileCode2 className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-semibold tracking-tight">BIN to Z80</h1>
      </div>

      <div className="relative flex items-center space-x-4 z-10">
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
