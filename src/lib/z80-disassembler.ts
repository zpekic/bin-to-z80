
// Z80 disassembler implementation
// This is a simplified version - a real implementation would be more comprehensive

// Define instruction types
type Z80Instruction = {
  mnemonic: string;
  operands: string;
  bytes: number[];
  size: number;
  comment?: string;
  address?: number;
  targetAddress?: number;
};

// Helper function to convert printable ASCII bytes to character representation
const formatByteValue = (byteValue: number): string => {
  // Check if the byte is in the printable ASCII range (0x20 to 0x7F)
  if (byteValue >= 0x20 && byteValue <= 0x7F) {
    return `${byteValue}h '${String.fromCharCode(byteValue)}'`;
  }
  // Otherwise, just return the hex value
  return `${byteValue}h`;
};

// Simple Z80 instruction set (subset for demonstration)
const Z80_OPCODES: Record<number, (bytes: Uint8Array, index: number) => Z80Instruction> = {
  // Original opcodes
  0x00: () => ({ mnemonic: 'NOP', operands: '', bytes: [0x00], size: 1 }),
  0x01: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `BC, ${bytes[i+1] + (bytes[i+2] << 8)}h`,
    bytes: [0x01, bytes[i+1], bytes[i+2]],
    size: 3
  }),
  0x03: () => ({ mnemonic: 'INC', operands: 'BC', bytes: [0x03], size: 1 }),
  0x04: () => ({ mnemonic: 'INC', operands: 'B', bytes: [0x04], size: 1 }),
  0x05: () => ({ mnemonic: 'DEC', operands: 'B', bytes: [0x05], size: 1 }),
  0x06: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `B, ${formatByteValue(bytes[i+1])}`,
    bytes: [0x06, bytes[i+1]],
    size: 2
  }),
  0x0A: () => ({ mnemonic: 'LD', operands: 'A, (BC)', bytes: [0x0A], size: 1 }),
  0x0E: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `C, ${formatByteValue(bytes[i+1])}`,
    bytes: [0x0E, bytes[i+1]],
    size: 2
  }),
  0x11: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `DE, ${bytes[i+1] + (bytes[i+2] << 8)}h`,
    bytes: [0x11, bytes[i+1], bytes[i+2]],
    size: 3
  }),
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
  0x21: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `HL, ${bytes[i+1] + (bytes[i+2] << 8)}h`,
    bytes: [0x21, bytes[i+1], bytes[i+2]],
    size: 3
  }),
  0x3E: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `A, ${formatByteValue(bytes[i+1])}`,
    bytes: [0x3E, bytes[i+1]],
    size: 2
  }),
  0x76: () => ({ mnemonic: 'HALT', operands: '', bytes: [0x76], size: 1 }),
  0xC3: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `${targetAddress}h`,
      bytes: [0xC3, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress
    };
  },
  0xC9: () => ({ mnemonic: 'RET', operands: '', bytes: [0xC9], size: 1 }),
  0xCD: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `${targetAddress}h`,
      bytes: [0xCD, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress
    };
  },
  
  // Additional opcodes
  0x02: () => ({ mnemonic: 'LD', operands: '(BC), A', bytes: [0x02], size: 1 }),
  0x07: () => ({ mnemonic: 'RLCA', operands: '', bytes: [0x07], size: 1 }),
  0x08: () => ({ mnemonic: 'EX', operands: 'AF, AF\'', bytes: [0x08], size: 1 }),
  0x09: () => ({ mnemonic: 'ADD', operands: 'HL, BC', bytes: [0x09], size: 1 }),
  0x0C: () => ({ mnemonic: 'INC', operands: 'C', bytes: [0x0C], size: 1 }),
  0x0D: () => ({ mnemonic: 'DEC', operands: 'C', bytes: [0x0D], size: 1 }),
  0x0F: () => ({ mnemonic: 'RRCA', operands: '', bytes: [0x0F], size: 1 }),
  
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
  0x22: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `(${bytes[i+1] + (bytes[i+2] << 8)}h), HL`,
    bytes: [0x22, bytes[i+1], bytes[i+2]],
    size: 3
  }),
  0x23: () => ({ mnemonic: 'INC', operands: 'HL', bytes: [0x23], size: 1 }),
  0x24: () => ({ mnemonic: 'INC', operands: 'H', bytes: [0x24], size: 1 }),
  0x25: () => ({ mnemonic: 'DEC', operands: 'H', bytes: [0x25], size: 1 }),
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
  0x29: () => ({ mnemonic: 'ADD', operands: 'HL, HL', bytes: [0x29], size: 1 }),
  0x2A: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `HL, (${bytes[i+1] + (bytes[i+2] << 8)}h)`,
    bytes: [0x2A, bytes[i+1], bytes[i+2]],
    size: 3
  }),
  0x2B: () => ({ mnemonic: 'DEC', operands: 'HL', bytes: [0x2B], size: 1 }),
  0x2C: () => ({ mnemonic: 'INC', operands: 'L', bytes: [0x2C], size: 1 }),
  0x2D: () => ({ mnemonic: 'DEC', operands: 'L', bytes: [0x2D], size: 1 }),
  0x2E: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `L, ${formatByteValue(bytes[i+1])}`,
    bytes: [0x2E, bytes[i+1]],
    size: 2
  }),
  
  // 8-bit arithmetic & logical group
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
  0x31: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `SP, ${bytes[i+1] + (bytes[i+2] << 8)}h`,
    bytes: [0x31, bytes[i+1], bytes[i+2]],
    size: 3
  }),
  0x32: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `(${bytes[i+1] + (bytes[i+2] << 8)}h), A`,
    bytes: [0x32, bytes[i+1], bytes[i+2]],
    size: 3
  }),
  0x33: () => ({ mnemonic: 'INC', operands: 'SP', bytes: [0x33], size: 1 }),
  0x34: () => ({ mnemonic: 'INC', operands: '(HL)', bytes: [0x34], size: 1 }),
  0x35: () => ({ mnemonic: 'DEC', operands: '(HL)', bytes: [0x35], size: 1 }),
  0x36: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `(HL), ${formatByteValue(bytes[i+1])}`,
    bytes: [0x36, bytes[i+1]],
    size: 2
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
  0x39: () => ({ mnemonic: 'ADD', operands: 'HL, SP', bytes: [0x39], size: 1 }),
  0x3A: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `A, (${bytes[i+1] + (bytes[i+2] << 8)}h)`,
    bytes: [0x3A, bytes[i+1], bytes[i+2]],
    size: 3
  }),
  0x3B: () => ({ mnemonic: 'DEC', operands: 'SP', bytes: [0x3B], size: 1 }),
  0x3C: () => ({ mnemonic: 'INC', operands: 'A', bytes: [0x3C], size: 1 }),
  0x3D: () => ({ mnemonic: 'DEC', operands: 'A', bytes: [0x3D], size: 1 }),
  
  // Register-Register operations
  0x40: () => ({ mnemonic: 'LD', operands: 'B, B', bytes: [0x40], size: 1 }),
  0x41: () => ({ mnemonic: 'LD', operands: 'B, C', bytes: [0x41], size: 1 }),
  0x42: () => ({ mnemonic: 'LD', operands: 'B, D', bytes: [0x42], size: 1 }),
  0x43: () => ({ mnemonic: 'LD', operands: 'B, E', bytes: [0x43], size: 1 }),
  0x44: () => ({ mnemonic: 'LD', operands: 'B, H', bytes: [0x44], size: 1 }),
  0x45: () => ({ mnemonic: 'LD', operands: 'B, L', bytes: [0x45], size: 1 }),
  0x46: () => ({ mnemonic: 'LD', operands: 'B, (HL)', bytes: [0x46], size: 1 }),
  0x47: () => ({ mnemonic: 'LD', operands: 'B, A', bytes: [0x47], size: 1 }),
  
  0x48: () => ({ mnemonic: 'LD', operands: 'C, B', bytes: [0x48], size: 1 }),
  0x49: () => ({ mnemonic: 'LD', operands: 'C, C', bytes: [0x49], size: 1 }),
  0x4A: () => ({ mnemonic: 'LD', operands: 'C, D', bytes: [0x4A], size: 1 }),
  0x4B: () => ({ mnemonic: 'LD', operands: 'C, E', bytes: [0x4B], size: 1 }),
  0x4C: () => ({ mnemonic: 'LD', operands: 'C, H', bytes: [0x4C], size: 1 }),
  0x4D: () => ({ mnemonic: 'LD', operands: 'C, L', bytes: [0x4D], size: 1 }),
  0x4E: () => ({ mnemonic: 'LD', operands: 'C, (HL)', bytes: [0x4E], size: 1 }),
  0x4F: () => ({ mnemonic: 'LD', operands: 'C, A', bytes: [0x4F], size: 1 }),
  
  // Arithmetic operations
  0x80: () => ({ mnemonic: 'ADD', operands: 'A, B', bytes: [0x80], size: 1 }),
  0x81: () => ({ mnemonic: 'ADD', operands: 'A, C', bytes: [0x81], size: 1 }),
  0x82: () => ({ mnemonic: 'ADD', operands: 'A, D', bytes: [0x82], size: 1 }),
  0x83: () => ({ mnemonic: 'ADD', operands: 'A, E', bytes: [0x83], size: 1 }),
  0x84: () => ({ mnemonic: 'ADD', operands: 'A, H', bytes: [0x84], size: 1 }),
  0x85: () => ({ mnemonic: 'ADD', operands: 'A, L', bytes: [0x85], size: 1 }),
  0x86: () => ({ mnemonic: 'ADD', operands: 'A, (HL)', bytes: [0x86], size: 1 }),
  0x87: () => ({ mnemonic: 'ADD', operands: 'A, A', bytes: [0x87], size: 1 }),
  
  0x90: () => ({ mnemonic: 'SUB', operands: 'B', bytes: [0x90], size: 1 }),
  0x91: () => ({ mnemonic: 'SUB', operands: 'C', bytes: [0x91], size: 1 }),
  0x92: () => ({ mnemonic: 'SUB', operands: 'D', bytes: [0x92], size: 1 }),
  0x93: () => ({ mnemonic: 'SUB', operands: 'E', bytes: [0x93], size: 1 }),
  0x94: () => ({ mnemonic: 'SUB', operands: 'H', bytes: [0x94], size: 1 }),
  0x95: () => ({ mnemonic: 'SUB', operands: 'L', bytes: [0x95], size: 1 }),
  0x96: () => ({ mnemonic: 'SUB', operands: '(HL)', bytes: [0x96], size: 1 }),
  0x97: () => ({ mnemonic: 'SUB', operands: 'A', bytes: [0x97], size: 1 }),
  
  0xA0: () => ({ mnemonic: 'AND', operands: 'B', bytes: [0xA0], size: 1 }),
  0xA1: () => ({ mnemonic: 'AND', operands: 'C', bytes: [0xA1], size: 1 }),
  0xA2: () => ({ mnemonic: 'AND', operands: 'D', bytes: [0xA2], size: 1 }),
  0xA3: () => ({ mnemonic: 'AND', operands: 'E', bytes: [0xA3], size: 1 }),
  0xA4: () => ({ mnemonic: 'AND', operands: 'H', bytes: [0xA4], size: 1 }),
  0xA5: () => ({ mnemonic: 'AND', operands: 'L', bytes: [0xA5], size: 1 }),
  0xA6: () => ({ mnemonic: 'AND', operands: '(HL)', bytes: [0xA6], size: 1 }),
  0xA7: () => ({ mnemonic: 'AND', operands: 'A', bytes: [0xA7], size: 1 }),
  
  0xB0: () => ({ mnemonic: 'OR', operands: 'B', bytes: [0xB0], size: 1 }),
  0xB1: () => ({ mnemonic: 'OR', operands: 'C', bytes: [0xB1], size: 1 }),
  0xB2: () => ({ mnemonic: 'OR', operands: 'D', bytes: [0xB2], size: 1 }),
  0xB3: () => ({ mnemonic: 'OR', operands: 'E', bytes: [0xB3], size: 1 }),
  0xB4: () => ({ mnemonic: 'OR', operands: 'H', bytes: [0xB4], size: 1 }),
  0xB5: () => ({ mnemonic: 'OR', operands: 'L', bytes: [0xB5], size: 1 }),
  0xB6: () => ({ mnemonic: 'OR', operands: '(HL)', bytes: [0xB6], size: 1 }),
  0xB7: () => ({ mnemonic: 'OR', operands: 'A', bytes: [0xB7], size: 1 }),
  
  // Conditional Return instructions
  0xC0: () => ({ mnemonic: 'RET', operands: 'NZ', bytes: [0xC0], size: 1 }),
  0xC1: () => ({ mnemonic: 'POP', operands: 'BC', bytes: [0xC1], size: 1 }),
  0xC2: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `NZ, ${targetAddress}h`,
      bytes: [0xC2, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress
    };
  },
  0xC4: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `NZ, ${targetAddress}h`,
      bytes: [0xC4, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress
    };
  },
  0xC5: () => ({ mnemonic: 'PUSH', operands: 'BC', bytes: [0xC5], size: 1 }),
  0xC6: (bytes, i) => ({
    mnemonic: 'ADD',
    operands: `A, ${formatByteValue(bytes[i+1])}`,
    bytes: [0xC6, bytes[i+1]],
    size: 2
  }),
  0xC8: () => ({ mnemonic: 'RET', operands: 'Z', bytes: [0xC8], size: 1 }),
  0xCA: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `Z, ${targetAddress}h`,
      bytes: [0xCA, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress
    };
  },
  0xCC: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `Z, ${targetAddress}h`,
      bytes: [0xCC, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress
    };
  },
  0xCE: (bytes, i) => ({
    mnemonic: 'ADC',
    operands: `A, ${formatByteValue(bytes[i+1])}`,
    bytes: [0xCE, bytes[i+1]],
    size: 2
  }),
  
  // More conditional instructions
  0xD0: () => ({ mnemonic: 'RET', operands: 'NC', bytes: [0xD0], size: 1 }),
  0xD1: () => ({ mnemonic: 'POP', operands: 'DE', bytes: [0xD1], size: 1 }),
  0xD2: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `NC, ${targetAddress}h`,
      bytes: [0xD2, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress
    };
  },
  0xD3: (bytes, i) => ({
    mnemonic: 'OUT',
    operands: `(${bytes[i+1]}h), A`,
    bytes: [0xD3, bytes[i+1]],
    size: 2
  }),
  0xD4: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `NC, ${targetAddress}h`,
      bytes: [0xD4, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress
    };
  },
  0xD5: () => ({ mnemonic: 'PUSH', operands: 'DE', bytes: [0xD5], size: 1 }),
  0xD6: (bytes, i) => ({
    mnemonic: 'SUB',
    operands: `${formatByteValue(bytes[i+1])}`,
    bytes: [0xD6, bytes[i+1]],
    size: 2
  }),
  0xD8: () => ({ mnemonic: 'RET', operands: 'C', bytes: [0xD8], size: 1 }),
  0xD9: () => ({ mnemonic: 'EXX', operands: '', bytes: [0xD9], size: 1 }),
  0xDA: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `C, ${targetAddress}h`,
      bytes: [0xDA, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress
    };
  },
  0xDB: (bytes, i) => ({
    mnemonic: 'IN',
    operands: `A, (${bytes[i+1]}h)`,
    bytes: [0xDB, bytes[i+1]],
    size: 2
  }),
  0xDC: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `C, ${targetAddress}h`,
      bytes: [0xDC, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress
    };
  },
  
  // Stack and miscellaneous
  0xE0: () => ({ mnemonic: 'RET', operands: 'PO', bytes: [0xE0], size: 1 }),
  0xE1: () => ({ mnemonic: 'POP', operands: 'HL', bytes: [0xE1], size: 1 }),
  0xE3: () => ({ mnemonic: 'EX', operands: '(SP), HL', bytes: [0xE3], size: 1 }),
  0xE5: () => ({ mnemonic: 'PUSH', operands: 'HL', bytes: [0xE5], size: 1 }),
  0xE6: (bytes, i) => ({
    mnemonic: 'AND',
    operands: `${formatByteValue(bytes[i+1])}`,
    bytes: [0xE6, bytes[i+1]],
    size: 2
  }),
  0xE9: () => ({ mnemonic: 'JP', operands: '(HL)', bytes: [0xE9], size: 1 }),
  0xEB: () => ({ mnemonic: 'EX', operands: 'DE, HL', bytes: [0xEB], size: 1 }),
  0xEE: (bytes, i) => ({
    mnemonic: 'XOR',
    operands: `${formatByteValue(bytes[i+1])}`,
    bytes: [0xEE, bytes[i+1]],
    size: 2
  }),
  
  0xF0: () => ({ mnemonic: 'RET', operands: 'P', bytes: [0xF0], size: 1 }),
  0xF1: () => ({ mnemonic: 'POP', operands: 'AF', bytes: [0xF1], size: 1 }),
  0xF3: () => ({ mnemonic: 'DI', operands: '', bytes: [0xF3], size: 1 }),
  0xF5: () => ({ mnemonic: 'PUSH', operands: 'AF', bytes: [0xF5], size: 1 }),
  0xF6: (bytes, i) => ({
    mnemonic: 'OR',
    operands: `${formatByteValue(bytes[i+1])}`,
    bytes: [0xF6, bytes[i+1]],
    size: 2
  }),
  0xF9: () => ({ mnemonic: 'LD', operands: 'SP, HL', bytes: [0xF9], size: 1 }),
  0xFB: () => ({ mnemonic: 'EI', operands: '', bytes: [0xFB], size: 1 }),
  0xFE: (bytes, i) => ({
    mnemonic: 'CP',
    operands: `${formatByteValue(bytes[i+1])}`,
    bytes: [0xFE, bytes[i+1]],
    size: 2
  }),
};

