
import { Z80Instruction } from './types';
import { formatHex } from './formatters';

// Generate a label for an address based on instruction type
export const generateLabel = (address: number, isJumpTarget: boolean = false, isSubroutine: boolean = false, isRelativeJump: boolean = false): string => {
  if (isRelativeJump) {
    // For relative jumps, use R_ prefix
    return `R_${formatHex(address, 4)}`;
  }
  
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

// Determine if an instruction is a relative jump instruction (JR, DJNZ)
export const isRelativeJumpInstruction = (instruction: Z80Instruction): boolean => {
  return instruction.mnemonic === 'JR' || instruction.mnemonic === 'DJNZ';
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
}[]): Map<number, { 
  isJumpTarget: boolean, 
  isSubroutine: boolean,
  isRelativeJump: boolean,
  referencedFrom: number[]
}> => {
  const labelAddresses = new Map<number, { 
    isJumpTarget: boolean, 
    isSubroutine: boolean,
    isRelativeJump: boolean,
    referencedFrom: number[]
  }>();
  
  for (const { address, instruction } of disassembly) {
    if (instruction.targetAddress !== undefined) {
      // Determine the type of reference
      const isJump = isJumpInstruction(instruction);
      const isCall = isCallInstruction(instruction);
      const isRelativeJump = isRelativeJumpInstruction(instruction);
      const targetAddress = instruction.targetAddress;
      
      if (labelAddresses.has(targetAddress)) {
        // Update existing entry if needed
        const current = labelAddresses.get(targetAddress)!;
        
        // Add the current instruction address to the references
        if (!current.referencedFrom.includes(address)) {
          current.referencedFrom.push(address);
        }
        
        // Priority: Relative Jump > Jump > Call > Other
        if (isRelativeJump) {
          current.isRelativeJump = true;
        } else if (isJump && !current.isRelativeJump) {
          current.isJumpTarget = true;
        } else if (isCall && !current.isJumpTarget && !current.isRelativeJump) {
          current.isSubroutine = true;
        }
        
        labelAddresses.set(targetAddress, current);
      } else {
        // Create new entry
        labelAddresses.set(targetAddress, {
          isJumpTarget: isJump && !isRelativeJump,
          isSubroutine: isCall && !isJump,
          isRelativeJump: isRelativeJump,
          referencedFrom: [address]
        });
      }
    }
  }
  
  return labelAddresses;
};

// Create a mapping of addresses to labels
export const createLabelMap = (
  labelAddresses: Map<number, { 
    isJumpTarget: boolean, 
    isSubroutine: boolean,
    isRelativeJump: boolean,
    referencedFrom: number[]
  }>
): Map<number, {
  label: string,
  referencedFrom: number[]
}> => {
  const labelMap = new Map<number, {
    label: string,
    referencedFrom: number[]
  }>();
  
  labelAddresses.forEach((info, address) => {
    labelMap.set(address, {
      label: generateLabel(address, info.isJumpTarget, info.isSubroutine, info.isRelativeJump),
      referencedFrom: info.referencedFrom
    });
  });
  
  return labelMap;
};
