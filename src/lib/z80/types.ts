
// Define instruction types
export type Z80Instruction = {
  mnemonic: string;
  operands: string;
  bytes: number[];
  size: number;
  comment?: string;
  address?: number;
  targetAddress?: number;
  isIOOperation?: boolean;
  mnemonicIntel?: string; // Added field to store Intel-specific mnemonic
};

export type OpcodeHandler = (bytes: Uint8Array, index: number) => Z80Instruction;
