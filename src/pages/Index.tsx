
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FileUpload from '@/components/FileUpload';
import AssemblyCodeViewer from '@/components/AssemblyCodeViewer';
import Settings from '@/components/Settings';
import { disassembleBinary } from '@/lib/z80-disassembler';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const Index = () => {
  const [fileData, setFileData] = useState<Uint8Array | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [originAddress, setOriginAddress] = useState<number>(0x0000);
  const [outputFormat, setOutputFormat] = useState<string>('list');
  const [targetInstructionSet, setTargetInstructionSet] = useState<string>('Z80');
  const [disassembly, setDisassembly] = useState<ReturnType<typeof disassembleBinary>>([]);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const handleFileLoaded = (data: Uint8Array, name: string) => {
    setIsLoading(true);
    setFileData(data);
    setFileName(name);
    
    // Use setTimeout to ensure the UI doesn't freeze
    setTimeout(() => {
      try {
        const result = disassembleBinary(data, originAddress);
        setDisassembly(result);
      } catch (error) {
        console.error('Disassembly error:', error);
      } finally {
        setIsLoading(false);
      }
    }, 100);
  };

  // Update disassembly when origin address or target instruction set changes
  React.useEffect(() => {
    if (fileData) {
      try {
        // In a full implementation, targetInstructionSet would be passed to disassembleBinary
        // For now, we're just storing the state but not using it in the disassembler yet
        const result = disassembleBinary(fileData, originAddress);
        setDisassembly(result);
      } catch (error) {
        console.error('Disassembly error:', error);
      }
    }
  }, [fileData, originAddress, targetInstructionSet]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container px-4 py-8 mx-auto max-w-6xl space-y-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 animate-slide-down">
          <h1 className="text-4xl font-bold tracking-tight">BIN to Z80 Disassembler</h1>
          <p className="text-lg text-muted-foreground">
            Convert binary files to Z80 assembly code with a modern, elegant interface
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <FileUpload onFileLoaded={handleFileLoaded} isLoading={isLoading} />
            
            {disassembly.length > 0 && (
              <div className="mt-6">
                <AssemblyCodeViewer 
                  disassembly={disassembly} 
                  fileName={fileName} 
                  outputFormat={outputFormat}
                />
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <Settings 
              originAddress={originAddress} 
              setOriginAddress={setOriginAddress}
              outputFormat={outputFormat}
              setOutputFormat={setOutputFormat}
              targetInstructionSet={targetInstructionSet}
              setTargetInstructionSet={setTargetInstructionSet}
            />
            
            <Card>
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <div>
                  <CardTitle>About</CardTitle>
                  <CardDescription>Z80 Disassembler Tool</CardDescription>
                </div>
                <Button
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowInfo(!showInfo)}
                >
                  {showInfo ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CardHeader>
              
              {showInfo && (
                <CardContent className="text-sm space-y-4 animate-slide-down">
                  <p>
                    This tool converts binary (.bin) files into Z80 assembly code. It's designed
                    for use with Z80-based systems like the ZX Spectrum, Amstrad CPC, MSX, and others.
                  </p>
                  <p>
                    The disassembler uses a simplified instruction set for demonstration purposes.
                    A production version would support the complete Z80 instruction set.
                  </p>
                  <div className="pt-2">
                    <h4 className="font-medium mb-2">How to use:</h4>
                    <ol className="list-decimal ml-4 space-y-1">
                      <li>Upload a binary file (.bin)</li>
                      <li>Adjust the origin address if needed</li>
                      <li>Select your target instruction set (Z80, Intel 8080, or Intel 8085)</li>
                      <li>View the disassembled code</li>
                      <li>Copy to clipboard or save as .asm file</li>
                    </ol>
                  </div>
                </CardContent>
              )}
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>File Info</CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Information about the current binary file</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent>
                {fileData ? (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Filename:</span>
                      <span className="font-medium">{fileName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size:</span>
                      <span className="font-medium">{fileData.length} bytes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Instructions:</span>
                      <span className="font-medium">{disassembly.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Instruction Set:</span>
                      <span className="font-medium">{targetInstructionSet}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No file loaded</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
