
import { Z80Instruction } from '../types';

/**
 * Process an instruction to:
 * 1. Set absolute addressing
 * 2. Handle compatibility warnings
 * 3. Apply target-specific mnemonics
 * 
 * @param instruction - The base instruction to process
 * @param index - The current index in the binary
 * @param origin - The starting address
 * @param targetInstructionSet - The target CPU
 * @returns Processed instruction
 */
export const processInstruction = (
  instruction: Z80Instruction, 
  index: number,
  origin: number,
  targetInstructionSet: string
): Z80Instruction => {
  // Make a copy of the instruction to avoid mutating the original
  const processedInstruction: Z80Instruction = { ...instruction };
  
  // Store the absolute address
  processedInstruction.address = origin + index;
  
  // Adjust targetAddress if it exists to be absolute
  if (processedInstruction.targetAddress !== undefined) {
    processedInstruction.targetAddress = origin + processedInstruction.targetAddress;
  }
  
  // Check if opcode is supported by the target instruction set
  const isSupported8080 = processedInstruction.supportsIntel8080;
  const isSupported8085 = processedInstruction.supportsIntel8085;
  
  // Add warning for Z80-only opcodes when targeting Intel processors
  if (!isSupported8080 && (targetInstructionSet === 'Intel 8080' || targetInstructionSet === 'Intel 8085')) {
    processedInstruction.comment = processedInstruction.comment 
      ? `${processedInstruction.comment} - WARNING: Z80 ONLY - NOT SUPPORTED` 
      : 'WARNING: Z80 ONLY - NOT SUPPORTED';
  }
  
  // Add warning for 8085-specific opcodes when targeting non-8085 processors
  if (isSupported8085 && !isSupported8080 && targetInstructionSet === 'Intel 8080') {
    processedInstruction.comment = processedInstruction.comment 
      ? `${processedInstruction.comment} - WARNING: 8085 ONLY - NOT SUPPORTED IN 8080` 
      : 'WARNING: 8085 ONLY - NOT SUPPORTED IN 8080';
  }
  
  return processedInstruction;
};
