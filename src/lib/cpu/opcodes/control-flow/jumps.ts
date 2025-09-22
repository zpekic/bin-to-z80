
import { OpcodeHandler } from '../../types';
import { createConditionalJump, createRelativeJump, createUnconditionalJump } from '../opcode-utils';
import { format16BitHex } from '../../formatters';

// Jump opcodes using utility functions to reduce duplication
export const JUMP_OPCODES: Record<number, OpcodeHandler> = {
  // Unconditional jumps
  0xC3: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return createUnconditionalJump(
      0xC3, 
      format16BitHex(targetAddress),
      [0xC3, bytes[i+1], bytes[i+2]],
      targetAddress
    );
  },
  
  0xE9: () => createUnconditionalJump(0xE9, '(HL)', [0xE9]),
  
  // Z80 Relative jumps
  0x18: (bytes, i, address = 0) => createRelativeJump(
    null, 
    [0x18, bytes[i+1]], 
    address, 
    'Relative jump'
  ),
  
  // Z80 Conditional relative jumps
  0x20: (bytes, i, address = 0) => createRelativeJump('NZ', [0x20, bytes[i+1]], address, 'Relative jump if not zero'),
  0x28: (bytes, i, address = 0) => createRelativeJump('Z', [0x28, bytes[i+1]], address, 'Relative jump if zero'),
  0x30: (bytes, i, address = 0) => createRelativeJump('NC', [0x30, bytes[i+1]], address, 'Relative jump if no carry'),
  0x38: (bytes, i, address = 0) => createRelativeJump('C', [0x38, bytes[i+1]], address, 'Relative jump if carry'),
  
  // DJNZ - Z80 specific
  0x10: (bytes, i, address = 0) => {
    const targetAddress = bytes[i+1];
    return {
      ...createRelativeJump(null, [0x10, bytes[i+1]], address, 'Decrement B and jump if not zero'),
      mnemonic: 'DJNZ'
    };
  },
  
  // Conditional jumps - Zero flag
  0xC2: (bytes, i) => createConditionalJump(0xC2, 'NZ', [0xC2, bytes[i+1], bytes[i+2]]),
  0xCA: (bytes, i) => createConditionalJump(0xCA, 'Z', [0xCA, bytes[i+1], bytes[i+2]]),
  
  // Conditional jumps - Carry flag  
  0xD2: (bytes, i) => createConditionalJump(0xD2, 'NC', [0xD2, bytes[i+1], bytes[i+2]]),
  0xDA: (bytes, i) => createConditionalJump(0xDA, 'C', [0xDA, bytes[i+1], bytes[i+2]]),
  
  // Conditional jumps - Parity flag
  0xE2: (bytes, i) => createConditionalJump(0xE2, 'PO', [0xE2, bytes[i+1], bytes[i+2]], 'Jump if parity odd'),
  0xEA: (bytes, i) => createConditionalJump(0xEA, 'PE', [0xEA, bytes[i+1], bytes[i+2]], 'Jump if parity even'),
  
  // Conditional jumps - Sign flag
  0xF2: (bytes, i) => createConditionalJump(0xF2, 'P', [0xF2, bytes[i+1], bytes[i+2]], 'Jump if positive (S flag = 0)'),
  0xFA: (bytes, i) => createConditionalJump(0xFA, 'M', [0xFA, bytes[i+1], bytes[i+2]], 'Jump if minus/negative (S flag = 1)'),
};
