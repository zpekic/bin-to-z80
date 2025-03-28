
import { OpcodeHandler } from '../types';
import { formatByteValue, format16BitHex } from '../formatters';

// Basic Z80 opcodes (0x00-0x3F)
export const BASIC_OPCODES: Record<number, OpcodeHandler> = {
  // No operation
  0x00: () => ({ mnemonic: 'NOP', operands: '', bytes: [0x00], size: 1 }),
  
  // 16-bit load immediate
  0x01: (bytes, i) => {
    const value = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'LD',
      operands: `BC, ${format16BitHex(value)}`,
      bytes: [0x01, bytes[i+1], bytes[i+2]],
      size: 3
    };
  },
  
  // 8-bit register operations
  0x02: () => ({ mnemonic: 'LD', operands: '(BC), A', bytes: [0x02], size: 1 }),
  0x03: () => ({ mnemonic: 'INC', operands: 'BC', bytes: [0x03], size: 1 }),
  0x04: () => ({ mnemonic: 'INC', operands: 'B', bytes: [0x04], size: 1 }),
  0x05: () => ({ mnemonic: 'DEC', operands: 'B', bytes: [0x05], size: 1 }),
  0x06: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `B, ${formatByteValue(bytes[i+1])}`,
    bytes: [0x06, bytes[i+1]],
    size: 2
  }),
  0x07: () => ({ mnemonic: 'RLCA', operands: '', bytes: [0x07], size: 1 }),
  0x08: () => ({ mnemonic: 'EX', operands: 'AF, AF\'', bytes: [0x08], size: 1 }),
  0x09: () => ({ mnemonic: 'ADD', operands: 'HL, BC', bytes: [0x09], size: 1 }),
  0x0A: () => ({ mnemonic: 'LD', operands: 'A, (BC)', bytes: [0x0A], size: 1 }),
  0x0C: () => ({ mnemonic: 'INC', operands: 'C', bytes: [0x0C], size: 1 }),
  0x0D: () => ({ mnemonic: 'DEC', operands: 'C', bytes: [0x0D], size: 1 }),
  0x0E: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `C, ${formatByteValue(bytes[i+1])}`,
    bytes: [0x0E, bytes[i+1]],
    size: 2
  }),
  0x0F: () => ({ mnemonic: 'RRCA', operands: '', bytes: [0x0F], size: 1 }),
  
  // More 16-bit operations
  0x11: (bytes, i) => {
    const value = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'LD',
      operands: `DE, ${format16BitHex(value)}`,
      bytes: [0x11, bytes[i+1], bytes[i+2]],
      size: 3
    };
  },
  0x12: () => ({ mnemonic: 'LD', operands: '(DE), A', bytes: [0x12], size: 1 }),
  0x13: () => ({ mnemonic: 'INC', operands: 'DE', bytes: [0x13], size: 1 }),
  0x14: () => ({ mnemonic: 'INC', operands: 'D', bytes: [0x14], size: 1 }),
  0x15: () => ({ mnemonic: 'DEC', operands: 'D', bytes: [0x15], size: 1 }),
  0x16: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `D, ${formatByteValue(bytes[i+1])}`,
    bytes: [0x16, bytes[i+1]],
    size: 2
  }),
  0x17: () => ({ mnemonic: 'RLA', operands: '', bytes: [0x17], size: 1 }),
  0x18: (bytes, i) => {
    const offset = bytes[i+1];
    const targetAddress = (i + 2 + ((offset & 0x80) ? (offset - 256) : offset)) & 0xFFFF;
    return {
      mnemonic: 'JR',
      operands: `${(offset & 0x80) ? '-' : '+'}${offset & 0x7F}`,
      bytes: [0x18, offset],
      size: 2,
      targetAddress
    };
  },
  0x19: () => ({ mnemonic: 'ADD', operands: 'HL, DE', bytes: [0x19], size: 1 }),
  0x1A: () => ({ mnemonic: 'LD', operands: 'A, (DE)', bytes: [0x1A], size: 1 }),
  0x1B: () => ({ mnemonic: 'DEC', operands: 'DE', bytes: [0x1B], size: 1 }),
  0x1C: () => ({ mnemonic: 'INC', operands: 'E', bytes: [0x1C], size: 1 }),
  0x1D: () => ({ mnemonic: 'DEC', operands: 'E', bytes: [0x1D], size: 1 }),
  0x1E: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `E, ${formatByteValue(bytes[i+1])}`,
    bytes: [0x1E, bytes[i+1]],
    size: 2
  }),
  0x1F: () => ({ mnemonic: 'RRA', operands: '', bytes: [0x1F], size: 1 }),
  
  // Conditional jumps and loads
  0x20: (bytes, i) => {
    const offset = bytes[i+1];
    const targetAddress = (i + 2 + ((offset & 0x80) ? (offset - 256) : offset)) & 0xFFFF;
    return {
      mnemonic: 'JR',
      operands: `NZ, ${(offset & 0x80) ? '-' : '+'}${offset & 0x7F}`,
      bytes: [0x20, offset],
      size: 2,
      targetAddress
    };
  },
  0x21: (bytes, i) => {
    const value = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'LD',
      operands: `HL, ${format16BitHex(value)}`,
      bytes: [0x21, bytes[i+1], bytes[i+2]],
      size: 3
    };
  },
  0x22: (bytes, i) => {
    const value = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'LD',
      operands: `(${format16BitHex(value)}), HL`,
      bytes: [0x22, bytes[i+1], bytes[i+2]],
      size: 3
    };
  },
  0x23: () => ({ 
    mnemonic: 'INC', 
    operands: 'HL', 
    bytes: [0x23], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x23)}' (#)`
  }),
  0x24: () => ({ 
    mnemonic: 'INC', 
    operands: 'H', 
    bytes: [0x24], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x24)}' ($)`
  }),
  0x25: () => ({ 
    mnemonic: 'DEC', 
    operands: 'H', 
    bytes: [0x25], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x25)}' (%)`
  }),
  0x26: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `H, ${formatByteValue(bytes[i+1])}`,
    bytes: [0x26, bytes[i+1]],
    size: 2
  }),
  0x28: (bytes, i) => {
    const offset = bytes[i+1];
    const targetAddress = (i + 2 + ((offset & 0x80) ? (offset - 256) : offset)) & 0xFFFF;
    return {
      mnemonic: 'JR',
      operands: `Z, ${(offset & 0x80) ? '-' : '+'}${offset & 0x7F}`,
      bytes: [0x28, offset],
      size: 2,
      targetAddress
    };
  },
  0x29: () => ({ 
    mnemonic: 'ADD', 
    operands: 'HL, HL', 
    bytes: [0x29], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x29)}' ())`
  }),
  0x2A: (bytes, i) => {
    const value = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'LD',
      operands: `HL, (${format16BitHex(value)})`,
      bytes: [0x2A, bytes[i+1], bytes[i+2]],
      size: 3
    };
  },
  0x2B: () => ({ 
    mnemonic: 'DEC', 
    operands: 'HL', 
    bytes: [0x2B], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x2B)}' (+)`
  }),
  0x2C: () => ({ 
    mnemonic: 'INC', 
    operands: 'L', 
    bytes: [0x2C], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x2C)}' (,)`
  }),
  0x2D: () => ({ 
    mnemonic: 'DEC', 
    operands: 'L', 
    bytes: [0x2D], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x2D)}' (-)`
  }),
  0x2E: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `L, ${formatByteValue(bytes[i+1])}`,
    bytes: [0x2E, bytes[i+1]],
    size: 2
  }),

  // More conditional jumps and loads
  0x30: (bytes, i) => {
    const offset = bytes[i+1];
    const targetAddress = (i + 2 + ((offset & 0x80) ? (offset - 256) : offset)) & 0xFFFF;
    return {
      mnemonic: 'JR',
      operands: `NC, ${(offset & 0x80) ? '-' : '+'}${offset & 0x7F}`,
      bytes: [0x30, offset],
      size: 2,
      targetAddress
    };
  },
  0x31: (bytes, i) => {
    const value = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'LD',
      operands: `SP, ${format16BitHex(value)}`,
      bytes: [0x31, bytes[i+1], bytes[i+2]],
      size: 3
    };
  },
  0x32: (bytes, i) => {
    const value = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'LD',
      operands: `(${format16BitHex(value)}), A`,
      bytes: [0x32, bytes[i+1], bytes[i+2]],
      size: 3
    };
  },
  0x33: () => ({ 
    mnemonic: 'INC', 
    operands: 'SP', 
    bytes: [0x33], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x33)}' (3)`
  }),
  0x34: () => ({ 
    mnemonic: 'INC', 
    operands: '(HL)', 
    bytes: [0x34], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x34)}' (4)`
  }),
  0x35: () => ({ 
    mnemonic: 'DEC', 
    operands: '(HL)', 
    bytes: [0x35], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x35)}' (5)`
  }),
  0x36: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `(HL), ${formatByteValue(bytes[i+1])}`,
    bytes: [0x36, bytes[i+1]],
    size: 2
  }),
  0x37: () => ({ 
    mnemonic: 'SCF', 
    operands: '', 
    bytes: [0x37], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x37)}' (7)`
  }),
  0x38: (bytes, i) => {
    const offset = bytes[i+1];
    const targetAddress = (i + 2 + ((offset & 0x80) ? (offset - 256) : offset)) & 0xFFFF;
    return {
      mnemonic: 'JR',
      operands: `C, ${(offset & 0x80) ? '-' : '+'}${offset & 0x7F}`,
      bytes: [0x38, offset],
      size: 2,
      targetAddress
    };
  },
  0x39: () => ({ 
    mnemonic: 'ADD', 
    operands: 'HL, SP', 
    bytes: [0x39], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x39)}' (9)`
  }),
  0x3A: (bytes, i) => {
    const value = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'LD',
      operands: `A, (${format16BitHex(value)})`,
      bytes: [0x3A, bytes[i+1], bytes[i+2]],
      size: 3
    };
  },
  0x3B: () => ({ 
    mnemonic: 'DEC', 
    operands: 'SP', 
    bytes: [0x3B], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x3B)}' (;)`
  }),
  0x3C: () => ({ 
    mnemonic: 'INC', 
    operands: 'A', 
    bytes: [0x3C], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x3C)}' (<)`
  }),
  0x3D: () => ({ 
    mnemonic: 'DEC', 
    operands: 'A', 
    bytes: [0x3D], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x3D)}' (=)`
  }),
  0x3E: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `A, ${formatByteValue(bytes[i+1])}`,
    bytes: [0x3E, bytes[i+1]],
    size: 2
  }),
  0x3F: () => ({ 
    mnemonic: 'CCF', 
    operands: '', 
    bytes: [0x3F], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x3F)}' (?)`
  }),
};
