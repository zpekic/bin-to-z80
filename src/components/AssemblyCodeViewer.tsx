
import React, { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Download } from 'lucide-react';
import { toast } from 'sonner';
import { formatHex } from '@/lib/cpu/formatters';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HexViewer from '@/components/HexViewer';
import { findLabelAddresses, createLabelMap } from '@/lib/cpu/label-utils';

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
    labelInfo?: {
      label: string;
      referencedFrom: number[];
    };
  }[];
  fileName: string;
  outputFormat?: string;
  fileData: Uint8Array;
  originAddress?: number;
}

const AssemblyCodeViewer: React.FC<AssemblyCodeViewerProps> = ({ 
  disassembly, 
  fileName, 
  outputFormat = 'list',
  fileData,
  originAddress = 0
}) => {
  const codeRef = useRef<HTMLPreElement>(null);
  const [labelMap, setLabelMap] = useState<Map<number, {
    label: string;
    referencedFrom: number[];
  }>>(new Map());

  // No need to recreate the label map since it's already included in the disassembly
  useEffect(() => {
    // Extract label map from disassembly for rendering
    const newLabelMap = new Map<number, {
      label: string;
      referencedFrom: number[];
    }>();
    
    disassembly.forEach(item => {
      if (item.labelInfo) {
        newLabelMap.set(item.address, item.labelInfo);
      }
    });
    
    setLabelMap(newLabelMap);
  }, [disassembly]);

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

    const fileExtension = outputFormat === 'assembly' ? '.asm' : '.lst';
    
    // Format the output based on the selected format
    let text;
    if (outputFormat === 'assembly') {
      text = disassembly
        .map(({ address, instruction, labelInfo }) => {
          let line = '';
          
          if (labelInfo) {
            const references = labelInfo.referencedFrom.map(ref => formatHex(ref, 4)).join(', ');
            line += `${labelInfo.label}: ; Referenced from: ${references}\n`;
          }
          
          line += `        ${instruction.mnemonic} ${instruction.operands}`.trim();
          if (instruction.comment) {
            line += ` ; ${instruction.comment}`;
          }
          
          return line;
        })
        .join('\n');
    } else {
      // List format with address and bytes
      text = disassembly
        .map(({ address, instruction, labelInfo }) => {
          let result = '';
          
          if (labelInfo) {
            const references = labelInfo.referencedFrom.map(ref => formatHex(ref, 4)).join(', ');
            result += `${labelInfo.label}: ; Referenced from: ${references}\n`;
          }
          
          const addressStr = formatHex(address, 4);
          const bytesStr = instruction.bytes.map(b => formatHex(b, 2)).join(' ');
          const instructionStr = `${instruction.mnemonic} ${instruction.operands}`.trim();
          const commentStr = instruction.comment ? `; ${instruction.comment}` : '';
          result += `${addressStr}  ${bytesStr.padEnd(12)}  ${instructionStr.padEnd(20)} ${commentStr}`;
          
          return result;
        })
        .join('\n');
    }

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName.replace(/\.bin$/i, '') + fileExtension;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('File downloaded', {
      description: `Saved as ${fileName.replace(/\.bin$/i, '')}${fileExtension}`
    });
  };

  if (disassembly.length === 0) {
    return null;
  }

  // Render the disassembly based on the selected format
  const renderDisassembly = () => {
    if (outputFormat === 'assembly') {
      return disassembly.map(({ address, instruction, labelInfo }, index) => {
        return (
          <React.Fragment key={index}>
            {labelInfo && (
              <div className="code-label">
                <span>{labelInfo.label}:</span>
                <span className="text-gray-500 ml-2">
                  {/* Add references as a comment */}
                  {labelInfo.referencedFrom.length > 0 && 
                    `; Referenced from: ${labelInfo.referencedFrom.map(ref => formatHex(ref, 4)).join(', ')}`
                  }
                </span>
              </div>
            )}
            <div className="code-line">
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
      });
    } else {
      // List format
      return disassembly.map(({ address, instruction, labelInfo }, index) => {
        return (
          <React.Fragment key={index}>
            {labelInfo && (
              <div className="code-label">
                <span>{labelInfo.label}:</span>
                <span className="text-gray-500 ml-2">
                  {/* Add references as a comment */}
                  {labelInfo.referencedFrom.length > 0 && 
                    `; Referenced from: ${labelInfo.referencedFrom.map(ref => formatHex(ref, 4)).join(', ')}`
                  }
                </span>
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
      });
    }
  };

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
            <span>Save as {outputFormat === 'assembly' ? '.asm' : '.lst'}</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="disassembly" className="w-full">
        <TabsList className="mb-2">
          <TabsTrigger value="disassembly">Disassembly</TabsTrigger>
          <TabsTrigger value="hex">Hex View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="disassembly">
          <Card className="w-full overflow-hidden border">
            <div className="overflow-x-auto code-block">
              <pre ref={codeRef} className="text-sm">
                {renderDisassembly()}
              </pre>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="hex">
          <HexViewer 
            data={fileData} 
            originAddress={originAddress}
            fileName={fileName}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssemblyCodeViewer;
