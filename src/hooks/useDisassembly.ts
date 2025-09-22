import { useState, useCallback } from 'react';
import { disassembleBinary } from '@/lib/cpu/disassembler';

export const useDisassembly = () => {
  const [fileData, setFileData] = useState<Uint8Array | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disassembly, setDisassembly] = useState<ReturnType<typeof disassembleBinary>>([]);
  const [error, setError] = useState<string | null>(null);

  const performDisassembly = useCallback((
    data: Uint8Array, 
    originAddress: number, 
    targetInstructionSet: string
  ) => {
    try {
      setError(null);
      const result = disassembleBinary(data, originAddress, targetInstructionSet);
      setDisassembly(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Disassembly failed';
      setError(errorMessage);
      console.error('Disassembly error:', err);
    }
  }, []);

  const handleFileLoaded = useCallback((
    data: Uint8Array, 
    name: string, 
    originAddress: number, 
    targetInstructionSet: string
  ) => {
    setIsLoading(true);
    setFileData(data);
    setFileName(name);
    
    // Use setTimeout to prevent UI freezing
    setTimeout(() => {
      performDisassembly(data, originAddress, targetInstructionSet);
      setIsLoading(false);
    }, 100);
  }, [performDisassembly]);

  return {
    fileData,
    fileName,
    isLoading,
    disassembly,
    error,
    handleFileLoaded,
    performDisassembly
  };
};