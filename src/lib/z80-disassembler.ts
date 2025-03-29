
// Z80 disassembler implementation
// This is a simplified version - a real implementation would be more comprehensive

import { Z80Instruction } from './z80/types';
import { formatHex, bytesToHexString } from './z80/formatters';
import { 
  findLabelAddresses, 
  createLabelMap, 
  isAddressInRange 
} from './z80/label-utils';
import { Z80_OPCODES, Z80_ONLY_OPCODES, INTEL_8085_SPECIFIC_OPCODES } from './z80/opcodes';
import { translateToIntel, adjustOperandsForIntel } from './z80/mnemonic-translators';

// Disassemble a binary file
export const disassembleBinary = (
  binary: Uint8Array, 
  origin = 0, 
  targetInstructionSet = 'Z80'
): {
  address: number;
  instruction: Z80Instruction;
}[] => {
  const result: { address: number; instruction: Z80Instruction }[] = [];
  let index = 0;

  // First pass - basic disassembly
  while (index < binary.length) {
    const opcode = binary[index];
    const handler = Z80_OPCODES[opcode];
    
    if (handler) {
      const instruction = handler(binary, index);
      // Store the absolute address
      instruction.address = origin + index;
      // Adjust targetAddress if it exists to be absolute
      if (instruction.targetAddress !== undefined) {
        instruction.targetAddress = origin + instruction.targetAddress;
      }
      
      // Check if opcode is supported by the target instruction set
      const isSupported8080 = instruction.supportsIntel8080;
      const isSupported8085 = instruction.supportsIntel8085;
      
      // Add warning for Z80-only opcodes when targeting Intel processors
      if (!isSupported8080 && (targetInstructionSet === 'Intel 8080' || targetInstructionSet === 'Intel 8085')) {
        instruction.comment = instruction.comment 
          ? `${instruction.comment} - WARNING: Z80 ONLY` 
          : 'WARNING: Z80 ONLY';
      }
      
      // Add warning for 8085-specific opcodes when targeting non-8085 processors
      if (isSupported8085 && !isSupported8080 && targetInstructionSet !== 'Intel 8085') {
        instruction.comment = instruction.comment 
          ? `${instruction.comment} - WARNING: 8085 ONLY` 
          : 'WARNING: 8085 ONLY';
      }
      
      // Apply Intel mnemonics if not using Z80
      if (targetInstructionSet === 'Intel 8080' || targetInstructionSet === 'Intel 8085') {
        // Store the original Z80 mnemonic before translating
        instruction.mnemonicIntel = translateToIntel(instruction.mnemonic);
        
        const originalMnemonic = instruction.mnemonic;
        instruction.mnemonic = instruction.mnemonicIntel;
        instruction.operands = adjustOperandsForIntel(instruction.mnemonic, instruction.operands);
        
        // Add comment about original Z80 mnemonic if it was translated
        if (originalMnemonic !== instruction.mnemonic) {
          const originalInstruction = `${originalMnemonic} ${instruction.operands}`.trim();
          instruction.comment = instruction.comment 
            ? `${instruction.comment} (Z80: ${originalInstruction})` 
            : `Z80: ${originalInstruction}`;
        }
      }
      
      result.push({
        address: origin + index,
        instruction
      });
      index += instruction.size;
    } else {
      // Unknown or unsupported opcode, treat as data byte
      const dbMnemonic = targetInstructionSet === 'Z80' ? 'DB' : 'DB';
      const comment = 'Unknown opcode';
      
      result.push({
        address: origin + index,
        instruction: {
          mnemonic: dbMnemonic,
          operands: `${formatHex(opcode, 2)}h`,
          bytes: [opcode],
          size: 1,
          comment,
          address: origin + index,
          supportsIntel8080: false,
          supportsIntel8085: false
        }
      });
      index += 1;
    }
  }

  // Create label map
  const labelAddresses = findLabelAddresses(result);
  const labelMap = createLabelMap(labelAddresses);
  
  // Second pass - update operands for labels
  for (const item of result) {
    const { instruction } = item;
    
    // Only update operands for instructions that have targetAddress
    if (instruction.targetAddress !== undefined) {
      const targetAddress = instruction.targetAddress;
      const label = labelMap.get(targetAddress);
      
      // Check if this target has a label and it's within our disassembly range
      if (label && isAddressInRange(targetAddress, origin, origin + binary.length - 1)) {
        // Replace the hex address with the label in the operands
        const hexAddress = `${formatHex(targetAddress, 4)}h`;
        if (instruction.operands.includes(hexAddress)) {
          instruction.operands = instruction.operands.replace(hexAddress, label);
        }
      }
    }
  }
  
  return result;
};

// Re-export utility functions
export { formatHex, bytesToHexString } from './z80/formatters';
