import { OpcodeHandler } from '../types';
import { formatByteValue, formatWordValue } from '../formatters';
import INTEL_COMMON_OPCODES from './intel-common-opcodes';

/**
 * Intel 8080 Opcodes
 * Based on the official Intel 8080 instruction set
 * Reference: https://pastraiser.com/cpu/i8080/i8080_opcodes.html
 */

export const INTEL_8080_OPCODES: Record<number, OpcodeHandler> = {
  // Import all common Intel 8080/8085 opcodes
  ...INTEL_COMMON_OPCODES,
  
  // 8080-specific opcodes (these are mostly NOPs for opcodes that are used by 8085)
  0x08: () => ({ mnemonic: 'NOP', operands: '', bytes: [0x08], size: 1, comment: 'No operation (not used in 8080)', supportsIntel8080: true, supportsIntel8085: false }),
  0x10: () => ({ mnemonic: 'NOP', operands: '', bytes: [0x10], size: 1, comment: 'No operation (not used in 8080)', supportsIntel8080: true, supportsIntel8085: false }),
  0x18: () => ({ mnemonic: 'NOP', operands: '', bytes: [0x18], size: 1, comment: 'No operation (not used in 8080)', supportsIntel8080: true, supportsIntel8085: false }),
  0x20: () => ({ mnemonic: 'NOP', operands: '', bytes: [0x20], size: 1, comment: 'No operation (not used in 8080)', supportsIntel8080: true, supportsIntel8085: false }),
  0x28: () => ({ mnemonic: 'NOP', operands: '', bytes: [0x28], size: 1, comment: 'No operation (not used in 8080)', supportsIntel8080: true, supportsIntel8085: false }),
  0x30: () => ({ mnemonic: 'NOP', operands: '', bytes: [0x30], size: 1, comment: 'No operation (not used in 8080)', supportsIntel8080: true, supportsIntel8085: false }),
  0x38: () => ({ mnemonic: 'NOP', operands: '', bytes: [0x38], size: 1, comment: 'No operation (not used in 8080)', supportsIntel8080: true, supportsIntel8085: false }),
  0xD9: () => ({ mnemonic: 'NOP', operands: '', bytes: [0xD9], size: 1, comment: 'No operation (not used in 8080)', supportsIntel8080: true, supportsIntel8085: false }),
  
  // Undefined opcodes in 8080 that are used by Z80
  0xCB: () => ({ mnemonic: 'NOP', operands: '', bytes: [0xCB], size: 1, comment: 'No operation (not used in 8080)', supportsIntel8080: true, supportsIntel8085: false }),
  0xDD: () => ({ mnemonic: 'NOP', operands: '', bytes: [0xDD], size: 1, comment: 'No operation (not used in 8080)', supportsIntel8080: true, supportsIntel8085: false }),
  0xED: () => ({ mnemonic: 'NOP', operands: '', bytes: [0xED], size: 1, comment: 'No operation (not used in 8080)', supportsIntel8080: true, supportsIntel8085: false }),
  0xFD: () => ({ mnemonic: 'NOP', operands: '', bytes: [0xFD], size: 1, comment: 'No operation (not used in 8080)', supportsIntel8080: true, supportsIntel8085: false })
};

// Export the Intel 8080 specific opcodes
export default INTEL_8080_OPCODES;
