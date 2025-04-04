import { OpcodeHandler } from '../types';
import { formatByteValue } from '../formatters';

// Arithmetic operations (0x80-0xBF)
export const ARITHMETIC_OPCODES: Record<number, OpcodeHandler> = {
  // ADD A, r operations
  0x80: () => ({ mnemonic: 'ADD', operands: 'A, B', bytes: [0x80], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x81: () => ({ mnemonic: 'ADD', operands: 'A, C', bytes: [0x81], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x82: () => ({ mnemonic: 'ADD', operands: 'A, D', bytes: [0x82], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x83: () => ({ mnemonic: 'ADD', operands: 'A, E', bytes: [0x83], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x84: () => ({ mnemonic: 'ADD', operands: 'A, H', bytes: [0x84], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x85: () => ({ mnemonic: 'ADD', operands: 'A, L', bytes: [0x85], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x86: () => ({ mnemonic: 'ADD', operands: 'A, (HL)', bytes: [0x86], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x87: () => ({ mnemonic: 'ADD', operands: 'A, A', bytes: [0x87], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  
  // ADC A, r operations (adding with carry)
  0x88: () => ({ mnemonic: 'ADC', operands: 'A, B', bytes: [0x88], size: 1, comment: 'Add with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0x89: () => ({ mnemonic: 'ADC', operands: 'A, C', bytes: [0x89], size: 1, comment: 'Add with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0x8A: () => ({ mnemonic: 'ADC', operands: 'A, D', bytes: [0x8A], size: 1, comment: 'Add with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0x8B: () => ({ mnemonic: 'ADC', operands: 'A, E', bytes: [0x8B], size: 1, comment: 'Add with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0x8C: () => ({ mnemonic: 'ADC', operands: 'A, H', bytes: [0x8C], size: 1, comment: 'Add with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0x8D: () => ({ mnemonic: 'ADC', operands: 'A, L', bytes: [0x8D], size: 1, comment: 'Add with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0x8E: () => ({ mnemonic: 'ADC', operands: 'A, (HL)', bytes: [0x8E], size: 1, comment: 'Add with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0x8F: () => ({ mnemonic: 'ADC', operands: 'A, A', bytes: [0x8F], size: 1, comment: 'Add with carry', supportsIntel8080: true, supportsIntel8085: true }),
  
  // SUB r operations
  0x90: () => ({ mnemonic: 'SUB', operands: 'B', bytes: [0x90], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x91: () => ({ mnemonic: 'SUB', operands: 'C', bytes: [0x91], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x92: () => ({ mnemonic: 'SUB', operands: 'D', bytes: [0x92], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x93: () => ({ mnemonic: 'SUB', operands: 'E', bytes: [0x93], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x94: () => ({ mnemonic: 'SUB', operands: 'H', bytes: [0x94], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x95: () => ({ mnemonic: 'SUB', operands: 'L', bytes: [0x95], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x96: () => ({ mnemonic: 'SUB', operands: '(HL)', bytes: [0x96], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x97: () => ({ mnemonic: 'SUB', operands: 'A', bytes: [0x97], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  
  // SBC A, r operations (subtract with carry)
  0x98: () => ({ mnemonic: 'SBC', operands: 'A, B', bytes: [0x98], size: 1, comment: 'Subtract with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0x99: () => ({ mnemonic: 'SBC', operands: 'A, C', bytes: [0x99], size: 1, comment: 'Subtract with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0x9A: () => ({ mnemonic: 'SBC', operands: 'A, D', bytes: [0x9A], size: 1, comment: 'Subtract with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0x9B: () => ({ mnemonic: 'SBC', operands: 'A, E', bytes: [0x9B], size: 1, comment: 'Subtract with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0x9C: () => ({ mnemonic: 'SBC', operands: 'A, H', bytes: [0x9C], size: 1, comment: 'Subtract with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0x9D: () => ({ mnemonic: 'SBC', operands: 'A, L', bytes: [0x9D], size: 1, comment: 'Subtract with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0x9E: () => ({ mnemonic: 'SBC', operands: 'A, (HL)', bytes: [0x9E], size: 1, comment: 'Subtract with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0x9F: () => ({ mnemonic: 'SBC', operands: 'A, A', bytes: [0x9F], size: 1, comment: 'Subtract with carry', supportsIntel8080: true, supportsIntel8085: true }),
  
  // CP r operations (compare, subtract without storing result)
  0xB8: () => ({ mnemonic: 'CP', operands: 'B', bytes: [0xB8], size: 1, comment: 'Compare A with B', supportsIntel8080: true, supportsIntel8085: true }),
  0xB9: () => ({ mnemonic: 'CP', operands: 'C', bytes: [0xB9], size: 1, comment: 'Compare A with C', supportsIntel8080: true, supportsIntel8085: true }),
  0xBA: () => ({ mnemonic: 'CP', operands: 'D', bytes: [0xBA], size: 1, comment: 'Compare A with D', supportsIntel8080: true, supportsIntel8085: true }),
  0xBB: () => ({ mnemonic: 'CP', operands: 'E', bytes: [0xBB], size: 1, comment: 'Compare A with E', supportsIntel8080: true, supportsIntel8085: true }),
  0xBC: () => ({ mnemonic: 'CP', operands: 'H', bytes: [0xBC], size: 1, comment: 'Compare A with H', supportsIntel8080: true, supportsIntel8085: true }),
  0xBD: () => ({ mnemonic: 'CP', operands: 'L', bytes: [0xBD], size: 1, comment: 'Compare A with L', supportsIntel8080: true, supportsIntel8085: true }),
  0xBE: () => ({ mnemonic: 'CP', operands: '(HL)', bytes: [0xBE], size: 1, comment: 'Compare A with (HL)', supportsIntel8080: true, supportsIntel8085: true }),
  0xBF: () => ({ mnemonic: 'CP', operands: 'A', bytes: [0xBF], size: 1, comment: 'Compare A with A', supportsIntel8080: true, supportsIntel8085: true }),
  
  // Immediate arithmetic operations
  0xC6: (bytes, i) => ({
    mnemonic: 'ADD',
    operands: `A, ${formatByteValue(bytes[i+1])}`,
    bytes: [0xC6, bytes[i+1]],
    size: 2,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  
  // Add the missing immediate arithmetic operations
  0xCE: (bytes, i) => ({
    mnemonic: 'ADC',
    operands: `A, ${formatByteValue(bytes[i+1])}`,
    bytes: [0xCE, bytes[i+1]],
    size: 2,
    comment: 'Add immediate with carry',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  
  0xD6: (bytes, i) => ({
    mnemonic: 'SUB',
    operands: formatByteValue(bytes[i+1]),
    bytes: [0xD6, bytes[i+1]],
    size: 2,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  
  0xDE: (bytes, i) => ({
    mnemonic: 'SBC',
    operands: `A, ${formatByteValue(bytes[i+1])}`,
    bytes: [0xDE, bytes[i+1]],
    size: 2,
    comment: 'Subtract immediate with carry',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  
  0xFE: (bytes, i) => ({
    mnemonic: 'CP',
    operands: formatByteValue(bytes[i+1]),
    bytes: [0xFE, bytes[i+1]],
    size: 2,
    comment: 'Compare A with immediate',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
};
