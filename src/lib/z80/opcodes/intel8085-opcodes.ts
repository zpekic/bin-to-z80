
import { OpcodeHandler } from '../types';
import { formatByteValue, formatWordValue } from '../formatters';
import INTEL_COMMON_OPCODES from './intel-common-opcodes';

/**
 * Intel 8085 Opcodes
 * Based on the official Intel 8085 instruction set
 * Reference: https://pastraiser.com/cpu/i8085/i8085_opcodes.html
 */

export const INTEL_8085_OPCODES: Record<number, OpcodeHandler> = {
  // Import all common Intel 8080/8085 opcodes
  ...INTEL_COMMON_OPCODES,
  
  // Add 8085-specific opcodes that aren't in the common set
  // 0x20 - RIM (Read Interrupt Mask)
  0x20: () => ({ mnemonic: 'RIM', operands: '', bytes: [0x20], size: 1, comment: 'Read Interrupt Mask (8085 only)', supportsIntel8080: false, supportsIntel8085: true }),
  
  // 0x30 - SIM (Set Interrupt Mask)
  0x30: () => ({ mnemonic: 'SIM', operands: '', bytes: [0x30], size: 1, comment: 'Set Interrupt Mask (8085 only)', supportsIntel8080: false, supportsIntel8085: true }),
  
  // Undocumented 8085-only instructions
  0x08: () => ({ mnemonic: 'DSUB', operands: '', bytes: [0x08], size: 1, comment: 'Double subtract (BC from HL) (undocumented)', supportsIntel8080: false, supportsIntel8085: true }),
  0x10: () => ({ mnemonic: 'ARHL', operands: '', bytes: [0x10], size: 1, comment: 'Arithmetic shift right HL (undocumented)', supportsIntel8080: false, supportsIntel8085: true }),
  0x18: () => ({ mnemonic: 'RDEL', operands: '', bytes: [0x18], size: 1, comment: 'Rotate DE left through carry (undocumented)', supportsIntel8080: false, supportsIntel8085: true }),
  0x28: () => ({ mnemonic: 'NOP', operands: '', bytes: [0x28], size: 1, comment: 'No operation (undocumented)', supportsIntel8080: false, supportsIntel8085: true }),
  0x38: () => ({ mnemonic: 'NOP', operands: '', bytes: [0x38], size: 1, comment: 'No operation (undocumented)', supportsIntel8080: false, supportsIntel8085: true }),
  0xD9: () => ({ mnemonic: 'SHLX', operands: '', bytes: [0xD9], size: 1, comment: 'Store H and L indirect (undocumented)', supportsIntel8080: false, supportsIntel8085: true }),
};

export default INTEL_8085_OPCODES;
