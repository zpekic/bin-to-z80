import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import { formatHex } from '@/lib/z80-disassembler';
import { convertToIntelHex } from '@/lib/z80-disassembler';

interface HexViewerProps {
  data: Uint8Array;
  className?: string;
  originAddress?: number;
  fileName?: string;
}

const HexViewer: React.FC<HexViewerProps> = ({ 
  data, 
  className, 
  originAddress = 0,
  fileName = 'binary'
}) => {
  if (!data || data.length === 0) {
    return null;
  }

  // Create rows of 16 bytes each
  const rows = [];
  for (let i = 0; i < data.length; i += 16) {
    const rowBytes = Array.from(data.slice(i, i + 16));
    rows.push({ address: i, bytes: rowBytes });
  }

  const handleDownloadHex = () => {
    const hexContent = convertToIntelHex(data, originAddress);
    const blob = new Blob([hexContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName.replace(/\.[^/.]+$/, '') + '.hex';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('File downloaded', {
      description: `Saved as ${fileName.replace(/\.[^/.]+$/, '')}.hex`
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Hex View</h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2" 
          onClick={handleDownloadHex}
        >
          <Download className="h-4 w-4" />
          <span>Save as .hex</span>
        </Button>
      </div>
      
      <Card className={`w-full overflow-hidden border ${className}`}>
        <ScrollArea className="h-[500px] w-full">
          <div className="p-4 font-mono text-sm">
            <div className="mb-2 text-muted-foreground">
              <span className="inline-block w-10">Addr</span>
              <span className="inline-block ml-2">00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F</span>
              <span className="inline-block ml-4">ASCII</span>
            </div>
            {rows.map((row) => (
              <div key={row.address} className="hover:bg-muted/50 rounded px-1">
                <span className="inline-block w-10 text-muted-foreground">{formatHex(row.address + originAddress, 4)}</span>
                <span className="inline-block ml-2 space-x-1">
                  {row.bytes.map((byte, index) => (
                    <span key={index} className="inline-block w-6">
                      {formatHex(byte, 2)}
                    </span>
                  ))}
                  {/* Padding for incomplete rows */}
                  {row.bytes.length < 16 && (
                    <span style={{ width: `${(16 - row.bytes.length) * 24}px` }} className="inline-block"></span>
                  )}
                </span>
                <span className="inline-block ml-4 text-muted-foreground">
                  {row.bytes.map((byte, index) => {
                    const char = byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : '.';
                    return <span key={index}>{char}</span>;
                  })}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default HexViewer;
