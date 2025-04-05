
import { OpcodeHandler } from '../types';
import INTEL_COMMON_OPCODES from '../../cpu/opcodes/intel-common-opcodes';

// Start with common Intel opcodes
const INTEL_8085_OPCODES: Record<number, OpcodeHandler> = {
  ...INTEL_COMMON_OPCODES
};

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

// Add 8085-specific opcodes
Object.assign(INTEL_8085_OPCODES, INTEL_8085_SPECIFIC);

export default INTEL_8085_OPCODES;
