import { OpcodeHandler } from '../../types';
import { formatByteValue } from '../../formatters';

// Stack operations opcodes
export const STACK_OPCODES: Record<number, OpcodeHandler> = {
  // PUSH opcodes
  0xC5: () => ({ mnemonic: 'PUSH', operands: 'BC', bytes: [0xC5], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xD5: () => ({ mnemonic: 'PUSH', operands: 'DE', bytes: [0xD5], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xE5: () => ({ mnemonic: 'PUSH', operands: 'HL', bytes: [0xE5], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xF5: () => ({ mnemonic: 'PUSH', operands: 'AF', bytes: [0xF5], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  
  // POP opcodes
  0xC1: () => ({ mnemonic: 'POP', operands: 'BC', bytes: [0xC1], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xD1: () => ({ mnemonic: 'POP', operands: 'DE', bytes: [0xD1], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xE1: () => ({ mnemonic: 'POP', operands: 'HL', bytes: [0xE1], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xF1: () => ({ mnemonic: 'POP', operands: 'AF', bytes: [0xF1], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  
  // Other stack-related instructions
  0xF9: () => ({ mnemonic: 'LD', operands: 'SP, HL', bytes: [0xF9], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xE3: () => ({ mnemonic: 'EX', operands: '(SP), HL', bytes: [0xE3], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
};
