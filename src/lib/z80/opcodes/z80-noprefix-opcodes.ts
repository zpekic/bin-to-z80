
import { OpcodeHandler } from '../types';
import { formatByteValue, formatHex } from '../formatters';

/**
 * Z80 unprefixed opcodes
 * Based on the Zilog Z80 instruction set
 * Reference: Zilog Z80 CPU Specifications
 */

export const Z80_NOPREFIX_OPCODES: Record<number, OpcodeHandler> = {
  // 0x row
  0x00: () => ({ mnemonic: 'NOP', operands: '', bytes: [0x00], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x01: (bytes, i) => {
    const value = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'LD',
      operands: `BC, ${formatHex(value, 4)}h`,
      bytes: [0x01, bytes[i+1], bytes[i+2]],
      size: 3,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0x02: () => ({ mnemonic: 'LD', operands: '(BC), A', bytes: [0x02], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x03: () => ({ mnemonic: 'INC', operands: 'BC', bytes: [0x03], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x04: () => ({ mnemonic: 'INC', operands: 'B', bytes: [0x04], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x05: () => ({ mnemonic: 'DEC', operands: 'B', bytes: [0x05], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x06: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `B, ${formatByteValue(bytes[i+1])}`,
    bytes: [0x06, bytes[i+1]],
    size: 2,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x07: () => ({ mnemonic: 'RLCA', operands: '', bytes: [0x07], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x08: () => ({ mnemonic: 'EX', operands: 'AF, AF\'', bytes: [0x08], size: 1, supportsIntel8080: false, supportsIntel8085: false }),
  0x09: () => ({ mnemonic: 'ADD', operands: 'HL, BC', bytes: [0x09], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x0A: () => ({ mnemonic: 'LD', operands: 'A, (BC)', bytes: [0x0A], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x0B: () => ({ mnemonic: 'DEC', operands: 'BC', bytes: [0x0B], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x0C: () => ({ mnemonic: 'INC', operands: 'C', bytes: [0x0C], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x0D: () => ({ mnemonic: 'DEC', operands: 'C', bytes: [0x0D], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x0E: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `C, ${formatByteValue(bytes[i+1])}`,
    bytes: [0x0E, bytes[i+1]],
    size: 2,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x0F: () => ({ mnemonic: 'RRCA', operands: '', bytes: [0x0F], size: 1, supportsIntel8080: true, supportsIntel8085: true }),

  // 1x row
  0x10: (bytes, i) => ({
    mnemonic: 'DJNZ',
    operands: `${formatHex((i + 2 + ((bytes[i+1] & 0x80) ? bytes[i+1] - 256 : bytes[i+1])) & 0xFFFF, 4)}h`,
    bytes: [0x10, bytes[i+1]],
    size: 2,
    targetAddress: (i + 2 + ((bytes[i+1] & 0x80) ? bytes[i+1] - 256 : bytes[i+1])) & 0xFFFF,
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  0x11: (bytes, i) => {
    const value = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'LD',
      operands: `DE, ${formatHex(value, 4)}h`,
      bytes: [0x11, bytes[i+1], bytes[i+2]],
      size: 3,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0x12: () => ({ mnemonic: 'LD', operands: '(DE), A', bytes: [0x12], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x13: () => ({ mnemonic: 'INC', operands: 'DE', bytes: [0x13], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x14: () => ({ mnemonic: 'INC', operands: 'D', bytes: [0x14], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x15: () => ({ mnemonic: 'DEC', operands: 'D', bytes: [0x15], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x16: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `D, ${formatByteValue(bytes[i+1])}`,
    bytes: [0x16, bytes[i+1]],
    size: 2,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x17: () => ({ mnemonic: 'RLA', operands: '', bytes: [0x17], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x18: (bytes, i) => ({
    mnemonic: 'JR',
    operands: `${formatHex((i + 2 + ((bytes[i+1] & 0x80) ? bytes[i+1] - 256 : bytes[i+1])) & 0xFFFF, 4)}h`,
    bytes: [0x18, bytes[i+1]],
    size: 2,
    targetAddress: (i + 2 + ((bytes[i+1] & 0x80) ? bytes[i+1] - 256 : bytes[i+1])) & 0xFFFF,
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  0x19: () => ({ mnemonic: 'ADD', operands: 'HL, DE', bytes: [0x19], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x1A: () => ({ mnemonic: 'LD', operands: 'A, (DE)', bytes: [0x1A], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x1B: () => ({ mnemonic: 'DEC', operands: 'DE', bytes: [0x1B], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x1C: () => ({ mnemonic: 'INC', operands: 'E', bytes: [0x1C], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x1D: () => ({ mnemonic: 'DEC', operands: 'E', bytes: [0x1D], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x1E: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `E, ${formatByteValue(bytes[i+1])}`,
    bytes: [0x1E, bytes[i+1]],
    size: 2,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x1F: () => ({ mnemonic: 'RRA', operands: '', bytes: [0x1F], size: 1, supportsIntel8080: true, supportsIntel8085: true }),

  // 2x row
  0x20: (bytes, i) => ({
    mnemonic: 'JR',
    operands: `NZ, ${formatHex((i + 2 + ((bytes[i+1] & 0x80) ? bytes[i+1] - 256 : bytes[i+1])) & 0xFFFF, 4)}h`,
    bytes: [0x20, bytes[i+1]],
    size: 2,
    targetAddress: (i + 2 + ((bytes[i+1] & 0x80) ? bytes[i+1] - 256 : bytes[i+1])) & 0xFFFF,
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  0x21: (bytes, i) => {
    const value = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'LD',
      operands: `HL, ${formatHex(value, 4)}h`,
      bytes: [0x21, bytes[i+1], bytes[i+2]],
      size: 3,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0x22: (bytes, i) => {
    const addr = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'LD',
      operands: `(${formatHex(addr, 4)}h), HL`,
      bytes: [0x22, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress: addr,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0x23: () => ({ mnemonic: 'INC', operands: 'HL', bytes: [0x23], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x24: () => ({ mnemonic: 'INC', operands: 'H', bytes: [0x24], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x25: () => ({ mnemonic: 'DEC', operands: 'H', bytes: [0x25], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x26: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `H, ${formatByteValue(bytes[i+1])}`,
    bytes: [0x26, bytes[i+1]],
    size: 2,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x27: () => ({ mnemonic: 'DAA', operands: '', bytes: [0x27], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x28: (bytes, i) => ({
    mnemonic: 'JR',
    operands: `Z, ${formatHex((i + 2 + ((bytes[i+1] & 0x80) ? bytes[i+1] - 256 : bytes[i+1])) & 0xFFFF, 4)}h`,
    bytes: [0x28, bytes[i+1]],
    size: 2,
    targetAddress: (i + 2 + ((bytes[i+1] & 0x80) ? bytes[i+1] - 256 : bytes[i+1])) & 0xFFFF,
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  0x29: () => ({ mnemonic: 'ADD', operands: 'HL, HL', bytes: [0x29], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x2A: (bytes, i) => {
    const addr = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'LD',
      operands: `HL, (${formatHex(addr, 4)}h)`,
      bytes: [0x2A, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress: addr,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0x2B: () => ({ mnemonic: 'DEC', operands: 'HL', bytes: [0x2B], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x2C: () => ({ mnemonic: 'INC', operands: 'L', bytes: [0x2C], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x2D: () => ({ mnemonic: 'DEC', operands: 'L', bytes: [0x2D], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x2E: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `L, ${formatByteValue(bytes[i+1])}`,
    bytes: [0x2E, bytes[i+1]],
    size: 2,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x2F: () => ({ mnemonic: 'CPL', operands: '', bytes: [0x2F], size: 1, supportsIntel8080: true, supportsIntel8085: true }),

  // 3x row
  0x30: (bytes, i) => ({
    mnemonic: 'JR',
    operands: `NC, ${formatHex((i + 2 + ((bytes[i+1] & 0x80) ? bytes[i+1] - 256 : bytes[i+1])) & 0xFFFF, 4)}h`,
    bytes: [0x30, bytes[i+1]],
    size: 2,
    targetAddress: (i + 2 + ((bytes[i+1] & 0x80) ? bytes[i+1] - 256 : bytes[i+1])) & 0xFFFF,
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  0x31: (bytes, i) => {
    const value = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'LD',
      operands: `SP, ${formatHex(value, 4)}h`,
      bytes: [0x31, bytes[i+1], bytes[i+2]],
      size: 3,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0x32: (bytes, i) => {
    const addr = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'LD',
      operands: `(${formatHex(addr, 4)}h), A`,
      bytes: [0x32, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress: addr,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0x33: () => ({ mnemonic: 'INC', operands: 'SP', bytes: [0x33], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x34: () => ({ mnemonic: 'INC', operands: '(HL)', bytes: [0x34], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x35: () => ({ mnemonic: 'DEC', operands: '(HL)', bytes: [0x35], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x36: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `(HL), ${formatByteValue(bytes[i+1])}`,
    bytes: [0x36, bytes[i+1]],
    size: 2,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x37: () => ({ mnemonic: 'SCF', operands: '', bytes: [0x37], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x38: (bytes, i) => ({
    mnemonic: 'JR',
    operands: `C, ${formatHex((i + 2 + ((bytes[i+1] & 0x80) ? bytes[i+1] - 256 : bytes[i+1])) & 0xFFFF, 4)}h`,
    bytes: [0x38, bytes[i+1]],
    size: 2,
    targetAddress: (i + 2 + ((bytes[i+1] & 0x80) ? bytes[i+1] - 256 : bytes[i+1])) & 0xFFFF,
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  0x39: () => ({ mnemonic: 'ADD', operands: 'HL, SP', bytes: [0x39], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x3A: (bytes, i) => {
    const addr = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'LD',
      operands: `A, (${formatHex(addr, 4)}h)`,
      bytes: [0x3A, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress: addr,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0x3B: () => ({ mnemonic: 'DEC', operands: 'SP', bytes: [0x3B], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x3C: () => ({ mnemonic: 'INC', operands: 'A', bytes: [0x3C], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x3D: () => ({ mnemonic: 'DEC', operands: 'A', bytes: [0x3D], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x3E: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `A, ${formatByteValue(bytes[i+1])}`,
    bytes: [0x3E, bytes[i+1]],
    size: 2,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x3F: () => ({ mnemonic: 'CCF', operands: '', bytes: [0x3F], size: 1, supportsIntel8080: true, supportsIntel8085: true }),

  // 4x row - Various register move instructions
  0x40: () => ({ mnemonic: 'LD', operands: 'B, B', bytes: [0x40], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x41: () => ({ mnemonic: 'LD', operands: 'B, C', bytes: [0x41], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x42: () => ({ mnemonic: 'LD', operands: 'B, D', bytes: [0x42], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x43: () => ({ mnemonic: 'LD', operands: 'B, E', bytes: [0x43], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x44: () => ({ mnemonic: 'LD', operands: 'B, H', bytes: [0x44], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x45: () => ({ mnemonic: 'LD', operands: 'B, L', bytes: [0x45], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x46: () => ({ mnemonic: 'LD', operands: 'B, (HL)', bytes: [0x46], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x47: () => ({ mnemonic: 'LD', operands: 'B, A', bytes: [0x47], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x48: () => ({ mnemonic: 'LD', operands: 'C, B', bytes: [0x48], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x49: () => ({ mnemonic: 'LD', operands: 'C, C', bytes: [0x49], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x4A: () => ({ mnemonic: 'LD', operands: 'C, D', bytes: [0x4A], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x4B: () => ({ mnemonic: 'LD', operands: 'C, E', bytes: [0x4B], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x4C: () => ({ mnemonic: 'LD', operands: 'C, H', bytes: [0x4C], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x4D: () => ({ mnemonic: 'LD', operands: 'C, L', bytes: [0x4D], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x4E: () => ({ mnemonic: 'LD', operands: 'C, (HL)', bytes: [0x4E], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x4F: () => ({ mnemonic: 'LD', operands: 'C, A', bytes: [0x4F], size: 1, supportsIntel8080: true, supportsIntel8085: true }),

  // 5x row
  0x50: () => ({ mnemonic: 'LD', operands: 'D, B', bytes: [0x50], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x51: () => ({ mnemonic: 'LD', operands: 'D, C', bytes: [0x51], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x52: () => ({ mnemonic: 'LD', operands: 'D, D', bytes: [0x52], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x53: () => ({ mnemonic: 'LD', operands: 'D, E', bytes: [0x53], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x54: () => ({ mnemonic: 'LD', operands: 'D, H', bytes: [0x54], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x55: () => ({ mnemonic: 'LD', operands: 'D, L', bytes: [0x55], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x56: () => ({ mnemonic: 'LD', operands: 'D, (HL)', bytes: [0x56], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x57: () => ({ mnemonic: 'LD', operands: 'D, A', bytes: [0x57], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x58: () => ({ mnemonic: 'LD', operands: 'E, B', bytes: [0x58], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x59: () => ({ mnemonic: 'LD', operands: 'E, C', bytes: [0x59], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x5A: () => ({ mnemonic: 'LD', operands: 'E, D', bytes: [0x5A], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x5B: () => ({ mnemonic: 'LD', operands: 'E, E', bytes: [0x5B], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x5C: () => ({ mnemonic: 'LD', operands: 'E, H', bytes: [0x5C], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x5D: () => ({ mnemonic: 'LD', operands: 'E, L', bytes: [0x5D], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x5E: () => ({ mnemonic: 'LD', operands: 'E, (HL)', bytes: [0x5E], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x5F: () => ({ mnemonic: 'LD', operands: 'E, A', bytes: [0x5F], size: 1, supportsIntel8080: true, supportsIntel8085: true }),

  // 6x row
  0x60: () => ({ mnemonic: 'LD', operands: 'H, B', bytes: [0x60], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x61: () => ({ mnemonic: 'LD', operands: 'H, C', bytes: [0x61], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x62: () => ({ mnemonic: 'LD', operands: 'H, D', bytes: [0x62], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x63: () => ({ mnemonic: 'LD', operands: 'H, E', bytes: [0x63], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x64: () => ({ mnemonic: 'LD', operands: 'H, H', bytes: [0x64], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x65: () => ({ mnemonic: 'LD', operands: 'H, L', bytes: [0x65], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x66: () => ({ mnemonic: 'LD', operands: 'H, (HL)', bytes: [0x66], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x67: () => ({ mnemonic: 'LD', operands: 'H, A', bytes: [0x67], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x68: () => ({ mnemonic: 'LD', operands: 'L, B', bytes: [0x68], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x69: () => ({ mnemonic: 'LD', operands: 'L, C', bytes: [0x69], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x6A: () => ({ mnemonic: 'LD', operands: 'L, D', bytes: [0x6A], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x6B: () => ({ mnemonic: 'LD', operands: 'L, E', bytes: [0x6B], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x6C: () => ({ mnemonic: 'LD', operands: 'L, H', bytes: [0x6C], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x6D: () => ({ mnemonic: 'LD', operands: 'L, L', bytes: [0x6D], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x6E: () => ({ mnemonic: 'LD', operands: 'L, (HL)', bytes: [0x6E], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x6F: () => ({ mnemonic: 'LD', operands: 'L, A', bytes: [0x6F], size: 1, supportsIntel8080: true, supportsIntel8085: true }),

  // 7x row
  0x70: () => ({ mnemonic: 'LD', operands: '(HL), B', bytes: [0x70], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x71: () => ({ mnemonic: 'LD', operands: '(HL), C', bytes: [0x71], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x72: () => ({ mnemonic: 'LD', operands: '(HL), D', bytes: [0x72], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x73: () => ({ mnemonic: 'LD', operands: '(HL), E', bytes: [0x73], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x74: () => ({ mnemonic: 'LD', operands: '(HL), H', bytes: [0x74], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x75: () => ({ mnemonic: 'LD', operands: '(HL), L', bytes: [0x75], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x76: () => ({ mnemonic: 'HALT', operands: '', bytes: [0x76], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x77: () => ({ mnemonic: 'LD', operands: '(HL), A', bytes: [0x77], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x78: () => ({ mnemonic: 'LD', operands: 'A, B', bytes: [0x78], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x79: () => ({ mnemonic: 'LD', operands: 'A, C', bytes: [0x79], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x7A: () => ({ mnemonic: 'LD', operands: 'A, D', bytes: [0x7A], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x7B: () => ({ mnemonic: 'LD', operands: 'A, E', bytes: [0x7B], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x7C: () => ({ mnemonic: 'LD', operands: 'A, H', bytes: [0x7C], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x7D: () => ({ mnemonic: 'LD', operands: 'A, L', bytes: [0x7D], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x7E: () => ({ mnemonic: 'LD', operands: 'A, (HL)', bytes: [0x7E], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x7F: () => ({ mnemonic: 'LD', operands: 'A, A', bytes: [0x7F], size: 1, supportsIntel8080: true, supportsIntel8085: true }),

  // 8x row - Arithmetic operations with register A
  0x80: () => ({ mnemonic: 'ADD', operands: 'A, B', bytes: [0x80], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x81: () => ({ mnemonic: 'ADD', operands: 'A, C', bytes: [0x81], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x82: () => ({ mnemonic: 'ADD', operands: 'A, D', bytes: [0x82], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x83: () => ({ mnemonic: 'ADD', operands: 'A, E', bytes: [0x83], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x84: () => ({ mnemonic: 'ADD', operands: 'A, H', bytes: [0x84], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x85: () => ({ mnemonic: 'ADD', operands: 'A, L', bytes: [0x85], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x86: () => ({ mnemonic: 'ADD', operands: 'A, (HL)', bytes: [0x86], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x87: () => ({ mnemonic: 'ADD', operands: 'A, A', bytes: [0x87], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x88: () => ({ mnemonic: 'ADC', operands: 'A, B', bytes: [0x88], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x89: () => ({ mnemonic: 'ADC', operands: 'A, C', bytes: [0x89], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x8A: () => ({ mnemonic: 'ADC', operands: 'A, D', bytes: [0x8A], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x8B: () => ({ mnemonic: 'ADC', operands: 'A, E', bytes: [0x8B], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x8C: () => ({ mnemonic: 'ADC', operands: 'A, H', bytes: [0x8C], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x8D: () => ({ mnemonic: 'ADC', operands: 'A, L', bytes: [0x8D], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x8E: () => ({ mnemonic: 'ADC', operands: 'A, (HL)', bytes: [0x8E], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x8F: () => ({ mnemonic: 'ADC', operands: 'A, A', bytes: [0x8F], size: 1, supportsIntel8080: true, supportsIntel8085: true }),

  // 9x row - Subtraction operations
  0x90: () => ({ mnemonic: 'SUB', operands: 'B', bytes: [0x90], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x91: () => ({ mnemonic: 'SUB', operands: 'C', bytes: [0x91], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x92: () => ({ mnemonic: 'SUB', operands: 'D', bytes: [0x92], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x93: () => ({ mnemonic: 'SUB', operands: 'E', bytes: [0x93], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x94: () => ({ mnemonic: 'SUB', operands: 'H', bytes: [0x94], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x95: () => ({ mnemonic: 'SUB', operands: 'L', bytes: [0x95], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x96: () => ({ mnemonic: 'SUB', operands: '(HL)', bytes: [0x96], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x97: () => ({ mnemonic: 'SUB', operands: 'A', bytes: [0x97], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x98: () => ({ mnemonic: 'SBC', operands: 'A, B', bytes: [0x98], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x99: () => ({ mnemonic: 'SBC', operands: 'A, C', bytes: [0x99], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x9A: () => ({ mnemonic: 'SBC', operands: 'A, D', bytes: [0x9A], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x9B: () => ({ mnemonic: 'SBC', operands: 'A, E', bytes: [0x9B], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x9C: () => ({ mnemonic: 'SBC', operands: 'A, H', bytes: [0x9C], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x9D: () => ({ mnemonic: 'SBC', operands: 'A, L', bytes: [0x9D], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x9E: () => ({ mnemonic: 'SBC', operands: 'A, (HL)', bytes: [0x9E], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x9F: () => ({ mnemonic: 'SBC', operands: 'A, A', bytes: [0x9F], size: 1, supportsIntel8080: true, supportsIntel8085: true }),

  // Ax row - Logical AND operations
  0xA0: () => ({ mnemonic: 'AND', operands: 'B', bytes: [0xA0], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xA1: () => ({ mnemonic: 'AND', operands: 'C', bytes: [0xA1], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xA2: () => ({ mnemonic: 'AND', operands: 'D', bytes: [0xA2], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xA3: () => ({ mnemonic: 'AND', operands: 'E', bytes: [0xA3], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xA4: () => ({ mnemonic: 'AND', operands: 'H', bytes: [0xA4], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xA5: () => ({ mnemonic: 'AND', operands: 'L', bytes: [0xA5], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xA6: () => ({ mnemonic: 'AND', operands: '(HL)', bytes: [0xA6], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xA7: () => ({ mnemonic: 'AND', operands: 'A', bytes: [0xA7], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xA8: () => ({ mnemonic: 'XOR', operands: 'B', bytes: [0xA8], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xA9: () => ({ mnemonic: 'XOR', operands: 'C', bytes: [0xA9], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xAA: () => ({ mnemonic: 'XOR', operands: 'D', bytes: [0xAA], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xAB: () => ({ mnemonic: 'XOR', operands: 'E', bytes: [0xAB], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xAC: () => ({ mnemonic: 'XOR', operands: 'H', bytes: [0xAC], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xAD: () => ({ mnemonic: 'XOR', operands: 'L', bytes: [0xAD], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xAE: () => ({ mnemonic: 'XOR', operands: '(HL)', bytes: [0xAE], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xAF: () => ({ mnemonic: 'XOR', operands: 'A', bytes: [0xAF], size: 1, supportsIntel8080: true, supportsIntel8085: true }),

  // Bx row - Logical OR operations
  0xB0: () => ({ mnemonic: 'OR', operands: 'B', bytes: [0xB0], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xB1: () => ({ mnemonic: 'OR', operands: 'C', bytes: [0xB1], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xB2: () => ({ mnemonic: 'OR', operands: 'D', bytes: [0xB2], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xB3: () => ({ mnemonic: 'OR', operands: 'E', bytes: [0xB3], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xB4: () => ({ mnemonic: 'OR', operands: 'H', bytes: [0xB4], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xB5: () => ({ mnemonic: 'OR', operands: 'L', bytes: [0xB5], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xB6: () => ({ mnemonic: 'OR', operands: '(HL)', bytes: [0xB6], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xB7: () => ({ mnemonic: 'OR', operands: 'A', bytes: [0xB7], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xB8: () => ({ mnemonic: 'CP', operands: 'B', bytes: [0xB8], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xB9: () => ({ mnemonic: 'CP', operands: 'C', bytes: [0xB9], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xBA: () => ({ mnemonic: 'CP', operands: 'D', bytes: [0xBA], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xBB: () => ({ mnemonic: 'CP', operands: 'E', bytes: [0xBB], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xBC: () => ({ mnemonic: 'CP', operands: 'H', bytes: [0xBC], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xBD: () => ({ mnemonic: 'CP', operands: 'L', bytes: [0xBD], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xBE: () => ({ mnemonic: 'CP', operands: '(HL)', bytes: [0xBE], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xBF: () => ({ mnemonic: 'CP', operands: 'A', bytes: [0xBF], size: 1, supportsIntel8080: true, supportsIntel8085: true }),

  // Cx row - Conditional RET and various control instructions
  0xC0: () => ({ mnemonic: 'RET', operands: 'NZ', bytes: [0xC0], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xC1: () => ({ mnemonic: 'POP', operands: 'BC', bytes: [0xC1], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xC2: (bytes, i) => {
    const addr = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `NZ, ${formatHex(addr, 4)}h`,
      bytes: [0xC2, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress: addr,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0xC3: (bytes, i) => {
    const addr = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `${formatHex(addr, 4)}h`,
      bytes: [0xC3, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress: addr,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0xC4: (bytes, i) => {
    const addr = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `NZ, ${formatHex(addr, 4)}h`,
      bytes: [0xC4, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress: addr,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0xC5: () => ({ mnemonic: 'PUSH', operands: 'BC', bytes: [0xC5], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xC6: (bytes, i) => ({
    mnemonic: 'ADD',
    operands: `A, ${formatByteValue(bytes[i+1])}`,
    bytes: [0xC6, bytes[i+1]],
    size: 2,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xC7: () => ({
    mnemonic: 'RST',
    operands: '00h',
    bytes: [0xC7],
    size: 1,
    targetAddress: 0x0000,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xC8: () => ({ mnemonic: 'RET', operands: 'Z', bytes: [0xC8], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xC9: () => ({ mnemonic: 'RET', operands: '', bytes: [0xC9], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xCA: (bytes, i) => {
    const addr = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `Z, ${formatHex(addr, 4)}h`,
      bytes: [0xCA, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress: addr,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0xCB: () => ({
    mnemonic: 'CB',
    operands: 'PREFIX',
    bytes: [0xCB],
    size: 1,
    comment: 'CB prefix for bit instructions (handled separately)',
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  0xCC: (bytes, i) => {
    const addr = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `Z, ${formatHex(addr, 4)}h`,
      bytes: [0xCC, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress: addr,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0xCD: (bytes, i) => {
    const addr = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `${formatHex(addr, 4)}h`,
      bytes: [0xCD, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress: addr,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0xCE: (bytes, i) => ({
    mnemonic: 'ADC',
    operands: `A, ${formatByteValue(bytes[i+1])}`,
    bytes: [0xCE, bytes[i+1]],
    size: 2,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xCF: () => ({
    mnemonic: 'RST',
    operands: '08h',
    bytes: [0xCF],
    size: 1,
    targetAddress: 0x0008,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),

  // Dx row
  0xD0: () => ({ mnemonic: 'RET', operands: 'NC', bytes: [0xD0], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xD1: () => ({ mnemonic: 'POP', operands: 'DE', bytes: [0xD1], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xD2: (bytes, i) => {
    const addr = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `NC, ${formatHex(addr, 4)}h`,
      bytes: [0xD2, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress: addr,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0xD3: (bytes, i) => ({
    mnemonic: 'OUT',
    operands: `(${formatByteValue(bytes[i+1])}), A`,
    bytes: [0xD3, bytes[i+1]],
    size: 2,
    isIOOperation: true,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xD4: (bytes, i) => {
    const addr = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `NC, ${formatHex(addr, 4)}h`,
      bytes: [0xD4, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress: addr,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0xD5: () => ({ mnemonic: 'PUSH', operands: 'DE', bytes: [0xD5], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xD6: (bytes, i) => ({
    mnemonic: 'SUB',
    operands: `${formatByteValue(bytes[i+1])}`,
    bytes: [0xD6, bytes[i+1]],
    size: 2,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xD7: () => ({
    mnemonic: 'RST',
    operands: '10h',
    bytes: [0xD7],
    size: 1,
    targetAddress: 0x0010,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xD8: () => ({ mnemonic: 'RET', operands: 'C', bytes: [0xD8], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xD9: () => ({ mnemonic: 'EXX', operands: '', bytes: [0xD9], size: 1, supportsIntel8080: false, supportsIntel8085: false }),
  0xDA: (bytes, i) => {
    const addr = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `C, ${formatHex(addr, 4)}h`,
      bytes: [0xDA, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress: addr,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0xDB: (bytes, i) => ({
    mnemonic: 'IN',
    operands: `A, (${formatByteValue(bytes[i+1])})`,
    bytes: [0xDB, bytes[i+1]],
    size: 2,
    isIOOperation: true,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xDC: (bytes, i) => {
    const addr = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `C, ${formatHex(addr, 4)}h`,
      bytes: [0xDC, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress: addr,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0xDD: () => ({
    mnemonic: 'DD',
    operands: 'PREFIX',
    bytes: [0xDD],
    size: 1,
    comment: 'DD prefix for IX instructions (handled separately)',
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  0xDE: (bytes, i) => ({
    mnemonic: 'SBC',
    operands: `A, ${formatByteValue(bytes[i+1])}`,
    bytes: [0xDE, bytes[i+1]],
    size: 2,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xDF: () => ({
    mnemonic: 'RST',
    operands: '18h',
    bytes: [0xDF],
    size: 1,
    targetAddress: 0x0018,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),

  // Ex row
  0xE0: () => ({ mnemonic: 'RET', operands: 'PO', bytes: [0xE0], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xE1: () => ({ mnemonic: 'POP', operands: 'HL', bytes: [0xE1], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xE2: (bytes, i) => {
    const addr = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `PO, ${formatHex(addr, 4)}h`,
      bytes: [0xE2, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress: addr,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0xE3: () => ({ mnemonic: 'EX', operands: '(SP), HL', bytes: [0xE3], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xE4: (bytes, i) => {
    const addr = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `PO, ${formatHex(addr, 4)}h`,
      bytes: [0xE4, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress: addr,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0xE5: () => ({ mnemonic: 'PUSH', operands: 'HL', bytes: [0xE5], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xE6: (bytes, i) => ({
    mnemonic: 'AND',
    operands: `${formatByteValue(bytes[i+1])}`,
    bytes: [0xE6, bytes[i+1]],
    size: 2,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xE7: () => ({
    mnemonic: 'RST',
    operands: '20h',
    bytes: [0xE7],
    size: 1,
    targetAddress: 0x0020,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xE8: () => ({ mnemonic: 'RET', operands: 'PE', bytes: [0xE8], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xE9: () => ({ mnemonic: 'JP', operands: '(HL)', bytes: [0xE9], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xEA: (bytes, i) => {
    const addr = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `PE, ${formatHex(addr, 4)}h`,
      bytes: [0xEA, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress: addr,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0xEB: () => ({ mnemonic: 'EX', operands: 'DE, HL', bytes: [0xEB], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xEC: (bytes, i) => {
    const addr = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `PE, ${formatHex(addr, 4)}h`,
      bytes: [0xEC, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress: addr,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0xED: () => ({
    mnemonic: 'ED',
    operands: 'PREFIX',
    bytes: [0xED],
    size: 1,
    comment: 'ED prefix for extended instructions (handled separately)',
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  0xEE: (bytes, i) => ({
    mnemonic: 'XOR',
    operands: `${formatByteValue(bytes[i+1])}`,
    bytes: [0xEE, bytes[i+1]],
    size: 2,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xEF: () => ({
    mnemonic: 'RST',
    operands: '28h',
    bytes: [0xEF],
    size: 1,
    targetAddress: 0x0028,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),

  // Fx row
  0xF0: () => ({ mnemonic: 'RET', operands: 'P', bytes: [0xF0], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xF1: () => ({ mnemonic: 'POP', operands: 'AF', bytes: [0xF1], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xF2: (bytes, i) => {
    const addr = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `P, ${formatHex(addr, 4)}h`,
      bytes: [0xF2, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress: addr,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0xF3: () => ({ mnemonic: 'DI', operands: '', bytes: [0xF3], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xF4: (bytes, i) => {
    const addr = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `P, ${formatHex(addr, 4)}h`,
      bytes: [0xF4, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress: addr,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0xF5: () => ({ mnemonic: 'PUSH', operands: 'AF', bytes: [0xF5], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xF6: (bytes, i) => ({
    mnemonic: 'OR',
    operands: `${formatByteValue(bytes[i+1])}`,
    bytes: [0xF6, bytes[i+1]],
    size: 2,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xF7: () => ({
    mnemonic: 'RST',
    operands: '30h',
    bytes: [0xF7],
    size: 1,
    targetAddress: 0x0030,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xF8: () => ({ mnemonic: 'RET', operands: 'M', bytes: [0xF8], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xF9: () => ({ mnemonic: 'LD', operands: 'SP, HL', bytes: [0xF9], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xFA: (bytes, i) => {
    const addr = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `M, ${formatHex(addr, 4)}h`,
      bytes: [0xFA, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress: addr,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0xFB: () => ({ mnemonic: 'EI', operands: '', bytes: [0xFB], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xFC: (bytes, i) => {
    const addr = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `M, ${formatHex(addr, 4)}h`,
      bytes: [0xFC, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress: addr,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0xFD: () => ({
    mnemonic: 'FD',
    operands: 'PREFIX',
    bytes: [0xFD],
    size: 1,
    comment: 'FD prefix for IY instructions (handled separately)',
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  0xFE: (bytes, i) => ({
    mnemonic: 'CP',
    operands: `${formatByteValue(bytes[i+1])}`,
    bytes: [0xFE, bytes[i+1]],
    size: 2,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xFF: () => ({
    mnemonic: 'RST',
    operands: '38h',
    bytes: [0xFF],
    size: 1,
    targetAddress: 0x0038,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
};
