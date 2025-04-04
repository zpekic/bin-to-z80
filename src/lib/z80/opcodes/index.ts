
import { OpcodeHandler } from '../types';
import { LOGICAL_OPCODES } from './logical-opcodes';
import { IO_OPCODES } from './io-opcodes';
import INTEL_8080_OPCODES from './intel8080-opcodes';
import INTEL_8085_OPCODES from './intel8085-opcodes';

// Import other opcode groups from existing files
import { BASIC_OPCODES } from './basic-opcodes';
import { REGISTER_OPCODES } from './register-opcodes';
import { ARITHMETIC_OPCODES } from './arithmetic-opcodes';
import { CONTROL_FLOW_OPCODES } from './control-flow-opcodes';

// Combine all Z80 opcodes
export const Z80_OPCODES: Record<number, OpcodeHandler> = {
  ...BASIC_OPCODES,
  ...REGISTER_OPCODES,
  ...ARITHMETIC_OPCODES,
  ...LOGICAL_OPCODES,
  ...CONTROL_FLOW_OPCODES,
  ...IO_OPCODES
};

// Export Intel opcodes
export { INTEL_8080_OPCODES, INTEL_8085_OPCODES };
