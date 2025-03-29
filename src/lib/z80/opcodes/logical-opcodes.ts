
import { OpcodeHandler } from '../types';
import { formatByteValue } from '../formatters';

// Format a byte as binary string
const formatBinary = (value: number): string => {
  return value.toString(2).padStart(8, '0');
};

// Logical operations (AND, OR, XOR)
export const LOGICAL_OPCODES: Record<number, OpcodeHandler> = {
  // AND r operations
  0xA0: () => ({ mnemonic: 'AND', operands: 'B', bytes: [0xA0], size: 1, comment: 'Logical AND with B' }),
  0xA1: () => ({ mnemonic: 'AND', operands: 'C', bytes: [0xA1], size: 1, comment: 'Logical AND with C' }),
  0xA2: () => ({ mnemonic: 'AND', operands: 'D', bytes: [0xA2], size: 1, comment: 'Logical AND with D' }),
  0xA3: () => ({ mnemonic: 'AND', operands: 'E', bytes: [0xA3], size: 1, comment: 'Logical AND with E' }),
  0xA4: () => ({ mnemonic: 'AND', operands: 'H', bytes: [0xA4], size: 1, comment: 'Logical AND with H' }),
  0xA5: () => ({ mnemonic: 'AND', operands: 'L', bytes: [0xA5], size: 1, comment: 'Logical AND with L' }),
  0xA6: () => ({ mnemonic: 'AND', operands: '(HL)', bytes: [0xA6], size: 1, comment: 'Logical AND with (HL)' }),
  0xA7: () => ({ mnemonic: 'AND', operands: 'A', bytes: [0xA7], size: 1, comment: 'Logical AND with A' }),
  
  // XOR r operations
  0xA8: () => ({ mnemonic: 'XOR', operands: 'B', bytes: [0xA8], size: 1, comment: 'Exclusive OR with B' }),
  0xA9: () => ({ mnemonic: 'XOR', operands: 'C', bytes: [0xA9], size: 1, comment: 'Exclusive OR with C' }),
  0xAA: () => ({ mnemonic: 'XOR', operands: 'D', bytes: [0xAA], size: 1, comment: 'Exclusive OR with D' }),
  0xAB: () => ({ mnemonic: 'XOR', operands: 'E', bytes: [0xAB], size: 1, comment: 'Exclusive OR with E' }),
  0xAC: () => ({ mnemonic: 'XOR', operands: 'H', bytes: [0xAC], size: 1, comment: 'Exclusive OR with H' }),
  0xAD: () => ({ mnemonic: 'XOR', operands: 'L', bytes: [0xAD], size: 1, comment: 'Exclusive OR with L' }),
  0xAE: () => ({ mnemonic: 'XOR', operands: '(HL)', bytes: [0xAE], size: 1, comment: 'Exclusive OR with (HL)' }),
  0xAF: () => ({ mnemonic: 'XOR', operands: 'A', bytes: [0xAF], size: 1, comment: 'Exclusive OR with A' }),
  
  // OR r operations
  0xB0: () => ({ mnemonic: 'OR', operands: 'B', bytes: [0xB0], size: 1, comment: 'Logical OR with B' }),
  0xB1: () => ({ mnemonic: 'OR', operands: 'C', bytes: [0xB1], size: 1, comment: 'Logical OR with C' }),
  0xB2: () => ({ mnemonic: 'OR', operands: 'D', bytes: [0xB2], size: 1, comment: 'Logical OR with D' }),
  0xB3: () => ({ mnemonic: 'OR', operands: 'E', bytes: [0xB3], size: 1, comment: 'Logical OR with E' }),
  0xB4: () => ({ mnemonic: 'OR', operands: 'H', bytes: [0xB4], size: 1, comment: 'Logical OR with H' }),
  0xB5: () => ({ mnemonic: 'OR', operands: 'L', bytes: [0xB5], size: 1, comment: 'Logical OR with L' }),
  0xB6: () => ({ mnemonic: 'OR', operands: '(HL)', bytes: [0xB6], size: 1, comment: 'Logical OR with (HL)' }),
  0xB7: () => ({ mnemonic: 'OR', operands: 'A', bytes: [0xB7], size: 1, comment: 'Logical OR with A' }),

  // Immediate logical operations
  0xE6: (bytes, i) => {
    const value = bytes[i+1];
    return {
      mnemonic: 'AND',
      operands: `${formatByteValue(value)} (${formatBinary(value)}b)`,
      bytes: [0xE6, value],
      size: 2,
      comment: 'Logical AND with immediate value'
    };
  },
  
  0xEE: (bytes, i) => {
    const value = bytes[i+1];
    return {
      mnemonic: 'XOR',
      operands: `${formatByteValue(value)} (${formatBinary(value)}b)`,
      bytes: [0xEE, value],
      size: 2,
      comment: 'Exclusive OR with immediate value'
    };
  },
  
  0xF6: (bytes, i) => {
    const value = bytes[i+1];
    return {
      mnemonic: 'OR',
      operands: `${formatByteValue(value)} (${formatBinary(value)}b)`,
      bytes: [0xF6, value],
      size: 2,
      comment: 'Logical OR with immediate value'
    };
  },
};
