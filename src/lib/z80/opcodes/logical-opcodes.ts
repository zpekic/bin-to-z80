
import { OpcodeHandler } from '../types';
import { formatByteValue } from '../formatters';

// Logical operations for Z80
export const LOGICAL_OPCODES: Record<number, OpcodeHandler> = {
  // AND operations
  0xA0: (bytes, i) => ({
    mnemonic: 'AND',
    operands: 'B',
    bytes: [0xA0],
    size: 1,
    comment: 'A <- A & B',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xA1: (bytes, i) => ({
    mnemonic: 'AND',
    operands: 'C',
    bytes: [0xA1],
    size: 1,
    comment: 'A <- A & C',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xA2: (bytes, i) => ({
    mnemonic: 'AND',
    operands: 'D',
    bytes: [0xA2],
    size: 1,
    comment: 'A <- A & D',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xA3: (bytes, i) => ({
    mnemonic: 'AND',
    operands: 'E',
    bytes: [0xA3],
    size: 1,
    comment: 'A <- A & E',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xA4: (bytes, i) => ({
    mnemonic: 'AND',
    operands: 'H',
    bytes: [0xA4],
    size: 1,
    comment: 'A <- A & H',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xA5: (bytes, i) => ({
    mnemonic: 'AND',
    operands: 'L',
    bytes: [0xA5],
    size: 1,
    comment: 'A <- A & L',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xA6: (bytes, i) => ({
    mnemonic: 'AND',
    operands: '(HL)',
    bytes: [0xA6],
    size: 1,
    comment: 'A <- A & (HL)',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xA7: (bytes, i) => ({
    mnemonic: 'AND',
    operands: 'A',
    bytes: [0xA7],
    size: 1,
    comment: 'A <- A & A',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xE6: (bytes, i) => ({
    mnemonic: 'AND',
    operands: formatByteValue(bytes[i+1]),
    bytes: [0xE6, bytes[i+1]],
    size: 2,
    comment: 'A <- A & n',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),

  // XOR operations
  0xA8: (bytes, i) => ({
    mnemonic: 'XOR',
    operands: 'B',
    bytes: [0xA8],
    size: 1,
    comment: 'A <- A ^ B',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xA9: (bytes, i) => ({
    mnemonic: 'XOR',
    operands: 'C',
    bytes: [0xA9],
    size: 1,
    comment: 'A <- A ^ C',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xAA: (bytes, i) => ({
    mnemonic: 'XOR',
    operands: 'D',
    bytes: [0xAA],
    size: 1,
    comment: 'A <- A ^ D',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xAB: (bytes, i) => ({
    mnemonic: 'XOR',
    operands: 'E',
    bytes: [0xAB],
    size: 1,
    comment: 'A <- A ^ E',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xAC: (bytes, i) => ({
    mnemonic: 'XOR',
    operands: 'H',
    bytes: [0xAC],
    size: 1,
    comment: 'A <- A ^ H',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xAD: (bytes, i) => ({
    mnemonic: 'XOR',
    operands: 'L',
    bytes: [0xAD],
    size: 1,
    comment: 'A <- A ^ L',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xAE: (bytes, i) => ({
    mnemonic: 'XOR',
    operands: '(HL)',
    bytes: [0xAE],
    size: 1,
    comment: 'A <- A ^ (HL)',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xAF: (bytes, i) => ({
    mnemonic: 'XOR',
    operands: 'A',
    bytes: [0xAF],
    size: 1,
    comment: 'A <- A ^ A',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xEE: (bytes, i) => ({
    mnemonic: 'XOR',
    operands: formatByteValue(bytes[i+1]),
    bytes: [0xEE, bytes[i+1]],
    size: 2,
    comment: 'A <- A ^ n',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),

  // OR operations
  0xB0: (bytes, i) => ({
    mnemonic: 'OR',
    operands: 'B',
    bytes: [0xB0],
    size: 1,
    comment: 'A <- A | B',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xB1: (bytes, i) => ({
    mnemonic: 'OR',
    operands: 'C',
    bytes: [0xB1],
    size: 1,
    comment: 'A <- A | C',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xB2: (bytes, i) => ({
    mnemonic: 'OR',
    operands: 'D',
    bytes: [0xB2],
    size: 1,
    comment: 'A <- A | D',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xB3: (bytes, i) => ({
    mnemonic: 'OR',
    operands: 'E',
    bytes: [0xB3],
    size: 1,
    comment: 'A <- A | E',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xB4: (bytes, i) => ({
    mnemonic: 'OR',
    operands: 'H',
    bytes: [0xB4],
    size: 1,
    comment: 'A <- A | H',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xB5: (bytes, i) => ({
    mnemonic: 'OR',
    operands: 'L',
    bytes: [0xB5],
    size: 1,
    comment: 'A <- A | L',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xB6: (bytes, i) => ({
    mnemonic: 'OR',
    operands: '(HL)',
    bytes: [0xB6],
    size: 1,
    comment: 'A <- A | (HL)',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xB7: (bytes, i) => ({
    mnemonic: 'OR',
    operands: 'A',
    bytes: [0xB7],
    size: 1,
    comment: 'A <- A | A',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xF6: (bytes, i) => ({
    mnemonic: 'OR',
    operands: formatByteValue(bytes[i+1]),
    bytes: [0xF6, bytes[i+1]],
    size: 2,
    comment: 'A <- A | n',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),

  // CP operations (compare)
  0xB8: (bytes, i) => ({
    mnemonic: 'CP',
    operands: 'B',
    bytes: [0xB8],
    size: 1,
    comment: 'Compare A with B',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xB9: (bytes, i) => ({
    mnemonic: 'CP',
    operands: 'C',
    bytes: [0xB9],
    size: 1,
    comment: 'Compare A with C',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xBA: (bytes, i) => ({
    mnemonic: 'CP',
    operands: 'D',
    bytes: [0xBA],
    size: 1,
    comment: 'Compare A with D',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xBB: (bytes, i) => ({
    mnemonic: 'CP',
    operands: 'E',
    bytes: [0xBB],
    size: 1,
    comment: 'Compare A with E',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xBC: (bytes, i) => ({
    mnemonic: 'CP',
    operands: 'H',
    bytes: [0xBC],
    size: 1,
    comment: 'Compare A with H',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xBD: (bytes, i) => ({
    mnemonic: 'CP',
    operands: 'L',
    bytes: [0xBD],
    size: 1,
    comment: 'Compare A with L',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xBE: (bytes, i) => ({
    mnemonic: 'CP',
    operands: '(HL)',
    bytes: [0xBE],
    size: 1,
    comment: 'Compare A with (HL)',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xBF: (bytes, i) => ({
    mnemonic: 'CP',
    operands: 'A',
    bytes: [0xBF],
    size: 1,
    comment: 'Compare A with A',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xFE: (bytes, i) => ({
    mnemonic: 'CP',
    operands: formatByteValue(bytes[i+1]),
    bytes: [0xFE, bytes[i+1]],
    size: 2,
    comment: 'Compare A with n',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
};
