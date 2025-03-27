
import { OpcodeHandler } from '../types';
import { formatByteValue } from '../formatters';

// Arithmetic operations (0x80-0xBF)
export const ARITHMETIC_OPCODES: Record<number, OpcodeHandler> = {
  // ADD A, r operations
  0x80: () => ({ mnemonic: 'ADD', operands: 'A, B', bytes: [0x80], size: 1 }),
  0x81: () => ({ mnemonic: 'ADD', operands: 'A, C', bytes: [0x81], size: 1 }),
  0x82: () => ({ mnemonic: 'ADD', operands: 'A, D', bytes: [0x82], size: 1 }),
  0x83: () => ({ mnemonic: 'ADD', operands: 'A, E', bytes: [0x83], size: 1 }),
  0x84: () => ({ mnemonic: 'ADD', operands: 'A, H', bytes: [0x84], size: 1 }),
  0x85: () => ({ mnemonic: 'ADD', operands: 'A, L', bytes: [0x85], size: 1 }),
  0x86: () => ({ mnemonic: 'ADD', operands: 'A, (HL)', bytes: [0x86], size: 1 }),
  0x87: () => ({ mnemonic: 'ADD', operands: 'A, A', bytes: [0x87], size: 1 }),
  
  // SUB r operations
  0x90: () => ({ mnemonic: 'SUB', operands: 'B', bytes: [0x90], size: 1 }),
  0x91: () => ({ mnemonic: 'SUB', operands: 'C', bytes: [0x91], size: 1 }),
  0x92: () => ({ mnemonic: 'SUB', operands: 'D', bytes: [0x92], size: 1 }),
  0x93: () => ({ mnemonic: 'SUB', operands: 'E', bytes: [0x93], size: 1 }),
  0x94: () => ({ mnemonic: 'SUB', operands: 'H', bytes: [0x94], size: 1 }),
  0x95: () => ({ mnemonic: 'SUB', operands: 'L', bytes: [0x95], size: 1 }),
  0x96: () => ({ mnemonic: 'SUB', operands: '(HL)', bytes: [0x96], size: 1 }),
  0x97: () => ({ mnemonic: 'SUB', operands: 'A', bytes: [0x97], size: 1 }),
  
  // AND r operations
  0xA0: () => ({ mnemonic: 'AND', operands: 'B', bytes: [0xA0], size: 1 }),
  0xA1: () => ({ mnemonic: 'AND', operands: 'C', bytes: [0xA1], size: 1 }),
  0xA2: () => ({ mnemonic: 'AND', operands: 'D', bytes: [0xA2], size: 1 }),
  0xA3: () => ({ mnemonic: 'AND', operands: 'E', bytes: [0xA3], size: 1 }),
  0xA4: () => ({ mnemonic: 'AND', operands: 'H', bytes: [0xA4], size: 1 }),
  0xA5: () => ({ mnemonic: 'AND', operands: 'L', bytes: [0xA5], size: 1 }),
  0xA6: () => ({ mnemonic: 'AND', operands: '(HL)', bytes: [0xA6], size: 1 }),
  0xA7: () => ({ mnemonic: 'AND', operands: 'A', bytes: [0xA7], size: 1 }),
  
  // OR r operations
  0xB0: () => ({ mnemonic: 'OR', operands: 'B', bytes: [0xB0], size: 1 }),
  0xB1: () => ({ mnemonic: 'OR', operands: 'C', bytes: [0xB1], size: 1 }),
  0xB2: () => ({ mnemonic: 'OR', operands: 'D', bytes: [0xB2], size: 1 }),
  0xB3: () => ({ mnemonic: 'OR', operands: 'E', bytes: [0xB3], size: 1 }),
  0xB4: () => ({ mnemonic: 'OR', operands: 'H', bytes: [0xB4], size: 1 }),
  0xB5: () => ({ mnemonic: 'OR', operands: 'L', bytes: [0xB5], size: 1 }),
  0xB6: () => ({ mnemonic: 'OR', operands: '(HL)', bytes: [0xB6], size: 1 }),
  0xB7: () => ({ mnemonic: 'OR', operands: 'A', bytes: [0xB7], size: 1 }),
  
  // Immediate arithmetic operations
  0xC6: (bytes, i) => ({
    mnemonic: 'ADD',
    operands: `A, ${formatByteValue(bytes[i+1])}`,
    bytes: [0xC6, bytes[i+1]],
    size: 2
  }),
};
