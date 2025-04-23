
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
  supportsIntel8080?: boolean; // Whether this opcode is supported on Intel 8080
  supportsIntel8085?: boolean; // Whether this opcode is supported on Intel 8085
};

export type OpcodeHandler = (bytes: Uint8Array, index: number, address?: number) => Z80Instruction;
