
import React, { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { formatHex } from '@/lib/z80-disassembler';

interface AssemblyCodeViewerProps {
  disassembly: {
    address: number;
    instruction: {
      mnemonic: string;
      operands: string;
      bytes: number[];
      size: number;
      comment?: string;
      targetAddress?: number;
    };
  }[];
  fileName: string;
}

const AssemblyCodeViewer: React.FC<AssemblyCodeViewerProps> = ({ disassembly, fileName }) => {
  const codeRef = useRef<HTMLPreElement>(null);

  const handleCopyToClipboard = async () => {
    if (codeRef.current) {
      try {
        await navigator.clipboard.writeText(codeRef.current.innerText);
        toast.success('Copied to clipboard');
      } catch (err) {
        toast.error('Failed to copy text');
        console.error('Failed to copy text:', err);
      }
    }
  };

  const handleDownload = () => {
    if (disassembly.length === 0) return;

    // Use the same formatting as in the formatDisassembly function
    // to ensure consistent output between display and download
    const text = disassembly
      .map(({ address, instruction }) => {
        const addressStr = formatHex(address, 4);
        const bytesStr = instruction.bytes.map(b => formatHex(b, 2)).join(' ');
        const instructionStr = `${instruction.mnemonic} ${instruction.operands}`.trim();
        const commentStr = instruction.comment ? `; ${instruction.comment}` : '';
        return `${addressStr}  ${bytesStr.padEnd(12)}  ${instructionStr.padEnd(20)} ${commentStr}`;
      })
      .join('\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName.replace(/\.bin$/i, '') + '.asm';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('File downloaded', {
      description: `Saved as ${fileName.replace(/\.bin$/i, '')}.asm`
    });
  };

  if (disassembly.length === 0) {
    return null;
  }

  // Find all label addresses for display
  const labelMap = new Map<number, string>();
  disassembly.forEach(({ instruction }) => {
    if (instruction.targetAddress !== undefined) {
      // Check if target is within our disassembly
      const targetInRange = disassembly.some(item => item.address === instruction.targetAddress);
      if (targetInRange) {
        labelMap.set(instruction.targetAddress!, `L_${formatHex(instruction.targetAddress!, 4)}`);
      }
    }
  });

  return (
    <div className="space-y-4 w-full animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">Disassembled Code</h2>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2" 
            onClick={handleCopyToClipboard}
          >
            <Copy className="h-4 w-4" />
            <span>Copy</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2" 
            onClick={handleDownload}
          >
            <Download className="h-4 w-4" />
            <span>Save as .asm</span>
          </Button>
        </div>
      </div>

      <Card className="w-full overflow-hidden border">
        <div className="overflow-x-auto code-block">
          <pre ref={codeRef} className="text-sm">
            {disassembly.map(({ address, instruction }, index) => {
              const label = labelMap.get(address);
              return (
                <React.Fragment key={index}>
                  {label && (
                    <div className="code-label">
                      <span>{label}:</span>
                    </div>
                  )}
                  <div className="code-line">
                    <span className="code-address">{formatHex(address, 4)}:</span>
                    <span className="code-bytes">
                      {instruction.bytes.map(b => formatHex(b, 2)).join(' ')}
                    </span>
                    <span className="code-instruction">
                      <span className="code-mnemonic">{instruction.mnemonic}</span>
                      {instruction.operands && <span>&nbsp;</span>}
                      <span className="code-operand">{instruction.operands}</span>
                    </span>
                    {instruction.comment && (
                      <span className="code-comment">{instruction.comment}</span>
                    )}
                  </div>
                </React.Fragment>
              );
            })}
          </pre>
        </div>
      </Card>
    </div>
  );
};

export default AssemblyCodeViewer;