// Format a number as hexadecimal with padding
export const formatHex = (num: number, pad: number): string => {
  return num.toString(16).toUpperCase().padStart(pad, '0');
};

// Convert binary data to array of bytes
export const bytesToHexString = (bytes: number[]): string => {
  return bytes.map(byte => formatHex(byte, 2)).join(' ');
};

// Generate a label for an address
const generateLabel = (address: number): string => {
  return `L_${formatHex(address, 4)}`;
};

// Check if an address is within a given range
const isAddressInRange = (address: number, start: number, end: number): boolean => {
  return address >= start && address <= end;
};

// Find all jump and call destinations in the code
const findLabelAddresses = (disassembly: {
  address: number;
  instruction: Z80Instruction;
}[]): Set<number> => {
  const labelAddresses = new Set<number>();
  
  for (const { instruction } of disassembly) {
    if (instruction.targetAddress !== undefined) {
      labelAddresses.add(instruction.targetAddress);
    }
  }
  
  return labelAddresses;
};

// Create a mapping of addresses to labels
const createLabelMap = (labelAddresses: Set<number>): Map<number, string> => {
  const labelMap = new Map<number, string>();
  
  labelAddresses.forEach(address => {
    labelMap.set(address, generateLabel(address));
  });
  
  return labelMap;
};

