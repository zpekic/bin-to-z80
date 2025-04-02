
import { OpcodeHandler } from '../types';
import { formatByteValue, formatWordValue } from '../formatters';

/**
 * Intel 8085 Opcodes
 * Based on the official Intel 8085 instruction set
 * Reference: Intel 8085 instruction set documentation
 */

export const INTEL_8085_OPCODES: Record<number, OpcodeHandler> = {
  // 0x00 - 0x0F
  0x00: () => ({ mnemonic: 'NOP', operands: '', bytes: [0x00], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0x01: (bytes, i) => {
    const value = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'LXI', 
      operands: `B, ${formatWordValue(value)}`, 
      bytes: [0x01, bytes[i+1], bytes[i+2]], 
      size: 3,
      comment: 'Load immediate value to BC',
      supportsIntel8080: true, 
      supportsIntel8085: true
    };
  },
  0x02: () => ({ mnemonic: 'STAX', operands: 'B', bytes: [0x02], size: 1, comment: 'Store A in memory, address in BC', supportsIntel8080: true, supportsIntel8085: true }),
  0x03: () => ({ mnemonic: 'INX', operands: 'B', bytes: [0x03], size: 1, comment: 'Increment BC', supportsIntel8080: true, supportsIntel8085: true }),
  0x04: () => ({ mnemonic: 'INR', operands: 'B', bytes: [0x04], size: 1, comment: 'Increment B', supportsIntel8080: true, supportsIntel8085: true }),
  0x05: () => ({ mnemonic: 'DCR', operands: 'B', bytes: [0x05], size: 1, comment: 'Decrement B', supportsIntel8080: true, supportsIntel8085: true }),
  0x06: (bytes, i) => ({
    mnemonic: 'MVI', 
    operands: `B, ${formatByteValue(bytes[i+1])}`, 
    bytes: [0x06, bytes[i+1]], 
    size: 2,
    comment: 'Move immediate to B',
    supportsIntel8080: true, 
    supportsIntel8085: true
  }),
  0x07: () => ({ mnemonic: 'RLC', operands: '', bytes: [0x07], size: 1, comment: 'Rotate A left', supportsIntel8080: true, supportsIntel8085: true }),
  // 0x08 is not used in 8080 but is EX AF,AF' in Z80
  0x09: () => ({ mnemonic: 'DAD', operands: 'B', bytes: [0x09], size: 1, comment: 'Add BC to HL', supportsIntel8080: true, supportsIntel8085: true }),
  0x0A: () => ({ mnemonic: 'LDAX', operands: 'B', bytes: [0x0A], size: 1, comment: 'Load A from address in BC', supportsIntel8080: true, supportsIntel8085: true }),
  0x0B: () => ({ mnemonic: 'DCX', operands: 'B', bytes: [0x0B], size: 1, comment: 'Decrement BC', supportsIntel8080: true, supportsIntel8085: true }),
  0x0C: () => ({ mnemonic: 'INR', operands: 'C', bytes: [0x0C], size: 1, comment: 'Increment C', supportsIntel8080: true, supportsIntel8085: true }),
  0x0D: () => ({ mnemonic: 'DCR', operands: 'C', bytes: [0x0D], size: 1, comment: 'Decrement C', supportsIntel8080: true, supportsIntel8085: true }),
  0x0E: (bytes, i) => ({
    mnemonic: 'MVI', 
    operands: `C, ${formatByteValue(bytes[i+1])}`, 
    bytes: [0x0E, bytes[i+1]], 
    size: 2,
    comment: 'Move immediate to C',
    supportsIntel8080: true, 
    supportsIntel8085: true
  }),
  0x0F: () => ({ mnemonic: 'RRC', operands: '', bytes: [0x0F], size: 1, comment: 'Rotate A right', supportsIntel8080: true, supportsIntel8085: true }),

  // 0x10 - 0x1F
  // 0x10 is DJNZ in Z80 but not used in 8085
  0x11: (bytes, i) => {
    const value = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'LXI', 
      operands: `D, ${formatWordValue(value)}`, 
      bytes: [0x11, bytes[i+1], bytes[i+2]], 
      size: 3,
      comment: 'Load immediate value to DE',
      supportsIntel8080: true, 
      supportsIntel8085: true
    };
  },
  0x12: () => ({ mnemonic: 'STAX', operands: 'D', bytes: [0x12], size: 1, comment: 'Store A in memory, address in DE', supportsIntel8080: true, supportsIntel8085: true }),
  0x13: () => ({ mnemonic: 'INX', operands: 'D', bytes: [0x13], size: 1, comment: 'Increment DE', supportsIntel8080: true, supportsIntel8085: true }),
  0x14: () => ({ mnemonic: 'INR', operands: 'D', bytes: [0x14], size: 1, comment: 'Increment D', supportsIntel8080: true, supportsIntel8085: true }),
  0x15: () => ({ mnemonic: 'DCR', operands: 'D', bytes: [0x15], size: 1, comment: 'Decrement D', supportsIntel8080: true, supportsIntel8085: true }),
  0x16: (bytes, i) => ({
    mnemonic: 'MVI', 
    operands: `D, ${formatByteValue(bytes[i+1])}`, 
    bytes: [0x16, bytes[i+1]], 
    size: 2,
    comment: 'Move immediate to D',
    supportsIntel8080: true, 
    supportsIntel8085: true
  }),
  0x17: () => ({ mnemonic: 'RAL', operands: '', bytes: [0x17], size: 1, comment: 'Rotate A left through carry', supportsIntel8080: true, supportsIntel8085: true }),
  // 0x18 is JR in Z80 but not used in 8085
  0x19: () => ({ mnemonic: 'DAD', operands: 'D', bytes: [0x19], size: 1, comment: 'Add DE to HL', supportsIntel8080: true, supportsIntel8085: true }),
  0x1A: () => ({ mnemonic: 'LDAX', operands: 'D', bytes: [0x1A], size: 1, comment: 'Load A from address in DE', supportsIntel8080: true, supportsIntel8085: true }),
  0x1B: () => ({ mnemonic: 'DCX', operands: 'D', bytes: [0x1B], size: 1, comment: 'Decrement DE', supportsIntel8080: true, supportsIntel8085: true }),
  0x1C: () => ({ mnemonic: 'INR', operands: 'E', bytes: [0x1C], size: 1, comment: 'Increment E', supportsIntel8080: true, supportsIntel8085: true }),
  0x1D: () => ({ mnemonic: 'DCR', operands: 'E', bytes: [0x1D], size: 1, comment: 'Decrement E', supportsIntel8080: true, supportsIntel8085: true }),
  0x1E: (bytes, i) => ({
    mnemonic: 'MVI', 
    operands: `E, ${formatByteValue(bytes[i+1])}`, 
    bytes: [0x1E, bytes[i+1]], 
    size: 2,
    comment: 'Move immediate to E',
    supportsIntel8080: true, 
    supportsIntel8085: true
  }),
  0x1F: () => ({ mnemonic: 'RAR', operands: '', bytes: [0x1F], size: 1, comment: 'Rotate A right through carry', supportsIntel8080: true, supportsIntel8085: true }),

  // 0x20 - 0x2F
  0x20: () => ({ mnemonic: 'RIM', operands: '', bytes: [0x20], size: 1, comment: 'Read Interrupt Mask (8085 only)', supportsIntel8080: false, supportsIntel8085: true }),
  0x21: (bytes, i) => {
    const value = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'LXI', 
      operands: `H, ${formatWordValue(value)}`, 
      bytes: [0x21, bytes[i+1], bytes[i+2]], 
      size: 3,
      comment: 'Load immediate value to HL',
      supportsIntel8080: true, 
      supportsIntel8085: true
    };
  },
  0x22: (bytes, i) => {
    const value = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'SHLD', 
      operands: formatWordValue(value), 
      bytes: [0x22, bytes[i+1], bytes[i+2]], 
      size: 3,
      comment: 'Store HL direct',
      supportsIntel8080: true, 
      supportsIntel8085: true,
      targetAddress: value
    };
  },
  0x23: () => ({ mnemonic: 'INX', operands: 'H', bytes: [0x23], size: 1, comment: 'Increment HL', supportsIntel8080: true, supportsIntel8085: true }),
  0x24: () => ({ mnemonic: 'INR', operands: 'H', bytes: [0x24], size: 1, comment: 'Increment H', supportsIntel8080: true, supportsIntel8085: true }),
  0x25: () => ({ mnemonic: 'DCR', operands: 'H', bytes: [0x25], size: 1, comment: 'Decrement H', supportsIntel8080: true, supportsIntel8085: true }),
  0x26: (bytes, i) => ({
    mnemonic: 'MVI', 
    operands: `H, ${formatByteValue(bytes[i+1])}`, 
    bytes: [0x26, bytes[i+1]], 
    size: 2,
    comment: 'Move immediate to H',
    supportsIntel8080: true, 
    supportsIntel8085: true
  }),
  0x27: () => ({ mnemonic: 'DAA', operands: '', bytes: [0x27], size: 1, comment: 'Decimal adjust A', supportsIntel8080: true, supportsIntel8085: true }),
  0x28: () => ({ mnemonic: 'NOP', operands: '', bytes: [0x28], size: 1, comment: 'No operation (undocumented)', supportsIntel8080: false, supportsIntel8085: true }),
  0x29: () => ({ mnemonic: 'DAD', operands: 'H', bytes: [0x29], size: 1, comment: 'Add HL to HL', supportsIntel8080: true, supportsIntel8085: true }),
  0x2A: (bytes, i) => {
    const value = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'LHLD', 
      operands: formatWordValue(value), 
      bytes: [0x2A, bytes[i+1], bytes[i+2]], 
      size: 3,
      comment: 'Load HL direct',
      supportsIntel8080: true, 
      supportsIntel8085: true,
      targetAddress: value
    };
  },
  0x2B: () => ({ mnemonic: 'DCX', operands: 'H', bytes: [0x2B], size: 1, comment: 'Decrement HL', supportsIntel8080: true, supportsIntel8085: true }),
  0x2C: () => ({ mnemonic: 'INR', operands: 'L', bytes: [0x2C], size: 1, comment: 'Increment L', supportsIntel8080: true, supportsIntel8085: true }),
  0x2D: () => ({ mnemonic: 'DCR', operands: 'L', bytes: [0x2D], size: 1, comment: 'Decrement L', supportsIntel8080: true, supportsIntel8085: true }),
  0x2E: (bytes, i) => ({
    mnemonic: 'MVI', 
    operands: `L, ${formatByteValue(bytes[i+1])}`, 
    bytes: [0x2E, bytes[i+1]], 
    size: 2,
    comment: 'Move immediate to L',
    supportsIntel8080: true, 
    supportsIntel8085: true
  }),
  0x2F: () => ({ mnemonic: 'CMA', operands: '', bytes: [0x2F], size: 1, comment: 'Complement A', supportsIntel8080: true, supportsIntel8085: true }),

  // 0x30 - 0x3F
  0x30: () => ({ mnemonic: 'SIM', operands: '', bytes: [0x30], size: 1, comment: 'Set Interrupt Mask (8085 only)', supportsIntel8080: false, supportsIntel8085: true }),
  0x31: (bytes, i) => {
    const value = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'LXI', 
      operands: `SP, ${formatWordValue(value)}`, 
      bytes: [0x31, bytes[i+1], bytes[i+2]], 
      size: 3,
      comment: 'Load immediate to stack pointer',
      supportsIntel8080: true, 
      supportsIntel8085: true
    };
  },
  0x32: (bytes, i) => {
    const value = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'STA', 
      operands: formatWordValue(value), 
      bytes: [0x32, bytes[i+1], bytes[i+2]], 
      size: 3,
      comment: 'Store A direct',
      supportsIntel8080: true, 
      supportsIntel8085: true,
      targetAddress: value
    };
  },
  0x33: () => ({ mnemonic: 'INX', operands: 'SP', bytes: [0x33], size: 1, comment: 'Increment stack pointer', supportsIntel8080: true, supportsIntel8085: true }),
  0x34: () => ({ mnemonic: 'INR', operands: 'M', bytes: [0x34], size: 1, comment: 'Increment memory (HL)', supportsIntel8080: true, supportsIntel8085: true }),
  0x35: () => ({ mnemonic: 'DCR', operands: 'M', bytes: [0x35], size: 1, comment: 'Decrement memory (HL)', supportsIntel8080: true, supportsIntel8085: true }),
  0x36: (bytes, i) => ({
    mnemonic: 'MVI', 
    operands: `M, ${formatByteValue(bytes[i+1])}`, 
    bytes: [0x36, bytes[i+1]], 
    size: 2,
    comment: 'Move immediate to memory (HL)',
    supportsIntel8080: true, 
    supportsIntel8085: true
  }),
  0x37: () => ({ mnemonic: 'STC', operands: '', bytes: [0x37], size: 1, comment: 'Set carry flag', supportsIntel8080: true, supportsIntel8085: true }),
  0x38: () => ({ mnemonic: 'NOP', operands: '', bytes: [0x38], size: 1, comment: 'No operation (undocumented)', supportsIntel8080: false, supportsIntel8085: true }),
  0x39: () => ({ mnemonic: 'DAD', operands: 'SP', bytes: [0x39], size: 1, comment: 'Add stack pointer to HL', supportsIntel8080: true, supportsIntel8085: true }),
  0x3A: (bytes, i) => {
    const value = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'LDA', 
      operands: formatWordValue(value), 
      bytes: [0x3A, bytes[i+1], bytes[i+2]], 
      size: 3,
      comment: 'Load A direct',
      supportsIntel8080: true, 
      supportsIntel8085: true,
      targetAddress: value
    };
  },
  0x3B: () => ({ mnemonic: 'DCX', operands: 'SP', bytes: [0x3B], size: 1, comment: 'Decrement stack pointer', supportsIntel8080: true, supportsIntel8085: true }),
  0x3C: () => ({ mnemonic: 'INR', operands: 'A', bytes: [0x3C], size: 1, comment: 'Increment A', supportsIntel8080: true, supportsIntel8085: true }),
  0x3D: () => ({ mnemonic: 'DCR', operands: 'A', bytes: [0x3D], size: 1, comment: 'Decrement A', supportsIntel8080: true, supportsIntel8085: true }),
  0x3E: (bytes, i) => ({
    mnemonic: 'MVI', 
    operands: `A, ${formatByteValue(bytes[i+1])}`, 
    bytes: [0x3E, bytes[i+1]], 
    size: 2,
    comment: 'Move immediate to A',
    supportsIntel8080: true, 
    supportsIntel8085: true
  }),
  0x3F: () => ({ mnemonic: 'CMC', operands: '', bytes: [0x3F], size: 1, comment: 'Complement carry flag', supportsIntel8080: true, supportsIntel8085: true }),

  // 0x40 - 0x7F (MOV instructions)
  // Just listing a few of the important ones as representatives
  0x40: () => ({ mnemonic: 'MOV', operands: 'B, B', bytes: [0x40], size: 1, comment: 'Move B to B', supportsIntel8080: true, supportsIntel8085: true }),
  // ... many more MOV instructions ...
  0x76: () => ({ mnemonic: 'HLT', operands: '', bytes: [0x76], size: 1, comment: 'Halt', supportsIntel8080: true, supportsIntel8085: true }),
  0x77: () => ({ mnemonic: 'MOV', operands: 'M, A', bytes: [0x77], size: 1, comment: 'Move A to memory (HL)', supportsIntel8080: true, supportsIntel8085: true }),
  0x7F: () => ({ mnemonic: 'MOV', operands: 'A, A', bytes: [0x7F], size: 1, comment: 'Move A to A', supportsIntel8080: true, supportsIntel8085: true }),

  // 0x80 - 0x8F (Add instructions)
  0x80: () => ({ mnemonic: 'ADD', operands: 'B', bytes: [0x80], size: 1, comment: 'Add B to A', supportsIntel8080: true, supportsIntel8085: true }),
  // ... more ADD and ADC instructions ...
  0x87: () => ({ mnemonic: 'ADD', operands: 'A', bytes: [0x87], size: 1, comment: 'Add A to A', supportsIntel8080: true, supportsIntel8085: true }),
  0x8F: () => ({ mnemonic: 'ADC', operands: 'A', bytes: [0x8F], size: 1, comment: 'Add A to A with carry', supportsIntel8080: true, supportsIntel8085: true }),

  // 0x90 - 0x9F (Subtract instructions)
  0x90: () => ({ mnemonic: 'SUB', operands: 'B', bytes: [0x90], size: 1, comment: 'Subtract B from A', supportsIntel8080: true, supportsIntel8085: true }),
  // ... more SUB and SBB instructions ...
  0x97: () => ({ mnemonic: 'SUB', operands: 'A', bytes: [0x97], size: 1, comment: 'Subtract A from A', supportsIntel8080: true, supportsIntel8085: true }),
  0x9F: () => ({ mnemonic: 'SBB', operands: 'A', bytes: [0x9F], size: 1, comment: 'Subtract A from A with borrow', supportsIntel8080: true, supportsIntel8085: true }),

  // 0xA0 - 0xAF (Logical AND instructions)
  0xA0: () => ({ mnemonic: 'ANA', operands: 'B', bytes: [0xA0], size: 1, comment: 'AND B with A', supportsIntel8080: true, supportsIntel8085: true }),
  // ... more ANA and XRA instructions ...
  0xA7: () => ({ mnemonic: 'ANA', operands: 'A', bytes: [0xA7], size: 1, comment: 'AND A with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xAF: () => ({ mnemonic: 'XRA', operands: 'A', bytes: [0xAF], size: 1, comment: 'XOR A with A', supportsIntel8080: true, supportsIntel8085: true }),
  
  // 0xB0 - 0xBF (Logical OR and Compare instructions)
  0xB0: () => ({ mnemonic: 'ORA', operands: 'B', bytes: [0xB0], size: 1, comment: 'OR B with A', supportsIntel8080: true, supportsIntel8085: true }),
  // ... more ORA and CMP instructions ...
  0xB7: () => ({ mnemonic: 'ORA', operands: 'A', bytes: [0xB7], size: 1, comment: 'OR A with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xBF: () => ({ mnemonic: 'CMP', operands: 'A', bytes: [0xBF], size: 1, comment: 'Compare A with A', supportsIntel8080: true, supportsIntel8085: true }),

  // 0xC0 - 0xFF (Stack, Call, Return, and more)
  // Selected important 8085 instructions from this range
  0xC0: () => ({ mnemonic: 'RNZ', operands: '', bytes: [0xC0], size: 1, comment: 'Return if not zero', supportsIntel8080: true, supportsIntel8085: true }),
  0xC3: (bytes, i) => {
    const value = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'JMP', 
      operands: formatWordValue(value), 
      bytes: [0xC3, bytes[i+1], bytes[i+2]], 
      size: 3,
      comment: 'Jump unconditional',
      supportsIntel8080: true, 
      supportsIntel8085: true,
      targetAddress: value
    };
  },
  0xC9: () => ({ mnemonic: 'RET', operands: '', bytes: [0xC9], size: 1, comment: 'Return', supportsIntel8080: true, supportsIntel8085: true }),
  0xCD: (bytes, i) => {
    const value = bytes[i+1] | (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL', 
      operands: formatWordValue(value), 
      bytes: [0xCD, bytes[i+1], bytes[i+2]], 
      size: 3,
      comment: 'Call subroutine',
      supportsIntel8080: true, 
      supportsIntel8085: true,
      targetAddress: value
    };
  },
  0xD3: (bytes, i) => ({
    mnemonic: 'OUT', 
    operands: formatByteValue(bytes[i+1]), 
    bytes: [0xD3, bytes[i+1]], 
    size: 2,
    comment: 'Output to port',
    supportsIntel8080: true, 
    supportsIntel8085: true,
    isIOOperation: true
  }),
  0xDB: (bytes, i) => ({
    mnemonic: 'IN', 
    operands: formatByteValue(bytes[i+1]), 
    bytes: [0xDB, bytes[i+1]], 
    size: 2,
    comment: 'Input from port',
    supportsIntel8080: true, 
    supportsIntel8085: true,
    isIOOperation: true
  }),
  0xF3: () => ({ mnemonic: 'DI', operands: '', bytes: [0xF3], size: 1, comment: 'Disable interrupts', supportsIntel8080: true, supportsIntel8085: true }),
  0xFB: () => ({ mnemonic: 'EI', operands: '', bytes: [0xFB], size: 1, comment: 'Enable interrupts', supportsIntel8080: true, supportsIntel8085: true }),
  
  // Special 8085-only instructions
  // Based on the image, 0x20 and 0x30 are already defined above as RIM and SIM
  // Some other undocumented/special 8085 instructions can be added here
  0x08: () => ({ mnemonic: 'DSUB', operands: '', bytes: [0x08], size: 1, comment: 'Double subtract (BC from HL) (undocumented)', supportsIntel8080: false, supportsIntel8085: true }),
  0x10: () => ({ mnemonic: 'ARHL', operands: '', bytes: [0x10], size: 1, comment: 'Arithmetic shift right HL (undocumented)', supportsIntel8080: false, supportsIntel8085: true }),
  0x18: () => ({ mnemonic: 'RDEL', operands: '', bytes: [0x18], size: 1, comment: 'Rotate DE left through carry (undocumented)', supportsIntel8080: false, supportsIntel8085: true }),
  0xD9: () => ({ mnemonic: 'SHLX', operands: '', bytes: [0xD9], size: 1, comment: 'Store H and L indirect (undocumented)', supportsIntel8080: false, supportsIntel8085: true }),
};

export default INTEL_8085_OPCODES;
