import { Z80Instruction } from '../types';
import { formatHex } from '../formatters';
import { 
  findLabelAddresses, 
  createLabelMap, 
  isAddressInRange 
} from '../label-utils';
import { Z80_OPCODES, INTEL_8080_OPCODES, INTEL_8085_OPCODES } from '../opcodes';
import { processInstruction } from './instruction-processor';
import { ED_PREFIX_OPCODES } from '../opcodes/z80-extended/ed-prefix';

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
  labelInfo?: {
    label: string;
    referencedFrom: number[];
  }
}[] => {
  const result: { address: number; instruction: Z80Instruction }[] = [];
  let index = 0;

  // Select the appropriate opcode set based on the target instruction set
  let opcodes;
  if (targetInstructionSet === 'Intel 8080') {
    opcodes = INTEL_8080_OPCODES;
  } else if (targetInstructionSet === 'Intel 8085') {
    opcodes = INTEL_8085_OPCODES;
  } else {
    opcodes = Z80_OPCODES;
  }

  while (index < binary.length) {
    const opcode = binary[index];
    
    // Special handling for Z80 prefixed opcodes (CB, DD, ED, FD)
    if (targetInstructionSet === 'Z80' && opcode === 0xED) {
      // Handle ED prefix opcodes
      const secondByte = binary[index + 1];
      const edHandler = ED_PREFIX_OPCODES[secondByte];
      
      if (edHandler) {
        const instruction = edHandler(binary, index + 1);
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
        // Unknown ED prefix opcode
        result.push({
          address: origin + index,
          instruction: {
            mnemonic: 'DB',
            operands: `EDh,${formatHex(secondByte, 2)}h`,
            bytes: [0xED, secondByte],
            size: 2,
            comment: 'Unknown ED prefix opcode',
            supportsIntel8080: false,
            supportsIntel8085: false
          }
        });
        index += 2;
      }
      continue;
    }
    
    // Special handling for Z80 prefixed opcodes (CB, DD, ED, FD)
    if (targetInstructionSet === 'Z80' && (opcode === 0xCB || opcode === 0xDD || opcode === 0xED || opcode === 0xFD)) {
      // Basic handling of prefixed opcodes
      const prefixType = opcode === 0xCB ? 'CB' : 
                        opcode === 0xDD ? 'IX' : 
                        opcode === 0xED ? 'ED' : 'IY';
      
      // For now, we'll treat prefixed opcodes as data bytes until we implement them fully
      const comment = `${prefixType} prefix - Z80 extended instruction`;
      
      result.push({
        address: origin + index,
        instruction: {
          mnemonic: prefixType,
          operands: 'PREFIX',
          bytes: [opcode],
          size: 1,
          comment,
          address: origin + index,
          supportsIntel8080: false,
          supportsIntel8085: false
        }
      });
      index += 1;
      continue;
    }
    
    const handler = opcodes[opcode];
    
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

  // Create label map with information about which targets come from jumps or calls
  const labelAddressesMap = findLabelAddresses(result);
  const labelMap = createLabelMap(labelAddressesMap);
  
  // Second pass - update operands for labels and add label info
  const enhancedResult = result.map(item => {
    const { address, instruction } = item;
    
    // Check if this address is a label target
    const labelInfo = labelMap.get(address);
    
    // Only update operands for instructions that have targetAddress
    if (instruction.targetAddress !== undefined) {
      const targetAddress = instruction.targetAddress;
      const targetLabelInfo = labelMap.get(targetAddress);
      
      // Check if this target has a label and it's within our disassembly range
      if (targetLabelInfo && isAddressInRange(targetAddress, origin, origin + binary.length - 1)) {
        // Replace the hex address with the label in the operands
        const hexAddress = `${formatHex(targetAddress, 4)}h`;
        if (instruction.operands.includes(hexAddress)) {
          instruction.operands = instruction.operands.replace(hexAddress, targetLabelInfo.label);
        }
      }
    }
    
    // Return the item with label info if it's a label target
    return labelInfo 
      ? { address, instruction, labelInfo }
      : { address, instruction };
  });
  
  return enhancedResult;
};
