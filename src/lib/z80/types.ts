
// Define instruction types
export type Z80Instruction = {
  mnemonic: string;
  operands: string;
  bytes: number[];
  size: number;
  comment?: string;
  address?: number;
  targetAddress?: number;
};

export type OpcodeHandler = (bytes: Uint8Array, index: number) => Z80Instruction;