// Disassemble a binary file
export const disassembleBinary = (binary: Uint8Array, origin = 0): {
  address: number;
  instruction: Z80Instruction;
}[] => {
  const result: { address: number; instruction: Z80Instruction }[] = [];
  let index = 0;

  // First pass - basic disassembly
  while (index < binary.length) {
    const opcode = binary[index];
    const handler = Z80_OPCODES[opcode];
    
    if (handler) {
      const instruction = handler(binary, index);
      // Store the absolute address
      instruction.address = origin + index;
      // Adjust targetAddress if it exists to be absolute
      if (instruction.targetAddress !== undefined) {
        instruction.targetAddress = origin + instruction.targetAddress;
      }
      
      result.push({
        address: origin + index,
        instruction
      });
      index += instruction.size;
    } else {
      // Unknown opcode, treat as data byte
      result.push({
        address: origin + index,
        instruction: {
          mnemonic: 'DB',
          operands: `${formatHex(opcode, 2)}h`,
          bytes: [opcode],
          size: 1,
          comment: 'Unknown opcode',
          address: origin + index
        }
      });
      index += 1;
    }
  }

  // Create label map
  const labelAddresses = findLabelAddresses(result);
  const labelMap = createLabelMap(labelAddresses);
  
  // Second pass - update operands for labels
  for (const item of result) {
    const { instruction } = item;
    
    // Only update operands for instructions that have targetAddress
    if (instruction.targetAddress !== undefined) {
      const targetAddress = instruction.targetAddress;
      const label = labelMap.get(targetAddress);
      
      // Check if this target has a label and it's within our disassembly range
      if (label && isAddressInRange(targetAddress, origin, origin + binary.length - 1)) {
        // Replace the hex address with the label in the operands
        const hexAddress = `${targetAddress}h`;
        if (instruction.operands.includes(hexAddress)) {
          instruction.operands = instruction.operands.replace(hexAddress, label);
        }
      }
    }
  }
  
  return result;
};
