
import { Z80Instruction } from './types';
import { formatHex } from './formatters';

// Generate a label for an address based on instruction type
export const generateLabel = (address: number, isJumpTarget: boolean = false): string => {
  return `${isJumpTarget ? 'J' : 'L'}_${formatHex(address, 4)}`;
};

// Check if an address is within a given range
export const isAddressInRange = (address: number, start: number, end: number): boolean => {
  return address >= start && address <= end;
};

// Determine if an instruction is a jump instruction
export const isJumpInstruction = (instruction: Z80Instruction): boolean => {
  // Check mnemonic for jump-related instructions
  return instruction.mnemonic === 'JP' || 
         instruction.mnemonic === 'JR' || 
         instruction.mnemonic === 'DJNZ';
};

// Find all jump and call destinations in the code
export const findLabelAddresses = (disassembly: {
  address: number;
  instruction: Z80Instruction;
}[]): Map<number, boolean> => {
  const labelAddresses = new Map<number, boolean>(); // Map address to isJumpTarget
  
  for (const { instruction } of disassembly) {
    if (instruction.targetAddress !== undefined) {
      // Mark as jump target if it's a jump instruction
      const isJump = isJumpInstruction(instruction);
      // If address is already in map but not marked as jump target,
      // and current instruction is a jump, update it
      if (labelAddresses.has(instruction.targetAddress) && isJump) {
        labelAddresses.set(instruction.targetAddress, true);
      } else if (!labelAddresses.has(instruction.targetAddress)) {
        labelAddresses.set(instruction.targetAddress, isJump);
      }
    }
  }
  
  return labelAddresses;
};

// Create a mapping of addresses to labels
export const createLabelMap = (labelAddresses: Map<number, boolean>): Map<number, string> => {
  const labelMap = new Map<number, string>();
  
  labelAddresses.forEach((isJumpTarget, address) => {
    labelMap.set(address, generateLabel(address, isJumpTarget));
  });
  
  return labelMap;
};
