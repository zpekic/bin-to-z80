
import { OpcodeHandler } from '../types';
import { BASIC_OPCODES } from './basic-opcodes';
import { REGISTER_OPCODES } from './register-opcodes';
import { ARITHMETIC_OPCODES } from './arithmetic-opcodes';
import { CONTROL_FLOW_OPCODES } from './control-flow-opcodes';
import { IO_OPCODES } from './io-opcodes';

// Combine all opcode handlers into a single lookup table
export const Z80_OPCODES: Record<number, OpcodeHandler> = {
  ...BASIC_OPCODES,
  ...REGISTER_OPCODES,
  ...ARITHMETIC_OPCODES,
  ...CONTROL_FLOW_OPCODES,
  ...IO_OPCODES,
};

// Define opcodes that aren't supported in Intel 8080/8085
// This can be used for filtering or specialized handling
export const Z80_ONLY_OPCODES = [
  // Z80-specific opcodes not found in Intel 8080/8085
  0x08, // EX AF, AF'
  0x10, // DJNZ
  0x18, // JR (relative jump)
  0x20, // JR NZ (conditional relative jump)
  0x28, // JR Z
  0x30, // JR NC
  0x38, // JR C
  // CB-prefixed bit manipulation instructions
  0xCB,
  // IX register instructions
  0xDD,
  // Extended instructions
  0xED,
  // IY register instructions
  0xFD
];
