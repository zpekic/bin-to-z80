
import { OpcodeHandler } from '../types';
import { LOGICAL_OPCODES } from './logical-opcodes';
import { IO_OPCODES } from './io-opcodes';

// Import other opcode groups from existing files
import { BASIC_OPCODES } from './basic-opcodes';
import { REGISTER_OPCODES } from './register-opcodes';
import { ARITHMETIC_OPCODES } from './arithmetic-opcodes';
import { CONTROL_FLOW_OPCODES } from './control-flow-opcodes';

// Import Intel opcode placeholders
import INTEL_8080_OPCODES from './intel8080-opcodes';
import INTEL_8085_OPCODES from './intel8085-opcodes';

// Import Z80 unprefixed opcodes (complete set from the image)
import { Z80_NOPREFIX_OPCODES } from './z80-noprefix-opcodes';

// Combine all Z80 opcodes - Use the complete Z80_NOPREFIX_OPCODES as the base
export const Z80_OPCODES: Record<number, OpcodeHandler> = {
  ...Z80_NOPREFIX_OPCODES,
  // Add any additional opcodes not covered in the no-prefix set
  ...LOGICAL_OPCODES,
  ...IO_OPCODES
};

// Populate Intel 8080 opcodes
Object.entries(Z80_OPCODES).forEach(([opcode, handler]) => {
  try {
    const numOpcode = parseInt(opcode);
    if (isNaN(numOpcode)) return;
    
    // Create a safe byte array for testing
    const testBytes = new Uint8Array([numOpcode]);
    const result = handler(testBytes, 0);
    
    // Add only opcodes that are supported by Intel 8080
    if (result && result.supportsIntel8080) {
      INTEL_8080_OPCODES[numOpcode] = handler;
    }
  } catch (error) {
    console.error(`Error processing opcode ${opcode}:`, error);
  }
});

// Populate Intel 8085 opcodes
Object.entries(Z80_OPCODES).forEach(([opcode, handler]) => {
  try {
    const numOpcode = parseInt(opcode);
    if (isNaN(numOpcode)) return;
    
    // Create a safe byte array for testing
    const testBytes = new Uint8Array([numOpcode]);
    const result = handler(testBytes, 0);
    
    // Add opcodes that are supported by Intel 8085
    if (result && result.supportsIntel8085) {
      INTEL_8085_OPCODES[numOpcode] = handler;
    }
  } catch (error) {
    console.error(`Error processing opcode ${opcode}:`, error);
  }
});

// Add 8085-specific opcodes (RIM, SIM, etc.)
INTEL_8085_OPCODES[0x20] = (bytes, i) => ({
  mnemonic: 'RIM',
  operands: '',
  bytes: [0x20],
  size: 1,
  comment: 'Read Interrupt Mask',
  supportsIntel8080: false,
  supportsIntel8085: true
});

INTEL_8085_OPCODES[0x30] = (bytes, i) => ({
  mnemonic: 'SIM',
  operands: '',
  bytes: [0x30],
  size: 1,
  comment: 'Set Interrupt Mask',
  supportsIntel8080: false,
  supportsIntel8085: true
});

// Export Intel opcodes
export { INTEL_8080_OPCODES, INTEL_8085_OPCODES };
