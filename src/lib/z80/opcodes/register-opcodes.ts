
import { OpcodeHandler } from '../types';
import { formatByteValue, format16BitHex } from '../formatters';

// Register operations for Z80
export const REGISTER_OPCODES: Record<number, OpcodeHandler> = {
  // 8-bit load operations
  0x06: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `B, ${formatByteValue(bytes[i+1])}`,
    bytes: [0x06, bytes[i+1]],
    size: 2,
    comment: 'B <- n',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x0E: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `C, ${formatByteValue(bytes[i+1])}`,
    bytes: [0x0E, bytes[i+1]],
    size: 2,
    comment: 'C <- n',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x16: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `D, ${formatByteValue(bytes[i+1])}`,
    bytes: [0x16, bytes[i+1]],
    size: 2,
    comment: 'D <- n',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x1E: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `E, ${formatByteValue(bytes[i+1])}`,
    bytes: [0x1E, bytes[i+1]],
    size: 2,
    comment: 'E <- n',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x26: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `H, ${formatByteValue(bytes[i+1])}`,
    bytes: [0x26, bytes[i+1]],
    size: 2,
    comment: 'H <- n',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x2E: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `L, ${formatByteValue(bytes[i+1])}`,
    bytes: [0x2E, bytes[i+1]],
    size: 2,
    comment: 'L <- n',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x3E: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `A, ${formatByteValue(bytes[i+1])}`,
    bytes: [0x3E, bytes[i+1]],
    size: 2,
    comment: 'A <- n',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),

  // Register to register loads
  0x40: (bytes, i) => ({
    mnemonic: 'LD',
    operands: 'B, B',
    bytes: [0x40],
    size: 1,
    comment: 'B <- B',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x41: (bytes, i) => ({
    mnemonic: 'LD',
    operands: 'B, C',
    bytes: [0x41],
    size: 1,
    comment: 'B <- C',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x42: (bytes, i) => ({
    mnemonic: 'LD',
    operands: 'B, D',
    bytes: [0x42],
    size: 1,
    comment: 'B <- D',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x43: (bytes, i) => ({
    mnemonic: 'LD',
    operands: 'B, E',
    bytes: [0x43],
    size: 1,
    comment: 'B <- E',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x44: (bytes, i) => ({
    mnemonic: 'LD',
    operands: 'B, H',
    bytes: [0x44],
    size: 1,
    comment: 'B <- H',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x45: (bytes, i) => ({
    mnemonic: 'LD',
    operands: 'B, L',
    bytes: [0x45],
    size: 1,
    comment: 'B <- L',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x46: (bytes, i) => ({
    mnemonic: 'LD',
    operands: 'B, (HL)',
    bytes: [0x46],
    size: 1,
    comment: 'B <- (HL)',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x47: (bytes, i) => ({
    mnemonic: 'LD',
    operands: 'B, A',
    bytes: [0x47],
    size: 1,
    comment: 'B <- A',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),

  // Additional 16-bit load operations
  0x01: (bytes, i) => {
    const value = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'LD',
      operands: `BC, ${format16BitHex(value)}`,
      bytes: [0x01, bytes[i+1], bytes[i+2]],
      size: 3,
      comment: 'BC <- nn',
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0x11: (bytes, i) => {
    const value = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'LD',
      operands: `DE, ${format16BitHex(value)}`,
      bytes: [0x11, bytes[i+1], bytes[i+2]],
      size: 3,
      comment: 'DE <- nn',
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0x21: (bytes, i) => {
    const value = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'LD',
      operands: `HL, ${format16BitHex(value)}`,
      bytes: [0x21, bytes[i+1], bytes[i+2]],
      size: 3,
      comment: 'HL <- nn',
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0x31: (bytes, i) => {
    const value = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'LD',
      operands: `SP, ${format16BitHex(value)}`,
      bytes: [0x31, bytes[i+1], bytes[i+2]],
      size: 3,
      comment: 'SP <- nn',
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },

  // Special exchanges
  0xEB: (bytes, i) => ({
    mnemonic: 'EX',
    operands: 'DE, HL',
    bytes: [0xEB],
    size: 1,
    comment: 'Exchange DE and HL',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
};
