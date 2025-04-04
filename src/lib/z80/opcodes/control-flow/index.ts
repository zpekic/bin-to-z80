
import { OpcodeHandler } from '../../types';
import { CALL_OPCODES } from './calls';
import { JUMP_OPCODES } from './jumps';
import { CONDITIONAL_RETURN_OPCODES } from './conditional-returns';
import { STACK_OPCODES } from './stack';
import { MISC_CONTROL_OPCODES } from './misc';
import { RST_OPCODES } from './rst';
import { IMMEDIATE_CONTROL_OPCODES } from './immediate-ops';

// Combine all control flow opcode groups
export const CONTROL_FLOW_OPCODES: Record<number, OpcodeHandler> = {
  ...CONDITIONAL_RETURN_OPCODES,
  ...JUMP_OPCODES,
  ...CALL_OPCODES,
  ...STACK_OPCODES,
  ...MISC_CONTROL_OPCODES,
  ...RST_OPCODES,
  ...IMMEDIATE_CONTROL_OPCODES
};
