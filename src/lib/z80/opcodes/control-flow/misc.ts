
import { OpcodeHandler } from '../../types';
import { formatByteValue } from '../../formatters';

// Miscellaneous control flow opcodes
export const MISC_CONTROL_OPCODES: Record<number, OpcodeHandler> = {
  // Exchange registers
  0xD9: () => ({ mnemonic: 'EXX', operands: '', bytes: [0xD9], size: 1, supportsIntel8080: false, supportsIntel8085: false }),
  0xEB: () => ({ mnemonic: 'EX', operands: 'DE, HL', bytes: [0xEB], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  
  // Interrupt control
  0xF3: () => ({ mnemonic: 'DI', operands: '', bytes: [0xF3], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xFB: () => ({ mnemonic: 'EI', operands: '', bytes: [0xFB], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
};
