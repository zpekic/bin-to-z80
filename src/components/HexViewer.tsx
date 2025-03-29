
import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatHex } from '@/lib/z80/formatters';

interface HexViewerProps {
  data: Uint8Array;
  className?: string;
}

const HexViewer: React.FC<HexViewerProps> = ({ data, className }) => {
  if (!data || data.length === 0) {
    return null;
  }

  // Create rows of 16 bytes each
  const rows = [];
  for (let i = 0; i < data.length; i += 16) {
    const rowBytes = Array.from(data.slice(i, i + 16));
    rows.push({ address: i, bytes: rowBytes });
  }

  return (
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
              <span className="inline-block w-10 text-muted-foreground">{formatHex(row.address, 4)}</span>
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
  );
};

export default HexViewer;
