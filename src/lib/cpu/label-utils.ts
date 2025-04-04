
import { Z80Instruction } from './types';
import { formatHex } from './formatters';

// Generate a label for an address based on instruction type
export const generateLabel = (address: number, isJumpTarget: boolean = false, isSubroutine: boolean = false): string => {
  let prefix = 'L'; // Default prefix
  if (isJumpTarget) {
    prefix = 'J';
  } else if (isSubroutine) {
    prefix = 'S';
  }
  return `${prefix}_${formatHex(address, 4)}`;
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

// Determine if an instruction is a call instruction
export const isCallInstruction = (instruction: Z80Instruction): boolean => {
  // Check mnemonic for call-related instructions
  return instruction.mnemonic === 'CALL';
};

// Find all jump and call destinations in the code
export const findLabelAddresses = (disassembly: {
  address: number;
  instruction: Z80Instruction;
}[]): Map<number, { isJumpTarget: boolean, isSubroutine: boolean }> => {
  const labelAddresses = new Map<number, { isJumpTarget: boolean, isSubroutine: boolean }>();
  
  for (const { instruction } of disassembly) {
    if (instruction.targetAddress !== undefined) {
      // Determine the type of reference
      const isJump = isJumpInstruction(instruction);
      const isCall = isCallInstruction(instruction);
      
      if (labelAddresses.has(instruction.targetAddress)) {
        // Update existing entry if needed
        const current = labelAddresses.get(instruction.targetAddress)!;
        
        // Priority: Jump > Call > Other
        if (isJump) {
          current.isJumpTarget = true;
        } else if (isCall && !current.isJumpTarget) {
          current.isSubroutine = true;
        }
        
        labelAddresses.set(instruction.targetAddress, current);
      } else {
        // Create new entry
        labelAddresses.set(instruction.targetAddress, {
          isJumpTarget: isJump,
          isSubroutine: isCall && !isJump
        });
      }
    }
  }
  
  return labelAddresses;
};

// Create a mapping of addresses to labels
export const createLabelMap = (labelAddresses: Map<number, { isJumpTarget: boolean, isSubroutine: boolean }>): Map<number, string> => {
  const labelMap = new Map<number, string>();
  
  labelAddresses.forEach((info, address) => {
    labelMap.set(address, generateLabel(address, info.isJumpTarget, info.isSubroutine));
  });
  
  return labelMap;
};
