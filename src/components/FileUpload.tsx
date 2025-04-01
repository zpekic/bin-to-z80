
import React, { useCallback } from 'react';
import { Upload, FileUp, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

interface FileUploadProps {
  onFileLoaded: (data: Uint8Array, fileName: string) => void;
  isLoading: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileLoaded, isLoading }) => {
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File too large', {
        description: 'Maximum file size is 10MB'
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        try {
          const arrayBuffer = event.target.result as ArrayBuffer;
          const uint8Array = new Uint8Array(arrayBuffer);
          onFileLoaded(uint8Array, file.name);
          toast.success('File loaded successfully', {
            description: `Loaded ${file.name} (${file.size.toLocaleString()} bytes)`
          });
        } catch (error) {
          toast.error('Error reading file', {
            description: 'Please try another file'
          });
          console.error('Error reading file:', error);
        }
      }
    };
    
    reader.onerror = () => {
      toast.error('Error reading file', {
        description: 'Please try another file'
      });
    };
    
    reader.readAsArrayBuffer(file);
  }, [onFileLoaded]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const input = document.createElement('input');
      input.type = 'file';
      
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      input.files = dataTransfer.files;
      
      handleFileChange({ target: input } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  }, [handleFileChange]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return (
    <div className="relative w-full h-full">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')",
          opacity: 0.15,
          zIndex: 0
        }}
      />
      <Card
        className={`w-full p-8 border-2 border-dashed transition-all bg-secondary/80 backdrop-blur-sm overflow-hidden relative ${
          isLoading ? 'opacity-50 pointer-events-none' : ''
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="relative z-10 flex flex-col items-center justify-center gap-4 text-center">
          <div className="rounded-full bg-primary/10 p-4 backdrop-blur-md">
            <Upload className="h-8 w-8 text-primary animate-pulse-soft" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Upload Binary File</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Drag and drop your .bin file here, or click to browse files
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <Button className="gap-2" disabled={isLoading} asChild>
              <label className="cursor-pointer">
                <FileUp className="h-4 w-4" />
                Browse Files
                <input
                  type="file"
                  className="sr-only"
                  accept=".bin"
                  onChange={handleFileChange}
                  disabled={isLoading}
                />
              </label>
            </Button>
            
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Only .bin files up to 10MB are supported
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FileUpload;
