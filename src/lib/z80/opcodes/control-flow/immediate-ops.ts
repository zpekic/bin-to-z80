
import { OpcodeHandler } from '../../types';
import { formatByteValue } from '../../formatters';

// Immediate operations that were mixed with control flow
export const IMMEDIATE_CONTROL_OPCODES: Record<number, OpcodeHandler> = {
  // Arithmetic and logical immediate operations
  0xCE: (bytes, i) => ({
    mnemonic: 'ADC',
    operands: `A, ${formatByteValue(bytes[i+1])}`,
    bytes: [0xCE, bytes[i+1]],
    size: 2,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xD6: (bytes, i) => ({
    mnemonic: 'SUB',
    operands: `${formatByteValue(bytes[i+1])}`,
    bytes: [0xD6, bytes[i+1]],
    size: 2,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xE6: (bytes, i) => ({
    mnemonic: 'AND',
    operands: `${formatByteValue(bytes[i+1])}`,
    bytes: [0xE6, bytes[i+1]],
    size: 2,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xEE: (bytes, i) => ({
    mnemonic: 'XOR',
    operands: `${formatByteValue(bytes[i+1])}`,
    bytes: [0xEE, bytes[i+1]],
    size: 2,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xF6: (bytes, i) => ({
    mnemonic: 'OR',
    operands: `${formatByteValue(bytes[i+1])}`,
    bytes: [0xF6, bytes[i+1]],
    size: 2,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xFE: (bytes, i) => ({
    mnemonic: 'CP',
    operands: `${formatByteValue(bytes[i+1])}`,
    bytes: [0xFE, bytes[i+1]],
    size: 2,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
};
