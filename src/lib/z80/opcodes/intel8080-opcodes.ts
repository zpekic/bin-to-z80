
import { OpcodeHandler } from '../types';
import { Z80_OPCODES } from './index';

// Filter Z80 opcodes to only include those supported by Intel 8080
const INTEL_8080_OPCODES: Record<number, OpcodeHandler> = {};

// We'll populate this in the next step to avoid circular dependencies
// Export will be handled by index.ts

export default INTEL_8080_OPCODES;
