import { useState, useCallback } from 'react';

export interface DisassemblySettings {
  originAddress: number;
  outputFormat: string;
  targetInstructionSet: string;
}

const DEFAULT_SETTINGS: DisassemblySettings = {
  originAddress: 0x0000,
  outputFormat: 'list',
  targetInstructionSet: 'Z80'
};

export const useDisassemblySettings = (initialSettings?: Partial<DisassemblySettings>) => {
  const [settings, setSettings] = useState<DisassemblySettings>({
    ...DEFAULT_SETTINGS,
    ...initialSettings
  });

  const updateSetting = useCallback(<K extends keyof DisassemblySettings>(
    key: K, 
    value: DisassemblySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return {
    settings,
    updateSetting,
    resetSettings
  };
};