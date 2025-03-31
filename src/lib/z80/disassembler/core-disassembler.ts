
import { Z80Instruction } from '../types';
import { formatHex } from '../formatters';
import { 
  findLabelAddresses, 
  createLabelMap, 
  isAddressInRange 
} from '../label-utils';
import { Z80_OPCODES } from '../opcodes';
import { processInstruction } from './instruction-processor';

/**
 * Disassemble a binary file into Z80 instructions
 * 
 * @param binary - The binary data to disassemble
 * @param origin - The starting address (default: 0)
 * @param targetInstructionSet - The target CPU ('Z80', 'Intel 8080', or 'Intel 8085')
 * @returns Array of address and instruction objects
 */
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
      // Get the basic instruction from the opcode handler
      const instruction = handler(binary, index);
      
      // Process the instruction with absolute addressing and target-specific adjustments
      const processedInstruction = processInstruction(
        instruction,
        index,
        origin,
        targetInstructionSet
      );
      
      result.push({
        address: origin + index,
        instruction: processedInstruction
      });
      
      index += instruction.size;
    } else {
      // Unknown or unsupported opcode, treat as data byte
      const dbMnemonic = targetInstructionSet === 'Z80' ? 'DB' : 'DB';
      const comment = 'Unknown opcode - NOT SUPPORTED';
      
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
