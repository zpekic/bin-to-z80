
import { OpcodeHandler } from '../types';
import { formatByteValue } from '../formatters';

/**
 * Intel 8080 Opcodes
 * Based on the complete instruction set from the reference image
 * This replaces the old placeholder file
 */

const INTEL_8080_OPCODES: Record<number, OpcodeHandler> = {
  // 0x00-0x0F
  0x00: () => ({ mnemonic: 'NOP', operands: '', bytes: [0x00], size: 1, comment: '8080: No operation', supportsIntel8080: true, supportsIntel8085: true }),
  0x01: (bytes, i) => ({ mnemonic: 'LXI', operands: `B,${formatByteValue(bytes[i+2])}${formatByteValue(bytes[i+1])}`, bytes: [0x01, bytes[i+1], bytes[i+2]], size: 3, comment: '8080: Load immediate register pair B & C', supportsIntel8080: true, supportsIntel8085: true }),
  0x02: () => ({ mnemonic: 'STAX', operands: 'B', bytes: [0x02], size: 1, comment: '8080: Store A indirect', supportsIntel8080: true, supportsIntel8085: true }),
  0x03: () => ({ mnemonic: 'INX', operands: 'B', bytes: [0x03], size: 1, comment: '8080: Increment register pair B & C', supportsIntel8080: true, supportsIntel8085: true }),
  0x04: () => ({ mnemonic: 'INR', operands: 'B', bytes: [0x04], size: 1, comment: '8080: Increment register B', supportsIntel8080: true, supportsIntel8085: true }),
  0x05: () => ({ mnemonic: 'DCR', operands: 'B', bytes: [0x05], size: 1, comment: '8080: Decrement register B', supportsIntel8080: true, supportsIntel8085: true }),
  0x06: (bytes, i) => ({ mnemonic: 'MVI', operands: `B,${formatByteValue(bytes[i+1])}`, bytes: [0x06, bytes[i+1]], size: 2, comment: '8080: Move immediate to register B', supportsIntel8080: true, supportsIntel8085: true }),
  0x07: () => ({ mnemonic: 'RLC', operands: '', bytes: [0x07], size: 1, comment: '8080: Rotate A left', supportsIntel8080: true, supportsIntel8085: true }),
  
  0x09: () => ({ mnemonic: 'DAD', operands: 'B', bytes: [0x09], size: 1, comment: '8080: Add B & C to H & L', supportsIntel8080: true, supportsIntel8085: true }),
  0x0A: () => ({ mnemonic: 'LDAX', operands: 'B', bytes: [0x0A], size: 1, comment: '8080: Load A indirect', supportsIntel8080: true, supportsIntel8085: true }),
  0x0B: () => ({ mnemonic: 'DCX', operands: 'B', bytes: [0x0B], size: 1, comment: '8080: Decrement register pair B & C', supportsIntel8080: true, supportsIntel8085: true }),
  0x0C: () => ({ mnemonic: 'INR', operands: 'C', bytes: [0x0C], size: 1, comment: '8080: Increment register C', supportsIntel8080: true, supportsIntel8085: true }),
  0x0D: () => ({ mnemonic: 'DCR', operands: 'C', bytes: [0x0D], size: 1, comment: '8080: Decrement register C', supportsIntel8080: true, supportsIntel8085: true }),
  0x0E: (bytes, i) => ({ mnemonic: 'MVI', operands: `C,${formatByteValue(bytes[i+1])}`, bytes: [0x0E, bytes[i+1]], size: 2, comment: '8080: Move immediate to register C', supportsIntel8080: true, supportsIntel8085: true }),
  0x0F: () => ({ mnemonic: 'RRC', operands: '', bytes: [0x0F], size: 1, comment: '8080: Rotate A right', supportsIntel8080: true, supportsIntel8085: true }),
  
  // 0x10-0x1F
  0x11: (bytes, i) => ({ mnemonic: 'LXI', operands: `D,${formatByteValue(bytes[i+2])}${formatByteValue(bytes[i+1])}`, bytes: [0x11, bytes[i+1], bytes[i+2]], size: 3, comment: '8080: Load immediate register pair D & E', supportsIntel8080: true, supportsIntel8085: true }),
  0x12: () => ({ mnemonic: 'STAX', operands: 'D', bytes: [0x12], size: 1, comment: '8080: Store A indirect', supportsIntel8080: true, supportsIntel8085: true }),
  0x13: () => ({ mnemonic: 'INX', operands: 'D', bytes: [0x13], size: 1, comment: '8080: Increment register pair D & E', supportsIntel8080: true, supportsIntel8085: true }),
  0x14: () => ({ mnemonic: 'INR', operands: 'D', bytes: [0x14], size: 1, comment: '8080: Increment register D', supportsIntel8080: true, supportsIntel8085: true }),
  0x15: () => ({ mnemonic: 'DCR', operands: 'D', bytes: [0x15], size: 1, comment: '8080: Decrement register D', supportsIntel8080: true, supportsIntel8085: true }),
  0x16: (bytes, i) => ({ mnemonic: 'MVI', operands: `D,${formatByteValue(bytes[i+1])}`, bytes: [0x16, bytes[i+1]], size: 2, comment: '8080: Move immediate to register D', supportsIntel8080: true, supportsIntel8085: true }),
  0x17: () => ({ mnemonic: 'RAL', operands: '', bytes: [0x17], size: 1, comment: '8080: Rotate A left through carry', supportsIntel8080: true, supportsIntel8085: true }),
  
  0x19: () => ({ mnemonic: 'DAD', operands: 'D', bytes: [0x19], size: 1, comment: '8080: Add D & E to H & L', supportsIntel8080: true, supportsIntel8085: true }),
  0x1A: () => ({ mnemonic: 'LDAX', operands: 'D', bytes: [0x1A], size: 1, comment: '8080: Load A indirect', supportsIntel8080: true, supportsIntel8085: true }),
  0x1B: () => ({ mnemonic: 'DCX', operands: 'D', bytes: [0x1B], size: 1, comment: '8080: Decrement register pair D & E', supportsIntel8080: true, supportsIntel8085: true }),
  0x1C: () => ({ mnemonic: 'INR', operands: 'E', bytes: [0x1C], size: 1, comment: '8080: Increment register E', supportsIntel8080: true, supportsIntel8085: true }),
  0x1D: () => ({ mnemonic: 'DCR', operands: 'E', bytes: [0x1D], size: 1, comment: '8080: Decrement register E', supportsIntel8080: true, supportsIntel8085: true }),
  0x1E: (bytes, i) => ({ mnemonic: 'MVI', operands: `E,${formatByteValue(bytes[i+1])}`, bytes: [0x1E, bytes[i+1]], size: 2, comment: '8080: Move immediate to register E', supportsIntel8080: true, supportsIntel8085: true }),
  0x1F: () => ({ mnemonic: 'RAR', operands: '', bytes: [0x1F], size: 1, comment: '8080: Rotate A right through carry', supportsIntel8080: true, supportsIntel8085: true }),
  
  // 0x20-0x2F
  0x21: (bytes, i) => ({ mnemonic: 'LXI', operands: `H,${formatByteValue(bytes[i+2])}${formatByteValue(bytes[i+1])}`, bytes: [0x21, bytes[i+1], bytes[i+2]], size: 3, comment: '8080: Load immediate register pair H & L', supportsIntel8080: true, supportsIntel8085: true }),
  0x22: (bytes, i) => ({ mnemonic: 'SHLD', operands: `${formatByteValue(bytes[i+2])}${formatByteValue(bytes[i+1])}`, bytes: [0x22, bytes[i+1], bytes[i+2]], size: 3, comment: '8080: Store H & L direct', supportsIntel8080: true, supportsIntel8085: true }),
  0x23: () => ({ mnemonic: 'INX', operands: 'H', bytes: [0x23], size: 1, comment: '8080: Increment register pair H & L', supportsIntel8080: true, supportsIntel8085: true }),
  0x24: () => ({ mnemonic: 'INR', operands: 'H', bytes: [0x24], size: 1, comment: '8080: Increment register H', supportsIntel8080: true, supportsIntel8085: true }),
  0x25: () => ({ mnemonic: 'DCR', operands: 'H', bytes: [0x25], size: 1, comment: '8080: Decrement register H', supportsIntel8080: true, supportsIntel8085: true }),
  0x26: (bytes, i) => ({ mnemonic: 'MVI', operands: `H,${formatByteValue(bytes[i+1])}`, bytes: [0x26, bytes[i+1]], size: 2, comment: '8080: Move immediate to register H', supportsIntel8080: true, supportsIntel8085: true }),
  0x27: () => ({ mnemonic: 'DAA', operands: '', bytes: [0x27], size: 1, comment: '8080: Decimal adjust accumulator', supportsIntel8080: true, supportsIntel8085: true }),
  
  0x29: () => ({ mnemonic: 'DAD', operands: 'H', bytes: [0x29], size: 1, comment: '8080: Add H & L to H & L', supportsIntel8080: true, supportsIntel8085: true }),
  0x2A: (bytes, i) => ({ mnemonic: 'LHLD', operands: `${formatByteValue(bytes[i+2])}${formatByteValue(bytes[i+1])}`, bytes: [0x2A, bytes[i+1], bytes[i+2]], size: 3, comment: '8080: Load H & L direct', supportsIntel8080: true, supportsIntel8085: true }),
  0x2B: () => ({ mnemonic: 'DCX', operands: 'H', bytes: [0x2B], size: 1, comment: '8080: Decrement register pair H & L', supportsIntel8080: true, supportsIntel8085: true }),
  0x2C: () => ({ mnemonic: 'INR', operands: 'L', bytes: [0x2C], size: 1, comment: '8080: Increment register L', supportsIntel8080: true, supportsIntel8085: true }),
  0x2D: () => ({ mnemonic: 'DCR', operands: 'L', bytes: [0x2D], size: 1, comment: '8080: Decrement register L', supportsIntel8080: true, supportsIntel8085: true }),
  0x2E: (bytes, i) => ({ mnemonic: 'MVI', operands: `L,${formatByteValue(bytes[i+1])}`, bytes: [0x2E, bytes[i+1]], size: 2, comment: '8080: Move immediate to register L', supportsIntel8080: true, supportsIntel8085: true }),
  0x2F: () => ({ mnemonic: 'CMA', operands: '', bytes: [0x2F], size: 1, comment: '8080: Complement accumulator', supportsIntel8080: true, supportsIntel8085: true }),
  
  // 0x30-0x3F
  0x31: (bytes, i) => ({ mnemonic: 'LXI', operands: `SP,${formatByteValue(bytes[i+2])}${formatByteValue(bytes[i+1])}`, bytes: [0x31, bytes[i+1], bytes[i+2]], size: 3, comment: '8080: Load immediate stack pointer', supportsIntel8080: true, supportsIntel8085: true }),
  0x32: (bytes, i) => ({ mnemonic: 'STA', operands: `${formatByteValue(bytes[i+2])}${formatByteValue(bytes[i+1])}`, bytes: [0x32, bytes[i+1], bytes[i+2]], size: 3, comment: '8080: Store accumulator direct', supportsIntel8080: true, supportsIntel8085: true }),
  0x33: () => ({ mnemonic: 'INX', operands: 'SP', bytes: [0x33], size: 1, comment: '8080: Increment stack pointer', supportsIntel8080: true, supportsIntel8085: true }),
  0x34: () => ({ mnemonic: 'INR', operands: 'M', bytes: [0x34], size: 1, comment: '8080: Increment memory', supportsIntel8080: true, supportsIntel8085: true }),
  0x35: () => ({ mnemonic: 'DCR', operands: 'M', bytes: [0x35], size: 1, comment: '8080: Decrement memory', supportsIntel8080: true, supportsIntel8085: true }),
  0x36: (bytes, i) => ({ mnemonic: 'MVI', operands: `M,${formatByteValue(bytes[i+1])}`, bytes: [0x36, bytes[i+1]], size: 2, comment: '8080: Move immediate to memory', supportsIntel8080: true, supportsIntel8085: true }),
  0x37: () => ({ mnemonic: 'STC', operands: '', bytes: [0x37], size: 1, comment: '8080: Set carry flag', supportsIntel8080: true, supportsIntel8085: true }),
  
  0x39: () => ({ mnemonic: 'DAD', operands: 'SP', bytes: [0x39], size: 1, comment: '8080: Add stack pointer to H & L', supportsIntel8080: true, supportsIntel8085: true }),
  0x3A: (bytes, i) => ({ mnemonic: 'LDA', operands: `${formatByteValue(bytes[i+2])}${formatByteValue(bytes[i+1])}`, bytes: [0x3A, bytes[i+1], bytes[i+2]], size: 3, comment: '8080: Load accumulator direct', supportsIntel8080: true, supportsIntel8085: true }),
  0x3B: () => ({ mnemonic: 'DCX', operands: 'SP', bytes: [0x3B], size: 1, comment: '8080: Decrement stack pointer', supportsIntel8080: true, supportsIntel8085: true }),
  0x3C: () => ({ mnemonic: 'INR', operands: 'A', bytes: [0x3C], size: 1, comment: '8080: Increment accumulator', supportsIntel8080: true, supportsIntel8085: true }),
  0x3D: () => ({ mnemonic: 'DCR', operands: 'A', bytes: [0x3D], size: 1, comment: '8080: Decrement accumulator', supportsIntel8080: true, supportsIntel8085: true }),
  0x3E: (bytes, i) => ({ mnemonic: 'MVI', operands: `A,${formatByteValue(bytes[i+1])}`, bytes: [0x3E, bytes[i+1]], size: 2, comment: '8080: Move immediate to accumulator', supportsIntel8080: true, supportsIntel8085: true }),
  0x3F: () => ({ mnemonic: 'CMC', operands: '', bytes: [0x3F], size: 1, comment: '8080: Complement carry flag', supportsIntel8080: true, supportsIntel8085: true }),
  
  // 0x40-0x7F: MOV instructions
  // 0x40-0x47: MOV B,r
  0x40: () => ({ mnemonic: 'MOV', operands: 'B,B', bytes: [0x40], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x41: () => ({ mnemonic: 'MOV', operands: 'B,C', bytes: [0x41], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x42: () => ({ mnemonic: 'MOV', operands: 'B,D', bytes: [0x42], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x43: () => ({ mnemonic: 'MOV', operands: 'B,E', bytes: [0x43], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x44: () => ({ mnemonic: 'MOV', operands: 'B,H', bytes: [0x44], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x45: () => ({ mnemonic: 'MOV', operands: 'B,L', bytes: [0x45], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x46: () => ({ mnemonic: 'MOV', operands: 'B,M', bytes: [0x46], size: 1, comment: '8080: Move memory to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x47: () => ({ mnemonic: 'MOV', operands: 'B,A', bytes: [0x47], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  
  // 0x48-0x4F: MOV C,r
  0x48: () => ({ mnemonic: 'MOV', operands: 'C,B', bytes: [0x48], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x49: () => ({ mnemonic: 'MOV', operands: 'C,C', bytes: [0x49], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x4A: () => ({ mnemonic: 'MOV', operands: 'C,D', bytes: [0x4A], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x4B: () => ({ mnemonic: 'MOV', operands: 'C,E', bytes: [0x4B], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x4C: () => ({ mnemonic: 'MOV', operands: 'C,H', bytes: [0x4C], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x4D: () => ({ mnemonic: 'MOV', operands: 'C,L', bytes: [0x4D], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x4E: () => ({ mnemonic: 'MOV', operands: 'C,M', bytes: [0x4E], size: 1, comment: '8080: Move memory to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x4F: () => ({ mnemonic: 'MOV', operands: 'C,A', bytes: [0x4F], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  
  // 0x50-0x57: MOV D,r
  0x50: () => ({ mnemonic: 'MOV', operands: 'D,B', bytes: [0x50], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x51: () => ({ mnemonic: 'MOV', operands: 'D,C', bytes: [0x51], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x52: () => ({ mnemonic: 'MOV', operands: 'D,D', bytes: [0x52], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x53: () => ({ mnemonic: 'MOV', operands: 'D,E', bytes: [0x53], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x54: () => ({ mnemonic: 'MOV', operands: 'D,H', bytes: [0x54], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x55: () => ({ mnemonic: 'MOV', operands: 'D,L', bytes: [0x55], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x56: () => ({ mnemonic: 'MOV', operands: 'D,M', bytes: [0x56], size: 1, comment: '8080: Move memory to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x57: () => ({ mnemonic: 'MOV', operands: 'D,A', bytes: [0x57], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  
  // Continue with all MOV instructions...
  // 0x58-0x5F: MOV E,r
  0x58: () => ({ mnemonic: 'MOV', operands: 'E,B', bytes: [0x58], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x59: () => ({ mnemonic: 'MOV', operands: 'E,C', bytes: [0x59], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x5A: () => ({ mnemonic: 'MOV', operands: 'E,D', bytes: [0x5A], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x5B: () => ({ mnemonic: 'MOV', operands: 'E,E', bytes: [0x5B], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x5C: () => ({ mnemonic: 'MOV', operands: 'E,H', bytes: [0x5C], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x5D: () => ({ mnemonic: 'MOV', operands: 'E,L', bytes: [0x5D], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x5E: () => ({ mnemonic: 'MOV', operands: 'E,M', bytes: [0x5E], size: 1, comment: '8080: Move memory to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x5F: () => ({ mnemonic: 'MOV', operands: 'E,A', bytes: [0x5F], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  
  // 0x60-0x67: MOV H,r
  0x60: () => ({ mnemonic: 'MOV', operands: 'H,B', bytes: [0x60], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x61: () => ({ mnemonic: 'MOV', operands: 'H,C', bytes: [0x61], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x62: () => ({ mnemonic: 'MOV', operands: 'H,D', bytes: [0x62], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x63: () => ({ mnemonic: 'MOV', operands: 'H,E', bytes: [0x63], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x64: () => ({ mnemonic: 'MOV', operands: 'H,H', bytes: [0x64], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x65: () => ({ mnemonic: 'MOV', operands: 'H,L', bytes: [0x65], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x66: () => ({ mnemonic: 'MOV', operands: 'H,M', bytes: [0x66], size: 1, comment: '8080: Move memory to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x67: () => ({ mnemonic: 'MOV', operands: 'H,A', bytes: [0x67], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  
  // 0x68-0x6F: MOV L,r
  0x68: () => ({ mnemonic: 'MOV', operands: 'L,B', bytes: [0x68], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x69: () => ({ mnemonic: 'MOV', operands: 'L,C', bytes: [0x69], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x6A: () => ({ mnemonic: 'MOV', operands: 'L,D', bytes: [0x6A], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x6B: () => ({ mnemonic: 'MOV', operands: 'L,E', bytes: [0x6B], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x6C: () => ({ mnemonic: 'MOV', operands: 'L,H', bytes: [0x6C], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x6D: () => ({ mnemonic: 'MOV', operands: 'L,L', bytes: [0x6D], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x6E: () => ({ mnemonic: 'MOV', operands: 'L,M', bytes: [0x6E], size: 1, comment: '8080: Move memory to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x6F: () => ({ mnemonic: 'MOV', operands: 'L,A', bytes: [0x6F], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  
  // 0x70-0x77: MOV M,r
  0x70: () => ({ mnemonic: 'MOV', operands: 'M,B', bytes: [0x70], size: 1, comment: '8080: Move register to memory', supportsIntel8080: true, supportsIntel8085: true }),
  0x71: () => ({ mnemonic: 'MOV', operands: 'M,C', bytes: [0x71], size: 1, comment: '8080: Move register to memory', supportsIntel8080: true, supportsIntel8085: true }),
  0x72: () => ({ mnemonic: 'MOV', operands: 'M,D', bytes: [0x72], size: 1, comment: '8080: Move register to memory', supportsIntel8080: true, supportsIntel8085: true }),
  0x73: () => ({ mnemonic: 'MOV', operands: 'M,E', bytes: [0x73], size: 1, comment: '8080: Move register to memory', supportsIntel8080: true, supportsIntel8085: true }),
  0x74: () => ({ mnemonic: 'MOV', operands: 'M,H', bytes: [0x74], size: 1, comment: '8080: Move register to memory', supportsIntel8080: true, supportsIntel8085: true }),
  0x75: () => ({ mnemonic: 'MOV', operands: 'M,L', bytes: [0x75], size: 1, comment: '8080: Move register to memory', supportsIntel8080: true, supportsIntel8085: true }),
  0x76: () => ({ mnemonic: 'HLT', operands: '', bytes: [0x76], size: 1, comment: '8080: Halt processor', supportsIntel8080: true, supportsIntel8085: true }),
  0x77: () => ({ mnemonic: 'MOV', operands: 'M,A', bytes: [0x77], size: 1, comment: '8080: Move register to memory', supportsIntel8080: true, supportsIntel8085: true }),
  
  // 0x78-0x7F: MOV A,r
  0x78: () => ({ mnemonic: 'MOV', operands: 'A,B', bytes: [0x78], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x79: () => ({ mnemonic: 'MOV', operands: 'A,C', bytes: [0x79], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x7A: () => ({ mnemonic: 'MOV', operands: 'A,D', bytes: [0x7A], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x7B: () => ({ mnemonic: 'MOV', operands: 'A,E', bytes: [0x7B], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x7C: () => ({ mnemonic: 'MOV', operands: 'A,H', bytes: [0x7C], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x7D: () => ({ mnemonic: 'MOV', operands: 'A,L', bytes: [0x7D], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x7E: () => ({ mnemonic: 'MOV', operands: 'A,M', bytes: [0x7E], size: 1, comment: '8080: Move memory to register', supportsIntel8080: true, supportsIntel8085: true }),
  0x7F: () => ({ mnemonic: 'MOV', operands: 'A,A', bytes: [0x7F], size: 1, comment: '8080: Move register to register', supportsIntel8080: true, supportsIntel8085: true }),
  
  // 0x80-0x87: ADD r
  0x80: () => ({ mnemonic: 'ADD', operands: 'B', bytes: [0x80], size: 1, comment: '8080: Add register to A', supportsIntel8080: true, supportsIntel8085: true }),
  0x81: () => ({ mnemonic: 'ADD', operands: 'C', bytes: [0x81], size: 1, comment: '8080: Add register to A', supportsIntel8080: true, supportsIntel8085: true }),
  0x82: () => ({ mnemonic: 'ADD', operands: 'D', bytes: [0x82], size: 1, comment: '8080: Add register to A', supportsIntel8080: true, supportsIntel8085: true }),
  0x83: () => ({ mnemonic: 'ADD', operands: 'E', bytes: [0x83], size: 1, comment: '8080: Add register to A', supportsIntel8080: true, supportsIntel8085: true }),
  0x84: () => ({ mnemonic: 'ADD', operands: 'H', bytes: [0x84], size: 1, comment: '8080: Add register to A', supportsIntel8080: true, supportsIntel8085: true }),
  0x85: () => ({ mnemonic: 'ADD', operands: 'L', bytes: [0x85], size: 1, comment: '8080: Add register to A', supportsIntel8080: true, supportsIntel8085: true }),
  0x86: () => ({ mnemonic: 'ADD', operands: 'M', bytes: [0x86], size: 1, comment: '8080: Add memory to A', supportsIntel8080: true, supportsIntel8085: true }),
  0x87: () => ({ mnemonic: 'ADD', operands: 'A', bytes: [0x87], size: 1, comment: '8080: Add register to A', supportsIntel8080: true, supportsIntel8085: true }),
  
  // 0x88-0x8F: ADC r
  0x88: () => ({ mnemonic: 'ADC', operands: 'B', bytes: [0x88], size: 1, comment: '8080: Add register to A with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0x89: () => ({ mnemonic: 'ADC', operands: 'C', bytes: [0x89], size: 1, comment: '8080: Add register to A with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0x8A: () => ({ mnemonic: 'ADC', operands: 'D', bytes: [0x8A], size: 1, comment: '8080: Add register to A with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0x8B: () => ({ mnemonic: 'ADC', operands: 'E', bytes: [0x8B], size: 1, comment: '8080: Add register to A with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0x8C: () => ({ mnemonic: 'ADC', operands: 'H', bytes: [0x8C], size: 1, comment: '8080: Add register to A with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0x8D: () => ({ mnemonic: 'ADC', operands: 'L', bytes: [0x8D], size: 1, comment: '8080: Add register to A with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0x8E: () => ({ mnemonic: 'ADC', operands: 'M', bytes: [0x8E], size: 1, comment: '8080: Add memory to A with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0x8F: () => ({ mnemonic: 'ADC', operands: 'A', bytes: [0x8F], size: 1, comment: '8080: Add register to A with carry', supportsIntel8080: true, supportsIntel8085: true }),
  
  // 0x90-0x97: SUB r
  0x90: () => ({ mnemonic: 'SUB', operands: 'B', bytes: [0x90], size: 1, comment: '8080: Subtract register from A', supportsIntel8080: true, supportsIntel8085: true }),
  0x91: () => ({ mnemonic: 'SUB', operands: 'C', bytes: [0x91], size: 1, comment: '8080: Subtract register from A', supportsIntel8080: true, supportsIntel8085: true }),
  0x92: () => ({ mnemonic: 'SUB', operands: 'D', bytes: [0x92], size: 1, comment: '8080: Subtract register from A', supportsIntel8080: true, supportsIntel8085: true }),
  0x93: () => ({ mnemonic: 'SUB', operands: 'E', bytes: [0x93], size: 1, comment: '8080: Subtract register from A', supportsIntel8080: true, supportsIntel8085: true }),
  0x94: () => ({ mnemonic: 'SUB', operands: 'H', bytes: [0x94], size: 1, comment: '8080: Subtract register from A', supportsIntel8080: true, supportsIntel8085: true }),
  0x95: () => ({ mnemonic: 'SUB', operands: 'L', bytes: [0x95], size: 1, comment: '8080: Subtract register from A', supportsIntel8080: true, supportsIntel8085: true }),
  0x96: () => ({ mnemonic: 'SUB', operands: 'M', bytes: [0x96], size: 1, comment: '8080: Subtract memory from A', supportsIntel8080: true, supportsIntel8085: true }),
  0x97: () => ({ mnemonic: 'SUB', operands: 'A', bytes: [0x97], size: 1, comment: '8080: Subtract register from A', supportsIntel8080: true, supportsIntel8085: true }),
  
  // 0x98-0x9F: SBB r
  0x98: () => ({ mnemonic: 'SBB', operands: 'B', bytes: [0x98], size: 1, comment: '8080: Subtract register from A with borrow', supportsIntel8080: true, supportsIntel8085: true }),
  0x99: () => ({ mnemonic: 'SBB', operands: 'C', bytes: [0x99], size: 1, comment: '8080: Subtract register from A with borrow', supportsIntel8080: true, supportsIntel8085: true }),
  0x9A: () => ({ mnemonic: 'SBB', operands: 'D', bytes: [0x9A], size: 1, comment: '8080: Subtract register from A with borrow', supportsIntel8080: true, supportsIntel8085: true }),
  0x9B: () => ({ mnemonic: 'SBB', operands: 'E', bytes: [0x9B], size: 1, comment: '8080: Subtract register from A with borrow', supportsIntel8080: true, supportsIntel8085: true }),
  0x9C: () => ({ mnemonic: 'SBB', operands: 'H', bytes: [0x9C], size: 1, comment: '8080: Subtract register from A with borrow', supportsIntel8080: true, supportsIntel8085: true }),
  0x9D: () => ({ mnemonic: 'SBB', operands: 'L', bytes: [0x9D], size: 1, comment: '8080: Subtract register from A with borrow', supportsIntel8080: true, supportsIntel8085: true }),
  0x9E: () => ({ mnemonic: 'SBB', operands: 'M', bytes: [0x9E], size: 1, comment: '8080: Subtract memory from A with borrow', supportsIntel8080: true, supportsIntel8085: true }),
  0x9F: () => ({ mnemonic: 'SBB', operands: 'A', bytes: [0x9F], size: 1, comment: '8080: Subtract register from A with borrow', supportsIntel8080: true, supportsIntel8085: true }),
  
  // 0xA0-0xA7: ANA r (AND with accumulator)
  0xA0: () => ({ mnemonic: 'ANA', operands: 'B', bytes: [0xA0], size: 1, comment: '8080: AND register with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xA1: () => ({ mnemonic: 'ANA', operands: 'C', bytes: [0xA1], size: 1, comment: '8080: AND register with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xA2: () => ({ mnemonic: 'ANA', operands: 'D', bytes: [0xA2], size: 1, comment: '8080: AND register with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xA3: () => ({ mnemonic: 'ANA', operands: 'E', bytes: [0xA3], size: 1, comment: '8080: AND register with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xA4: () => ({ mnemonic: 'ANA', operands: 'H', bytes: [0xA4], size: 1, comment: '8080: AND register with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xA5: () => ({ mnemonic: 'ANA', operands: 'L', bytes: [0xA5], size: 1, comment: '8080: AND register with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xA6: () => ({ mnemonic: 'ANA', operands: 'M', bytes: [0xA6], size: 1, comment: '8080: AND memory with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xA7: () => ({ mnemonic: 'ANA', operands: 'A', bytes: [0xA7], size: 1, comment: '8080: AND register with A', supportsIntel8080: true, supportsIntel8085: true }),
  
  // 0xA8-0xAF: XRA r (XOR with accumulator)
  0xA8: () => ({ mnemonic: 'XRA', operands: 'B', bytes: [0xA8], size: 1, comment: '8080: XOR register with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xA9: () => ({ mnemonic: 'XRA', operands: 'C', bytes: [0xA9], size: 1, comment: '8080: XOR register with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xAA: () => ({ mnemonic: 'XRA', operands: 'D', bytes: [0xAA], size: 1, comment: '8080: XOR register with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xAB: () => ({ mnemonic: 'XRA', operands: 'E', bytes: [0xAB], size: 1, comment: '8080: XOR register with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xAC: () => ({ mnemonic: 'XRA', operands: 'H', bytes: [0xAC], size: 1, comment: '8080: XOR register with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xAD: () => ({ mnemonic: 'XRA', operands: 'L', bytes: [0xAD], size: 1, comment: '8080: XOR register with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xAE: () => ({ mnemonic: 'XRA', operands: 'M', bytes: [0xAE], size: 1, comment: '8080: XOR memory with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xAF: () => ({ mnemonic: 'XRA', operands: 'A', bytes: [0xAF], size: 1, comment: '8080: XOR register with A', supportsIntel8080: true, supportsIntel8085: true }),
  
  // 0xB0-0xB7: ORA r (OR with accumulator)
  0xB0: () => ({ mnemonic: 'ORA', operands: 'B', bytes: [0xB0], size: 1, comment: '8080: OR register with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xB1: () => ({ mnemonic: 'ORA', operands: 'C', bytes: [0xB1], size: 1, comment: '8080: OR register with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xB2: () => ({ mnemonic: 'ORA', operands: 'D', bytes: [0xB2], size: 1, comment: '8080: OR register with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xB3: () => ({ mnemonic: 'ORA', operands: 'E', bytes: [0xB3], size: 1, comment: '8080: OR register with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xB4: () => ({ mnemonic: 'ORA', operands: 'H', bytes: [0xB4], size: 1, comment: '8080: OR register with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xB5: () => ({ mnemonic: 'ORA', operands: 'L', bytes: [0xB5], size: 1, comment: '8080: OR register with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xB6: () => ({ mnemonic: 'ORA', operands: 'M', bytes: [0xB6], size: 1, comment: '8080: OR memory with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xB7: () => ({ mnemonic: 'ORA', operands: 'A', bytes: [0xB7], size: 1, comment: '8080: OR register with A', supportsIntel8080: true, supportsIntel8085: true }),
  
  // 0xB8-0xBF: CMP r (Compare with accumulator)
  0xB8: () => ({ mnemonic: 'CMP', operands: 'B', bytes: [0xB8], size: 1, comment: '8080: Compare register with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xB9: () => ({ mnemonic: 'CMP', operands: 'C', bytes: [0xB9], size: 1, comment: '8080: Compare register with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xBA: () => ({ mnemonic: 'CMP', operands: 'D', bytes: [0xBA], size: 1, comment: '8080: Compare register with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xBB: () => ({ mnemonic: 'CMP', operands: 'E', bytes: [0xBB], size: 1, comment: '8080: Compare register with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xBC: () => ({ mnemonic: 'CMP', operands: 'H', bytes: [0xBC], size: 1, comment: '8080: Compare register with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xBD: () => ({ mnemonic: 'CMP', operands: 'L', bytes: [0xBD], size: 1, comment: '8080: Compare register with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xBE: () => ({ mnemonic: 'CMP', operands: 'M', bytes: [0xBE], size: 1, comment: '8080: Compare memory with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xBF: () => ({ mnemonic: 'CMP', operands: 'A', bytes: [0xBF], size: 1, comment: '8080: Compare register with A', supportsIntel8080: true, supportsIntel8085: true }),
  
  // 0xC0-0xCF: Conditional returns and calls
  0xC0: () => ({ mnemonic: 'RNZ', operands: '', bytes: [0xC0], size: 1, comment: '8080: Return if not zero', supportsIntel8080: true, supportsIntel8085: true }),
  0xC1: () => ({ mnemonic: 'POP', operands: 'B', bytes: [0xC1], size: 1, comment: '8080: Pop register pair B & C off stack', supportsIntel8080: true, supportsIntel8085: true }),
  0xC2: (bytes, i) => ({ mnemonic: 'JNZ', operands: `${formatByteValue(bytes[i+2])}${formatByteValue(bytes[i+1])}`, bytes: [0xC2, bytes[i+1], bytes[i+2]], size: 3, comment: '8080: Jump if not zero', targetAddress: bytes[i+1] + (bytes[i+2] << 8), supportsIntel8080: true, supportsIntel8085: true }),
  0xC3: (bytes, i) => ({ mnemonic: 'JMP', operands: `${formatByteValue(bytes[i+2])}${formatByteValue(bytes[i+1])}`, bytes: [0xC3, bytes[i+1], bytes[i+2]], size: 3, comment: '8080: Jump', targetAddress: bytes[i+1] + (bytes[i+2] << 8), supportsIntel8080: true, supportsIntel8085: true }),
  0xC4: (bytes, i) => ({ mnemonic: 'CNZ', operands: `${formatByteValue(bytes[i+2])}${formatByteValue(bytes[i+1])}`, bytes: [0xC4, bytes[i+1], bytes[i+2]], size: 3, comment: '8080: Call if not zero', targetAddress: bytes[i+1] + (bytes[i+2] << 8), supportsIntel8080: true, supportsIntel8085: true }),
  0xC5: () => ({ mnemonic: 'PUSH', operands: 'B', bytes: [0xC5], size: 1, comment: '8080: Push register pair B & C on stack', supportsIntel8080: true, supportsIntel8085: true }),
  0xC6: (bytes, i) => ({ mnemonic: 'ADI', operands: formatByteValue(bytes[i+1]), bytes: [0xC6, bytes[i+1]], size: 2, comment: '8080: Add immediate to A', supportsIntel8080: true, supportsIntel8085: true }),
  0xC7: () => ({ mnemonic: 'RST', operands: '0', bytes: [0xC7], size: 1, comment: '8080: Restart', targetAddress: 0x0000, supportsIntel8080: true, supportsIntel8085: true }),
  0xC8: () => ({ mnemonic: 'RZ', operands: '', bytes: [0xC8], size: 1, comment: '8080: Return if zero', supportsIntel8080: true, supportsIntel8085: true }),
  0xC9: () => ({ mnemonic: 'RET', operands: '', bytes: [0xC9], size: 1, comment: '8080: Return', supportsIntel8080: true, supportsIntel8085: true }),
  0xCA: (bytes, i) => ({ mnemonic: 'JZ', operands: `${formatByteValue(bytes[i+2])}${formatByteValue(bytes[i+1])}`, bytes: [0xCA, bytes[i+1], bytes[i+2]], size: 3, comment: '8080: Jump if zero', targetAddress: bytes[i+1] + (bytes[i+2] << 8), supportsIntel8080: true, supportsIntel8085: true }),
  0xCC: (bytes, i) => ({ mnemonic: 'CZ', operands: `${formatByteValue(bytes[i+2])}${formatByteValue(bytes[i+1])}`, bytes: [0xCC, bytes[i+1], bytes[i+2]], size: 3, comment: '8080: Call if zero', targetAddress: bytes[i+1] + (bytes[i+2] << 8), supportsIntel8080: true, supportsIntel8085: true }),
  0xCD: (bytes, i) => ({ mnemonic: 'CALL', operands: `${formatByteValue(bytes[i+2])}${formatByteValue(bytes[i+1])}`, bytes: [0xCD, bytes[i+1], bytes[i+2]], size: 3, comment: '8080: Call', targetAddress: bytes[i+1] + (bytes[i+2] << 8), supportsIntel8080: true, supportsIntel8085: true }),
  0xCE: (bytes, i) => ({ mnemonic: 'ACI', operands: formatByteValue(bytes[i+1]), bytes: [0xCE, bytes[i+1]], size: 2, comment: '8080: Add immediate to A with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0xCF: () => ({ mnemonic: 'RST', operands: '1', bytes: [0xCF], size: 1, comment: '8080: Restart', targetAddress: 0x0008, supportsIntel8080: true, supportsIntel8085: true }),
  
  // 0xD0-0xDF: More conditional returns and calls
  0xD0: () => ({ mnemonic: 'RNC', operands: '', bytes: [0xD0], size: 1, comment: '8080: Return if no carry', supportsIntel8080: true, supportsIntel8085: true }),
  0xD1: () => ({ mnemonic: 'POP', operands: 'D', bytes: [0xD1], size: 1, comment: '8080: Pop register pair D & E off stack', supportsIntel8080: true, supportsIntel8085: true }),
  0xD2: (bytes, i) => ({ mnemonic: 'JNC', operands: `${formatByteValue(bytes[i+2])}${formatByteValue(bytes[i+1])}`, bytes: [0xD2, bytes[i+1], bytes[i+2]], size: 3, comment: '8080: Jump if no carry', targetAddress: bytes[i+1] + (bytes[i+2] << 8), supportsIntel8080: true, supportsIntel8085: true }),
  0xD3: (bytes, i) => ({ mnemonic: 'OUT', operands: formatByteValue(bytes[i+1]), bytes: [0xD3, bytes[i+1]], size: 2, comment: '8080: Output to port', isIOOperation: true, supportsIntel8080: true, supportsIntel8085: true }),
  0xD4: (bytes, i) => ({ mnemonic: 'CNC', operands: `${formatByteValue(bytes[i+2])}${formatByteValue(bytes[i+1])}`, bytes: [0xD4, bytes[i+1], bytes[i+2]], size: 3, comment: '8080: Call if no carry', targetAddress: bytes[i+1] + (bytes[i+2] << 8), supportsIntel8080: true, supportsIntel8085: true }),
  0xD5: () => ({ mnemonic: 'PUSH', operands: 'D', bytes: [0xD5], size: 1, comment: '8080: Push register pair D & E on stack', supportsIntel8080: true, supportsIntel8085: true }),
  0xD6: (bytes, i) => ({ mnemonic: 'SUI', operands: formatByteValue(bytes[i+1]), bytes: [0xD6, bytes[i+1]], size: 2, comment: '8080: Subtract immediate from A', supportsIntel8080: true, supportsIntel8085: true }),
  0xD7: () => ({ mnemonic: 'RST', operands: '2', bytes: [0xD7], size: 1, comment: '8080: Restart', targetAddress: 0x0010, supportsIntel8080: true, supportsIntel8085: true }),
  0xD8: () => ({ mnemonic: 'RC', operands: '', bytes: [0xD8], size: 1, comment: '8080: Return if carry', supportsIntel8080: true, supportsIntel8085: true }),
  0xDA: (bytes, i) => ({ mnemonic: 'JC', operands: `${formatByteValue(bytes[i+2])}${formatByteValue(bytes[i+1])}`, bytes: [0xDA, bytes[i+1], bytes[i+2]], size: 3, comment: '8080: Jump if carry', targetAddress: bytes[i+1] + (bytes[i+2] << 8), supportsIntel8080: true, supportsIntel8085: true }),
  0xDB: (bytes, i) => ({ mnemonic: 'IN', operands: formatByteValue(bytes[i+1]), bytes: [0xDB, bytes[i+1]], size: 2, comment: '8080: Input from port', isIOOperation: true, supportsIntel8080: true, supportsIntel8085: true }),
  0xDC: (bytes, i) => ({ mnemonic: 'CC', operands: `${formatByteValue(bytes[i+2])}${formatByteValue(bytes[i+1])}`, bytes: [0xDC, bytes[i+1], bytes[i+2]], size: 3, comment: '8080: Call if carry', targetAddress: bytes[i+1] + (bytes[i+2] << 8), supportsIntel8080: true, supportsIntel8085: true }),
  0xDE: (bytes, i) => ({ mnemonic: 'SBI', operands: formatByteValue(bytes[i+1]), bytes: [0xDE, bytes[i+1]], size: 2, comment: '8080: Subtract immediate from A with borrow', supportsIntel8080: true, supportsIntel8085: true }),
  0xDF: () => ({ mnemonic: 'RST', operands: '3', bytes: [0xDF], size: 1, comment: '8080: Restart', targetAddress: 0x0018, supportsIntel8080: true, supportsIntel8085: true }),
  
  // 0xE0-0xEF: More conditional returns and logical operations
  0xE0: () => ({ mnemonic: 'RPO', operands: '', bytes: [0xE0], size: 1, comment: '8080: Return if parity odd', supportsIntel8080: true, supportsIntel8085: true }),
  0xE1: () => ({ mnemonic: 'POP', operands: 'H', bytes: [0xE1], size: 1, comment: '8080: Pop register pair H & L off stack', supportsIntel8080: true, supportsIntel8085: true }),
  0xE2: (bytes, i) => ({ mnemonic: 'JPO', operands: `${formatByteValue(bytes[i+2])}${formatByteValue(bytes[i+1])}`, bytes: [0xE2, bytes[i+1], bytes[i+2]], size: 3, comment: '8080: Jump if parity odd', targetAddress: bytes[i+1] + (bytes[i+2] << 8), supportsIntel8080: true, supportsIntel8085: true }),
  0xE3: () => ({ mnemonic: 'XTHL', operands: '', bytes: [0xE3], size: 1, comment: '8080: Exchange top of stack with H & L', supportsIntel8080: true, supportsIntel8085: true }),
  0xE4: (bytes, i) => ({ mnemonic: 'CPO', operands: `${formatByteValue(bytes[i+2])}${formatByteValue(bytes[i+1])}`, bytes: [0xE4, bytes[i+1], bytes[i+2]], size: 3, comment: '8080: Call if parity odd', targetAddress: bytes[i+1] + (bytes[i+2] << 8), supportsIntel8080: true, supportsIntel8085: true }),
  0xE5: () => ({ mnemonic: 'PUSH', operands: 'H', bytes: [0xE5], size: 1, comment: '8080: Push register pair H & L on stack', supportsIntel8080: true, supportsIntel8085: true }),
  0xE6: (bytes, i) => ({ mnemonic: 'ANI', operands: formatByteValue(bytes[i+1]), bytes: [0xE6, bytes[i+1]], size: 2, comment: '8080: AND immediate with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xE7: () => ({ mnemonic: 'RST', operands: '4', bytes: [0xE7], size: 1, comment: '8080: Restart', targetAddress: 0x0020, supportsIntel8080: true, supportsIntel8085: true }),
  0xE8: () => ({ mnemonic: 'RPE', operands: '', bytes: [0xE8], size: 1, comment: '8080: Return if parity even', supportsIntel8080: true, supportsIntel8085: true }),
  0xE9: () => ({ mnemonic: 'PCHL', operands: '', bytes: [0xE9], size: 1, comment: '8080: Jump to address in H & L', supportsIntel8080: true, supportsIntel8085: true }),
  0xEA: (bytes, i) => ({ mnemonic: 'JPE', operands: `${formatByteValue(bytes[i+2])}${formatByteValue(bytes[i+1])}`, bytes: [0xEA, bytes[i+1], bytes[i+2]], size: 3, comment: '8080: Jump if parity even', targetAddress: bytes[i+1] + (bytes[i+2] << 8), supportsIntel8080: true, supportsIntel8085: true }),
  0xEB: () => ({ mnemonic: 'XCHG', operands: '', bytes: [0xEB], size: 1, comment: '8080: Exchange D & E with H & L', supportsIntel8080: true, supportsIntel8085: true }),
  0xEC: (bytes, i) => ({ mnemonic: 'CPE', operands: `${formatByteValue(bytes[i+2])}${formatByteValue(bytes[i+1])}`, bytes: [0xEC, bytes[i+1], bytes[i+2]], size: 3, comment: '8080: Call if parity even', targetAddress: bytes[i+1] + (bytes[i+2] << 8), supportsIntel8080: true, supportsIntel8085: true }),
  0xEE: (bytes, i) => ({ mnemonic: 'XRI', operands: formatByteValue(bytes[i+1]), bytes: [0xEE, bytes[i+1]], size: 2, comment: '8080: XOR immediate with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xEF: () => ({ mnemonic: 'RST', operands: '5', bytes: [0xEF], size: 1, comment: '8080: Restart', targetAddress: 0x0028, supportsIntel8080: true, supportsIntel8085: true }),
  
  // 0xF0-0xFF: Final conditional returns and logical operations
  0xF0: () => ({ mnemonic: 'RP', operands: '', bytes: [0xF0], size: 1, comment: '8080: Return if plus', supportsIntel8080: true, supportsIntel8085: true }),
  0xF1: () => ({ mnemonic: 'POP', operands: 'PSW', bytes: [0xF1], size: 1, comment: '8080: Pop A and flags off stack', supportsIntel8080: true, supportsIntel8085: true }),
  0xF2: (bytes, i) => ({ mnemonic: 'JP', operands: `${formatByteValue(bytes[i+2])}${formatByteValue(bytes[i+1])}`, bytes: [0xF2, bytes[i+1], bytes[i+2]], size: 3, comment: '8080: Jump if plus', targetAddress: bytes[i+1] + (bytes[i+2] << 8), supportsIntel8080: true, supportsIntel8085: true }),
  0xF3: () => ({ mnemonic: 'DI', operands: '', bytes: [0xF3], size: 1, comment: '8080: Disable interrupts', supportsIntel8080: true, supportsIntel8085: true }),
  0xF4: (bytes, i) => ({ mnemonic: 'CP', operands: `${formatByteValue(bytes[i+2])}${formatByteValue(bytes[i+1])}`, bytes: [0xF4, bytes[i+1], bytes[i+2]], size: 3, comment: '8080: Call if plus', targetAddress: bytes[i+1] + (bytes[i+2] << 8), supportsIntel8080: true, supportsIntel8085: true }),
  0xF5: () => ({ mnemonic: 'PUSH', operands: 'PSW', bytes: [0xF5], size: 1, comment: '8080: Push A and flags on stack', supportsIntel8080: true, supportsIntel8085: true }),
  0xF6: (bytes, i) => ({ mnemonic: 'ORI', operands: formatByteValue(bytes[i+1]), bytes: [0xF6, bytes[i+1]], size: 2, comment: '8080: OR immediate with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xF7: () => ({ mnemonic: 'RST', operands: '6', bytes: [0xF7], size: 1, comment: '8080: Restart', targetAddress: 0x0030, supportsIntel8080: true, supportsIntel8085: true }),
  0xF8: () => ({ mnemonic: 'RM', operands: '', bytes: [0xF8], size: 1, comment: '8080: Return if minus', supportsIntel8080: true, supportsIntel8085: true }),
  0xF9: () => ({ mnemonic: 'SPHL', operands: '', bytes: [0xF9], size: 1, comment: '8080: Load SP from H & L', supportsIntel8080: true, supportsIntel8085: true }),
  0xFA: (bytes, i) => ({ mnemonic: 'JM', operands: `${formatByteValue(bytes[i+2])}${formatByteValue(bytes[i+1])}`, bytes: [0xFA, bytes[i+1], bytes[i+2]], size: 3, comment: '8080: Jump if minus', targetAddress: bytes[i+1] + (bytes[i+2] << 8), supportsIntel8080: true, supportsIntel8085: true }),
  0xFB: () => ({ mnemonic: 'EI', operands: '', bytes: [0xFB], size: 1, comment: '8080: Enable interrupts', supportsIntel8080: true, supportsIntel8085: true }),
  0xFC: (bytes, i) => ({ mnemonic: 'CM', operands: `${formatByteValue(bytes[i+2])}${formatByteValue(bytes[i+1])}`, bytes: [0xFC, bytes[i+1], bytes[i+2]], size: 3, comment: '8080: Call if minus', targetAddress: bytes[i+1] + (bytes[i+2] << 8), supportsIntel8080: true, supportsIntel8085: true }),
  0xFE: (bytes, i) => ({ mnemonic: 'CPI', operands: formatByteValue(bytes[i+1]), bytes: [0xFE, bytes[i+1]], size: 2, comment: '8080: Compare immediate with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xFF: () => ({ mnemonic: 'RST', operands: '7', bytes: [0xFF], size: 1, comment: '8080: Restart', targetAddress: 0x0038, supportsIntel8080: true, supportsIntel8085: true }),
};

export default INTEL_8080_OPCODES;
