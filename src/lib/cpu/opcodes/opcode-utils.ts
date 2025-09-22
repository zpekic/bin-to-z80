import { Z80Instruction } from '../types';
import { format16BitHex } from '../formatters';
import { ADDRESS_LIMITS } from '../constants';

/**
 * Calculate relative jump target address
 */
export const calculateRelativeJumpTarget = (currentAddress: number, offset: number): number => {
  // Offset is a signed 8-bit value (-128 to 127)
  const signedOffset = offset > 127 ? offset - 256 : offset;
  // Calculate target address (PC + 2 + offset)
  return (currentAddress + 2 + signedOffset) & ADDRESS_LIMITS.MAX;
};

/**
 * Create a conditional jump instruction
 */
export const createConditionalJump = (
  opcode: number,
  condition: string,
  bytes: number[],
  comment?: string,
  isRelative = false
): Z80Instruction => {
  const targetAddress = isRelative 
    ? bytes[1] // Will be calculated later with actual address
    : bytes[1] + (bytes[2] << 8);
    
  return {
    mnemonic: isRelative ? 'JR' : 'JP',
    operands: `${condition}, ${format16BitHex(targetAddress)}`,
    bytes,
    size: bytes.length,
    targetAddress,
    comment,
    supportsIntel8080: !isRelative,
    supportsIntel8085: !isRelative
  };
};

/**
 * Create an unconditional jump instruction
 */
export const createUnconditionalJump = (
  opcode: number,
  operands: string,
  bytes: number[],
  targetAddress?: number,
  comment?: string,
  isRelative = false
): Z80Instruction => {
  return {
    mnemonic: isRelative ? 'JR' : 'JP',
    operands,
    bytes,
    size: bytes.length,
    targetAddress,
    comment,
    supportsIntel8080: !isRelative,
    supportsIntel8085: !isRelative
  };
};

/**
 * Create a relative jump instruction with address calculation
 */
export const createRelativeJump = (
  condition: string | null,
  bytes: number[],
  currentAddress: number,
  comment?: string
): Z80Instruction => {
  const offset = bytes[1];
  const targetAddress = calculateRelativeJumpTarget(currentAddress, offset);
  
  const operands = condition 
    ? `${condition}, ${format16BitHex(targetAddress)}`
    : format16BitHex(targetAddress);
    
  return {
    mnemonic: 'JR',
    operands,
    bytes,
    size: 2,
    targetAddress,
    comment,
    supportsIntel8080: false,
    supportsIntel8085: false
  };
};