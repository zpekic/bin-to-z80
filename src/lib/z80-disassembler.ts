
// Z80 disassembler implementation
// This is a simplified version - a real implementation would be more comprehensive

import { Z80Instruction } from './z80/types';
import { formatHex, bytesToHexString } from './z80/formatters';
import { 
  findLabelAddresses, 
  createLabelMap, 
  isAddressInRange 
} from './z80/label-utils';
import { Z80_OPCODES } from './z80/opcodes';

// Disassemble a binary file
export const disassembleBinary = (binary: Uint8Array, origin = 0): {
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
      
      result.push({
        address: origin + index,
        instruction
      });
      index += instruction.size;
    } else {
      // Unknown opcode, treat as data byte
      result.push({
        address: origin + index,
        instruction: {
          mnemonic: 'DB',
          operands: `${formatHex(opcode, 2)}h`,
          bytes: [opcode],
          size: 1,
          comment: 'Unknown opcode',
          address: origin + index
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
