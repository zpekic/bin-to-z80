
import { OpcodeHandler } from '../types';
import { Z80_OPCODES } from './index';

// Filter Z80 opcodes to only include those supported by Intel 8085
// and add 8085-specific opcodes
const INTEL_8085_OPCODES: Record<number, OpcodeHandler> = {};

// We'll populate this in the next step to avoid circular dependencies
// Export will be handled by index.ts

// Add 8085-specific opcodes
const INTEL_8085_SPECIFIC: Record<number, OpcodeHandler> = {
  // RIM - Read Interrupt Mask
  0x20: (bytes, i) => ({
    mnemonic: 'RIM',
    operands: '',
    bytes: [0x20],
    size: 1,
    comment: 'Read Interrupt Mask',
    supportsIntel8080: false,
    supportsIntel8085: true
  }),

  // SIM - Set Interrupt Mask
  0x30: (bytes, i) => ({
    mnemonic: 'SIM',
    operands: '',
    bytes: [0x30],
    size: 1,
    comment: 'Set Interrupt Mask',
    supportsIntel8080: false,
    supportsIntel8085: true
  }),
};

// Export will be handled by index.ts
export default INTEL_8085_OPCODES;
