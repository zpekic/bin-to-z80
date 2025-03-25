
import { OpcodeHandler } from '../types';
import { BASIC_OPCODES } from './basic-opcodes';
import { REGISTER_OPCODES } from './register-opcodes';
import { ARITHMETIC_OPCODES } from './arithmetic-opcodes';
import { CONTROL_FLOW_OPCODES } from './control-flow-opcodes';

// Combine all opcode handlers into a single lookup table
export const Z80_OPCODES: Record<number, OpcodeHandler> = {
  ...BASIC_OPCODES,
  ...REGISTER_OPCODES,
  ...ARITHMETIC_OPCODES,
  ...CONTROL_FLOW_OPCODES,
};
