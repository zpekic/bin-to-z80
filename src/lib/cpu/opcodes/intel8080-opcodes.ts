
import { OpcodeHandler } from '../types';
import { formatWordValue, formatByteValue } from '../formatters';
import INTEL_COMMON_OPCODES from './intel-common-opcodes';

/**
 * Intel 8080 Opcodes
 * Based on the official Intel 8080 instruction set
 * Reference: https://pastraiser.com/cpu/i8080/i8080_opcodes.html
 * 
 * This file contains only 8080-specific opcodes.
 * Common opcodes shared with 8085 are imported from intel-common-opcodes.ts
 */

// Start with common opcodes
const INTEL_8080_OPCODES: Record<number, OpcodeHandler> = {
  ...INTEL_COMMON_OPCODES,
  
  // 8080-specific undocumented opcodes or variations
  0x08: () => ({ mnemonic: 'NOP', operands: '', bytes: [0x08], size: 1, comment: 'Undocumented NOP', supportsIntel8080: true, supportsIntel8085: true }),
  0x10: () => ({ mnemonic: 'NOP', operands: '', bytes: [0x10], size: 1, comment: 'Undocumented NOP', supportsIntel8080: true, supportsIntel8085: true }),
  0x18: () => ({ mnemonic: 'NOP', operands: '', bytes: [0x18], size: 1, comment: 'Undocumented NOP', supportsIntel8080: true, supportsIntel8085: true }),
  0x20: () => ({ mnemonic: 'NOP', operands: '', bytes: [0x20], size: 1, comment: 'Undocumented NOP', supportsIntel8080: true, supportsIntel8085: false }),
  0x28: () => ({ mnemonic: 'NOP', operands: '', bytes: [0x28], size: 1, comment: 'Undocumented NOP', supportsIntel8080: true, supportsIntel8085: true }),
  0x30: () => ({ mnemonic: 'NOP', operands: '', bytes: [0x30], size: 1, comment: 'Undocumented NOP', supportsIntel8080: true, supportsIntel8085: false }),
  0x38: () => ({ mnemonic: 'NOP', operands: '', bytes: [0x38], size: 1, comment: 'Undocumented NOP', supportsIntel8080: true, supportsIntel8085: true }),
  
  // Additional undocumented opcodes (not in common opcodes)
  0xCB: (bytes, i) => {
    const value = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'JMP', operands: formatWordValue(value), bytes: [0xCB, bytes[i+1], bytes[i+2]], size: 3, 
      comment: 'Undocumented JMP instruction',
      supportsIntel8080: true, supportsIntel8085: true, targetAddress: value
    };
  },
  0xD9: () => ({ mnemonic: 'RET', operands: '', bytes: [0xD9], size: 1, comment: 'Undocumented RET (same as 0xC9)', supportsIntel8080: true, supportsIntel8085: false }),
  0xDD: () => ({ mnemonic: 'NOP', operands: '', bytes: [0xDD], size: 1, comment: 'Undocumented NOP', supportsIntel8080: true, supportsIntel8085: true }),
  0xED: () => ({ mnemonic: 'NOP', operands: '', bytes: [0xED], size: 1, comment: 'Undocumented NOP', supportsIntel8080: true, supportsIntel8085: true }),
  0xFD: () => ({ mnemonic: 'NOP', operands: '', bytes: [0xFD], size: 1, comment: 'Undocumented NOP', supportsIntel8080: true, supportsIntel8085: true }),
};

export default INTEL_8080_OPCODES;
