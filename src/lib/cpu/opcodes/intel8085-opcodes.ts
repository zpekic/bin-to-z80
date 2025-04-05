
import { OpcodeHandler } from '../types';
import { formatByteValue, formatWordValue } from '../formatters';
import INTEL_COMMON_OPCODES from './intel-common-opcodes';

/**
 * Intel 8085 Opcodes
 * Based on the official Intel 8085 instruction set
 * Reference: https://pastraiser.com/cpu/i8085/i8085_opcodes.html
 */

export const INTEL_8085_OPCODES: Record<number, OpcodeHandler> = {
  // Import all common Intel 8080/8085 opcodes
  ...INTEL_COMMON_OPCODES,
  
  // Add 8085-specific opcodes that aren't in the common set
  
  // 0x08 - DSUB (Undocumented)
  0x08: () => ({ mnemonic: 'DSUB', operands: '', bytes: [0x08], size: 1, comment: 'Double subtract (BC from HL) (undocumented)', supportsIntel8080: false, supportsIntel8085: true }),
  
  // 0x10 - ARHL (Undocumented)
  0x10: () => ({ mnemonic: 'ARHL', operands: '', bytes: [0x10], size: 1, comment: 'Arithmetic shift right HL (undocumented)', supportsIntel8080: false, supportsIntel8085: true }),
  
  // 0x18 - RDEL (Undocumented)
  0x18: () => ({ mnemonic: 'RDEL', operands: '', bytes: [0x18], size: 1, comment: 'Rotate DE left through carry (undocumented)', supportsIntel8080: false, supportsIntel8085: true }),
  
  // 0x20 - RIM (Read Interrupt Mask) - Official 8085 instruction
  0x20: () => ({ mnemonic: 'RIM', operands: '', bytes: [0x20], size: 1, comment: 'Read Interrupt Mask (8085 only)', supportsIntel8080: false, supportsIntel8085: true }),
  
  // 0x28 - LDHI d8 (Undocumented)
  0x28: (bytes, i) => ({
    mnemonic: 'LDHI', 
    operands: formatByteValue(bytes[i+1]), 
    bytes: [0x28, bytes[i+1]], 
    size: 2, 
    comment: 'Load H immediate (undocumented) - Add immediate to H', 
    supportsIntel8080: false, 
    supportsIntel8085: true
  }),
  
  // 0x30 - SIM (Set Interrupt Mask) - Official 8085 instruction
  0x30: () => ({ mnemonic: 'SIM', operands: '', bytes: [0x30], size: 1, comment: 'Set Interrupt Mask (8085 only)', supportsIntel8080: false, supportsIntel8085: true }),
  
  // 0x38 - LDSI d8 (Undocumented)
  0x38: (bytes, i) => ({
    mnemonic: 'LDSI', 
    operands: formatByteValue(bytes[i+1]), 
    bytes: [0x38, bytes[i+1]], 
    size: 2, 
    comment: 'Load SP immediate (undocumented) - Add immediate to SP', 
    supportsIntel8080: false, 
    supportsIntel8085: true
  }),
  
  // More undocumented 8085 instructions
  0xCB: () => ({ mnemonic: 'RSTV', operands: '', bytes: [0xCB], size: 1, comment: 'Restart on overflow (undocumented)', supportsIntel8080: false, supportsIntel8085: true }),
  
  0xD9: () => ({ mnemonic: 'SHLX', operands: '', bytes: [0xD9], size: 1, comment: 'Store H and L indirect (undocumented)', supportsIntel8080: false, supportsIntel8085: true }),
  
  0xDD: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'JNK', 
      operands: formatWordValue(targetAddress), 
      bytes: [0xDD, bytes[i+1], bytes[i+2]], 
      size: 3, 
      comment: 'Jump if not K flag (undocumented)', 
      targetAddress,
      supportsIntel8080: false, 
      supportsIntel8085: true
    };
  },
  
  0xED: () => ({ mnemonic: 'LHLX', operands: '', bytes: [0xED], size: 1, comment: 'Load H and L indirect (undocumented)', supportsIntel8080: false, supportsIntel8085: true }),
  
  0xFD: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'JK', 
      operands: formatWordValue(targetAddress), 
      bytes: [0xFD, bytes[i+1], bytes[i+2]], 
      size: 3, 
      comment: 'Jump if K flag (undocumented)', 
      targetAddress,
      supportsIntel8080: false, 
      supportsIntel8085: true
    };
  },

  // Additional undocumented instructions from the image
  // These include the undocumented instructions marked with "*" in the image
  
  0x04: () => ({ mnemonic: 'INR', operands: 'B', bytes: [0x04], size: 1, comment: '8085: Increment register B', supportsIntel8080: true, supportsIntel8085: true }),
  0x05: () => ({ mnemonic: 'DCR', operands: 'B', bytes: [0x05], size: 1, comment: '8085: Decrement register B', supportsIntel8080: true, supportsIntel8085: true }),
  
  // Additional arithmetic and logical instructions specific to 8085
  0x0C: () => ({ mnemonic: 'INR', operands: 'C', bytes: [0x0C], size: 1, comment: '8085: Increment register C', supportsIntel8080: true, supportsIntel8085: true }),
  0x0D: () => ({ mnemonic: 'DCR', operands: 'C', bytes: [0x0D], size: 1, comment: '8085: Decrement register C', supportsIntel8080: true, supportsIntel8085: true }),
  0x14: () => ({ mnemonic: 'INR', operands: 'D', bytes: [0x14], size: 1, comment: '8085: Increment register D', supportsIntel8080: true, supportsIntel8085: true }),
  0x15: () => ({ mnemonic: 'DCR', operands: 'D', bytes: [0x15], size: 1, comment: '8085: Decrement register D', supportsIntel8080: true, supportsIntel8085: true }),
  0x1C: () => ({ mnemonic: 'INR', operands: 'E', bytes: [0x1C], size: 1, comment: '8085: Increment register E', supportsIntel8080: true, supportsIntel8085: true }),
  0x1D: () => ({ mnemonic: 'DCR', operands: 'E', bytes: [0x1D], size: 1, comment: '8085: Decrement register E', supportsIntel8080: true, supportsIntel8085: true }),
  0x24: () => ({ mnemonic: 'INR', operands: 'H', bytes: [0x24], size: 1, comment: '8085: Increment register H', supportsIntel8080: true, supportsIntel8085: true }),
  0x25: () => ({ mnemonic: 'DCR', operands: 'H', bytes: [0x25], size: 1, comment: '8085: Decrement register H', supportsIntel8080: true, supportsIntel8085: true }),
  0x2C: () => ({ mnemonic: 'INR', operands: 'L', bytes: [0x2C], size: 1, comment: '8085: Increment register L', supportsIntel8080: true, supportsIntel8085: true }),
  0x2D: () => ({ mnemonic: 'DCR', operands: 'L', bytes: [0x2D], size: 1, comment: '8085: Decrement register L', supportsIntel8080: true, supportsIntel8085: true }),
  0x34: () => ({ mnemonic: 'INR', operands: 'M', bytes: [0x34], size: 1, comment: '8085: Increment memory (HL)', supportsIntel8080: true, supportsIntel8085: true }),
  0x35: () => ({ mnemonic: 'DCR', operands: 'M', bytes: [0x35], size: 1, comment: '8085: Decrement memory (HL)', supportsIntel8080: true, supportsIntel8085: true }),
  0x3C: () => ({ mnemonic: 'INR', operands: 'A', bytes: [0x3C], size: 1, comment: '8085: Increment accumulator', supportsIntel8080: true, supportsIntel8085: true }),
  0x3D: () => ({ mnemonic: 'DCR', operands: 'A', bytes: [0x3D], size: 1, comment: '8085: Decrement accumulator', supportsIntel8080: true, supportsIntel8085: true }),
  
  // MOV instructions with 8085 naming conventions
  0x40: () => ({ mnemonic: 'MOV', operands: 'B,B', bytes: [0x40], size: 1, comment: '8085: Move register B to B', supportsIntel8080: true, supportsIntel8085: true }),
  0x41: () => ({ mnemonic: 'MOV', operands: 'B,C', bytes: [0x41], size: 1, comment: '8085: Move register C to B', supportsIntel8080: true, supportsIntel8085: true }),
  0x42: () => ({ mnemonic: 'MOV', operands: 'B,D', bytes: [0x42], size: 1, comment: '8085: Move register D to B', supportsIntel8080: true, supportsIntel8085: true }),
  0x43: () => ({ mnemonic: 'MOV', operands: 'B,E', bytes: [0x43], size: 1, comment: '8085: Move register E to B', supportsIntel8080: true, supportsIntel8085: true }),
  0x44: () => ({ mnemonic: 'MOV', operands: 'B,H', bytes: [0x44], size: 1, comment: '8085: Move register H to B', supportsIntel8080: true, supportsIntel8085: true }),
  0x45: () => ({ mnemonic: 'MOV', operands: 'B,L', bytes: [0x45], size: 1, comment: '8085: Move register L to B', supportsIntel8080: true, supportsIntel8085: true }),
  0x46: () => ({ mnemonic: 'MOV', operands: 'B,M', bytes: [0x46], size: 1, comment: '8085: Move memory (HL) to B', supportsIntel8080: true, supportsIntel8085: true }),
  0x47: () => ({ mnemonic: 'MOV', operands: 'B,A', bytes: [0x47], size: 1, comment: '8085: Move accumulator to B', supportsIntel8080: true, supportsIntel8085: true }),
  
  // 0x50-0x57: MOV D,r instructions
  0x50: () => ({ mnemonic: 'MOV', operands: 'D,B', bytes: [0x50], size: 1, comment: '8085: Move register B to D', supportsIntel8080: true, supportsIntel8085: true }),
  0x51: () => ({ mnemonic: 'MOV', operands: 'D,C', bytes: [0x51], size: 1, comment: '8085: Move register C to D', supportsIntel8080: true, supportsIntel8085: true }),
  0x52: () => ({ mnemonic: 'MOV', operands: 'D,D', bytes: [0x52], size: 1, comment: '8085: Move register D to D', supportsIntel8080: true, supportsIntel8085: true }),
  0x53: () => ({ mnemonic: 'MOV', operands: 'D,E', bytes: [0x53], size: 1, comment: '8085: Move register E to D', supportsIntel8080: true, supportsIntel8085: true }),
  0x54: () => ({ mnemonic: 'MOV', operands: 'D,H', bytes: [0x54], size: 1, comment: '8085: Move register H to D', supportsIntel8080: true, supportsIntel8085: true }),
  0x55: () => ({ mnemonic: 'MOV', operands: 'D,L', bytes: [0x55], size: 1, comment: '8085: Move register L to D', supportsIntel8080: true, supportsIntel8085: true }),
  0x56: () => ({ mnemonic: 'MOV', operands: 'D,M', bytes: [0x56], size: 1, comment: '8085: Move memory (HL) to D', supportsIntel8080: true, supportsIntel8085: true }),
  0x57: () => ({ mnemonic: 'MOV', operands: 'D,A', bytes: [0x57], size: 1, comment: '8085: Move accumulator to D', supportsIntel8080: true, supportsIntel8085: true }),
  
  // Continue with all the MOV instructions
  // 0x48-0x4F: MOV C,r instructions
  0x48: () => ({ mnemonic: 'MOV', operands: 'C,B', bytes: [0x48], size: 1, comment: '8085: Move register B to C', supportsIntel8080: true, supportsIntel8085: true }),
  0x49: () => ({ mnemonic: 'MOV', operands: 'C,C', bytes: [0x49], size: 1, comment: '8085: Move register C to C', supportsIntel8080: true, supportsIntel8085: true }),
  0x4A: () => ({ mnemonic: 'MOV', operands: 'C,D', bytes: [0x4A], size: 1, comment: '8085: Move register D to C', supportsIntel8080: true, supportsIntel8085: true }),
  0x4B: () => ({ mnemonic: 'MOV', operands: 'C,E', bytes: [0x4B], size: 1, comment: '8085: Move register E to C', supportsIntel8080: true, supportsIntel8085: true }),
  0x4C: () => ({ mnemonic: 'MOV', operands: 'C,H', bytes: [0x4C], size: 1, comment: '8085: Move register H to C', supportsIntel8080: true, supportsIntel8085: true }),
  0x4D: () => ({ mnemonic: 'MOV', operands: 'C,L', bytes: [0x4D], size: 1, comment: '8085: Move register L to C', supportsIntel8080: true, supportsIntel8085: true }),
  0x4E: () => ({ mnemonic: 'MOV', operands: 'C,M', bytes: [0x4E], size: 1, comment: '8085: Move memory (HL) to C', supportsIntel8080: true, supportsIntel8085: true }),
  0x4F: () => ({ mnemonic: 'MOV', operands: 'C,A', bytes: [0x4F], size: 1, comment: '8085: Move accumulator to C', supportsIntel8080: true, supportsIntel8085: true }),
  
  // 0x58-0x5F: MOV E,r instructions
  0x58: () => ({ mnemonic: 'MOV', operands: 'E,B', bytes: [0x58], size: 1, comment: '8085: Move register B to E', supportsIntel8080: true, supportsIntel8085: true }),
  0x59: () => ({ mnemonic: 'MOV', operands: 'E,C', bytes: [0x59], size: 1, comment: '8085: Move register C to E', supportsIntel8080: true, supportsIntel8085: true }),
  0x5A: () => ({ mnemonic: 'MOV', operands: 'E,D', bytes: [0x5A], size: 1, comment: '8085: Move register D to E', supportsIntel8080: true, supportsIntel8085: true }),
  0x5B: () => ({ mnemonic: 'MOV', operands: 'E,E', bytes: [0x5B], size: 1, comment: '8085: Move register E to E', supportsIntel8080: true, supportsIntel8085: true }),
  0x5C: () => ({ mnemonic: 'MOV', operands: 'E,H', bytes: [0x5C], size: 1, comment: '8085: Move register H to E', supportsIntel8080: true, supportsIntel8085: true }),
  0x5D: () => ({ mnemonic: 'MOV', operands: 'E,L', bytes: [0x5D], size: 1, comment: '8085: Move register L to E', supportsIntel8080: true, supportsIntel8085: true }),
  0x5E: () => ({ mnemonic: 'MOV', operands: 'E,M', bytes: [0x5E], size: 1, comment: '8085: Move memory (HL) to E', supportsIntel8080: true, supportsIntel8085: true }),
  0x5F: () => ({ mnemonic: 'MOV', operands: 'E,A', bytes: [0x5F], size: 1, comment: '8085: Move accumulator to E', supportsIntel8080: true, supportsIntel8085: true }),

  // 0x60-0x67: MOV H,r instructions
  0x60: () => ({ mnemonic: 'MOV', operands: 'H,B', bytes: [0x60], size: 1, comment: '8085: Move register B to H', supportsIntel8080: true, supportsIntel8085: true }),
  0x61: () => ({ mnemonic: 'MOV', operands: 'H,C', bytes: [0x61], size: 1, comment: '8085: Move register C to H', supportsIntel8080: true, supportsIntel8085: true }),
  0x62: () => ({ mnemonic: 'MOV', operands: 'H,D', bytes: [0x62], size: 1, comment: '8085: Move register D to H', supportsIntel8080: true, supportsIntel8085: true }),
  0x63: () => ({ mnemonic: 'MOV', operands: 'H,E', bytes: [0x63], size: 1, comment: '8085: Move register E to H', supportsIntel8080: true, supportsIntel8085: true }),
  0x64: () => ({ mnemonic: 'MOV', operands: 'H,H', bytes: [0x64], size: 1, comment: '8085: Move register H to H', supportsIntel8080: true, supportsIntel8085: true }),
  0x65: () => ({ mnemonic: 'MOV', operands: 'H,L', bytes: [0x65], size: 1, comment: '8085: Move register L to H', supportsIntel8080: true, supportsIntel8085: true }),
  0x66: () => ({ mnemonic: 'MOV', operands: 'H,M', bytes: [0x66], size: 1, comment: '8085: Move memory (HL) to H', supportsIntel8080: true, supportsIntel8085: true }),
  0x67: () => ({ mnemonic: 'MOV', operands: 'H,A', bytes: [0x67], size: 1, comment: '8085: Move accumulator to H', supportsIntel8080: true, supportsIntel8085: true }),

  // 0x68-0x6F: MOV L,r instructions
  0x68: () => ({ mnemonic: 'MOV', operands: 'L,B', bytes: [0x68], size: 1, comment: '8085: Move register B to L', supportsIntel8080: true, supportsIntel8085: true }),
  0x69: () => ({ mnemonic: 'MOV', operands: 'L,C', bytes: [0x69], size: 1, comment: '8085: Move register C to L', supportsIntel8080: true, supportsIntel8085: true }),
  0x6A: () => ({ mnemonic: 'MOV', operands: 'L,D', bytes: [0x6A], size: 1, comment: '8085: Move register D to L', supportsIntel8080: true, supportsIntel8085: true }),
  0x6B: () => ({ mnemonic: 'MOV', operands: 'L,E', bytes: [0x6B], size: 1, comment: '8085: Move register E to L', supportsIntel8080: true, supportsIntel8085: true }),
  0x6C: () => ({ mnemonic: 'MOV', operands: 'L,H', bytes: [0x6C], size: 1, comment: '8085: Move register H to L', supportsIntel8080: true, supportsIntel8085: true }),
  0x6D: () => ({ mnemonic: 'MOV', operands: 'L,L', bytes: [0x6D], size: 1, comment: '8085: Move register L to L', supportsIntel8080: true, supportsIntel8085: true }),
  0x6E: () => ({ mnemonic: 'MOV', operands: 'L,M', bytes: [0x6E], size: 1, comment: '8085: Move memory (HL) to L', supportsIntel8080: true, supportsIntel8085: true }),
  0x6F: () => ({ mnemonic: 'MOV', operands: 'L,A', bytes: [0x6F], size: 1, comment: '8085: Move accumulator to L', supportsIntel8080: true, supportsIntel8085: true }),

  // 0x70-0x77: MOV M,r instructions
  0x70: () => ({ mnemonic: 'MOV', operands: 'M,B', bytes: [0x70], size: 1, comment: '8085: Move register B to memory (HL)', supportsIntel8080: true, supportsIntel8085: true }),
  0x71: () => ({ mnemonic: 'MOV', operands: 'M,C', bytes: [0x71], size: 1, comment: '8085: Move register C to memory (HL)', supportsIntel8080: true, supportsIntel8085: true }),
  0x72: () => ({ mnemonic: 'MOV', operands: 'M,D', bytes: [0x72], size: 1, comment: '8085: Move register D to memory (HL)', supportsIntel8080: true, supportsIntel8085: true }),
  0x73: () => ({ mnemonic: 'MOV', operands: 'M,E', bytes: [0x73], size: 1, comment: '8085: Move register E to memory (HL)', supportsIntel8080: true, supportsIntel8085: true }),
  0x74: () => ({ mnemonic: 'MOV', operands: 'M,H', bytes: [0x74], size: 1, comment: '8085: Move register H to memory (HL)', supportsIntel8080: true, supportsIntel8085: true }),
  0x75: () => ({ mnemonic: 'MOV', operands: 'M,L', bytes: [0x75], size: 1, comment: '8085: Move register L to memory (HL)', supportsIntel8080: true, supportsIntel8085: true }),
  0x76: () => ({ mnemonic: 'HLT', operands: '', bytes: [0x76], size: 1, comment: '8085: Halt processor', supportsIntel8080: true, supportsIntel8085: true }),
  0x77: () => ({ mnemonic: 'MOV', operands: 'M,A', bytes: [0x77], size: 1, comment: '8085: Move accumulator to memory (HL)', supportsIntel8080: true, supportsIntel8085: true }),

  // 0x78-0x7F: MOV A,r instructions
  0x78: () => ({ mnemonic: 'MOV', operands: 'A,B', bytes: [0x78], size: 1, comment: '8085: Move register B to accumulator', supportsIntel8080: true, supportsIntel8085: true }),
  0x79: () => ({ mnemonic: 'MOV', operands: 'A,C', bytes: [0x79], size: 1, comment: '8085: Move register C to accumulator', supportsIntel8080: true, supportsIntel8085: true }),
  0x7A: () => ({ mnemonic: 'MOV', operands: 'A,D', bytes: [0x7A], size: 1, comment: '8085: Move register D to accumulator', supportsIntel8080: true, supportsIntel8085: true }),
  0x7B: () => ({ mnemonic: 'MOV', operands: 'A,E', bytes: [0x7B], size: 1, comment: '8085: Move register E to accumulator', supportsIntel8080: true, supportsIntel8085: true }),
  0x7C: () => ({ mnemonic: 'MOV', operands: 'A,H', bytes: [0x7C], size: 1, comment: '8085: Move register H to accumulator', supportsIntel8080: true, supportsIntel8085: true }),
  0x7D: () => ({ mnemonic: 'MOV', operands: 'A,L', bytes: [0x7D], size: 1, comment: '8085: Move register L to accumulator', supportsIntel8080: true, supportsIntel8085: true }),
  0x7E: () => ({ mnemonic: 'MOV', operands: 'A,M', bytes: [0x7E], size: 1, comment: '8085: Move memory (HL) to accumulator', supportsIntel8080: true, supportsIntel8085: true }),
  0x7F: () => ({ mnemonic: 'MOV', operands: 'A,A', bytes: [0x7F], size: 1, comment: '8085: Move accumulator to accumulator', supportsIntel8080: true, supportsIntel8085: true }),

  // Arithmetic operations
  // ADD instructions 0x80-0x87
  0x80: () => ({ mnemonic: 'ADD', operands: 'B', bytes: [0x80], size: 1, comment: '8085: Add register B to A', supportsIntel8080: true, supportsIntel8085: true }),
  0x81: () => ({ mnemonic: 'ADD', operands: 'C', bytes: [0x81], size: 1, comment: '8085: Add register C to A', supportsIntel8080: true, supportsIntel8085: true }),
  0x82: () => ({ mnemonic: 'ADD', operands: 'D', bytes: [0x82], size: 1, comment: '8085: Add register D to A', supportsIntel8080: true, supportsIntel8085: true }),
  0x83: () => ({ mnemonic: 'ADD', operands: 'E', bytes: [0x83], size: 1, comment: '8085: Add register E to A', supportsIntel8080: true, supportsIntel8085: true }),
  0x84: () => ({ mnemonic: 'ADD', operands: 'H', bytes: [0x84], size: 1, comment: '8085: Add register H to A', supportsIntel8080: true, supportsIntel8085: true }),
  0x85: () => ({ mnemonic: 'ADD', operands: 'L', bytes: [0x85], size: 1, comment: '8085: Add register L to A', supportsIntel8080: true, supportsIntel8085: true }),
  0x86: () => ({ mnemonic: 'ADD', operands: 'M', bytes: [0x86], size: 1, comment: '8085: Add memory (HL) to A', supportsIntel8080: true, supportsIntel8085: true }),
  0x87: () => ({ mnemonic: 'ADD', operands: 'A', bytes: [0x87], size: 1, comment: '8085: Add accumulator to A', supportsIntel8080: true, supportsIntel8085: true }),
  
  // ADC instructions 0x88-0x8F
  0x88: () => ({ mnemonic: 'ADC', operands: 'B', bytes: [0x88], size: 1, comment: '8085: Add register B to A with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0x89: () => ({ mnemonic: 'ADC', operands: 'C', bytes: [0x89], size: 1, comment: '8085: Add register C to A with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0x8A: () => ({ mnemonic: 'ADC', operands: 'D', bytes: [0x8A], size: 1, comment: '8085: Add register D to A with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0x8B: () => ({ mnemonic: 'ADC', operands: 'E', bytes: [0x8B], size: 1, comment: '8085: Add register E to A with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0x8C: () => ({ mnemonic: 'ADC', operands: 'H', bytes: [0x8C], size: 1, comment: '8085: Add register H to A with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0x8D: () => ({ mnemonic: 'ADC', operands: 'L', bytes: [0x8D], size: 1, comment: '8085: Add register L to A with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0x8E: () => ({ mnemonic: 'ADC', operands: 'M', bytes: [0x8E], size: 1, comment: '8085: Add memory (HL) to A with carry', supportsIntel8080: true, supportsIntel8085: true }),
  0x8F: () => ({ mnemonic: 'ADC', operands: 'A', bytes: [0x8F], size: 1, comment: '8085: Add accumulator to A with carry', supportsIntel8080: true, supportsIntel8085: true }),

  // SUB instructions 0x90-0x97
  0x90: () => ({ mnemonic: 'SUB', operands: 'B', bytes: [0x90], size: 1, comment: '8085: Subtract register B from A', supportsIntel8080: true, supportsIntel8085: true }),
  0x91: () => ({ mnemonic: 'SUB', operands: 'C', bytes: [0x91], size: 1, comment: '8085: Subtract register C from A', supportsIntel8080: true, supportsIntel8085: true }),
  0x92: () => ({ mnemonic: 'SUB', operands: 'D', bytes: [0x92], size: 1, comment: '8085: Subtract register D from A', supportsIntel8080: true, supportsIntel8085: true }),
  0x93: () => ({ mnemonic: 'SUB', operands: 'E', bytes: [0x93], size: 1, comment: '8085: Subtract register E from A', supportsIntel8080: true, supportsIntel8085: true }),
  0x94: () => ({ mnemonic: 'SUB', operands: 'H', bytes: [0x94], size: 1, comment: '8085: Subtract register H from A', supportsIntel8080: true, supportsIntel8085: true }),
  0x95: () => ({ mnemonic: 'SUB', operands: 'L', bytes: [0x95], size: 1, comment: '8085: Subtract register L from A', supportsIntel8080: true, supportsIntel8085: true }),
  0x96: () => ({ mnemonic: 'SUB', operands: 'M', bytes: [0x96], size: 1, comment: '8085: Subtract memory (HL) from A', supportsIntel8080: true, supportsIntel8085: true }),
  0x97: () => ({ mnemonic: 'SUB', operands: 'A', bytes: [0x97], size: 1, comment: '8085: Subtract accumulator from A', supportsIntel8080: true, supportsIntel8085: true }),

  // SBB (Subtract with Borrow/Carry) instructions 0x98-0x9F
  0x98: () => ({ mnemonic: 'SBB', operands: 'B', bytes: [0x98], size: 1, comment: '8085: Subtract register B from A with borrow', supportsIntel8080: true, supportsIntel8085: true }),
  0x99: () => ({ mnemonic: 'SBB', operands: 'C', bytes: [0x99], size: 1, comment: '8085: Subtract register C from A with borrow', supportsIntel8080: true, supportsIntel8085: true }),
  0x9A: () => ({ mnemonic: 'SBB', operands: 'D', bytes: [0x9A], size: 1, comment: '8085: Subtract register D from A with borrow', supportsIntel8080: true, supportsIntel8085: true }),
  0x9B: () => ({ mnemonic: 'SBB', operands: 'E', bytes: [0x9B], size: 1, comment: '8085: Subtract register E from A with borrow', supportsIntel8080: true, supportsIntel8085: true }),
  0x9C: () => ({ mnemonic: 'SBB', operands: 'H', bytes: [0x9C], size: 1, comment: '8085: Subtract register H from A with borrow', supportsIntel8080: true, supportsIntel8085: true }),
  0x9D: () => ({ mnemonic: 'SBB', operands: 'L', bytes: [0x9D], size: 1, comment: '8085: Subtract register L from A with borrow', supportsIntel8080: true, supportsIntel8085: true }),
  0x9E: () => ({ mnemonic: 'SBB', operands: 'M', bytes: [0x9E], size: 1, comment: '8085: Subtract memory (HL) from A with borrow', supportsIntel8080: true, supportsIntel8085: true }),
  0x9F: () => ({ mnemonic: 'SBB', operands: 'A', bytes: [0x9F], size: 1, comment: '8085: Subtract accumulator from A with borrow', supportsIntel8080: true, supportsIntel8085: true }),

  // ANA (AND with Accumulator) instructions 0xA0-0xA7
  0xA0: () => ({ mnemonic: 'ANA', operands: 'B', bytes: [0xA0], size: 1, comment: '8085: AND register B with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xA1: () => ({ mnemonic: 'ANA', operands: 'C', bytes: [0xA1], size: 1, comment: '8085: AND register C with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xA2: () => ({ mnemonic: 'ANA', operands: 'D', bytes: [0xA2], size: 1, comment: '8085: AND register D with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xA3: () => ({ mnemonic: 'ANA', operands: 'E', bytes: [0xA3], size: 1, comment: '8085: AND register E with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xA4: () => ({ mnemonic: 'ANA', operands: 'H', bytes: [0xA4], size: 1, comment: '8085: AND register H with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xA5: () => ({ mnemonic: 'ANA', operands: 'L', bytes: [0xA5], size: 1, comment: '8085: AND register L with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xA6: () => ({ mnemonic: 'ANA', operands: 'M', bytes: [0xA6], size: 1, comment: '8085: AND memory (HL) with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xA7: () => ({ mnemonic: 'ANA', operands: 'A', bytes: [0xA7], size: 1, comment: '8085: AND accumulator with A', supportsIntel8080: true, supportsIntel8085: true }),

  // XRA (XOR with Accumulator) instructions 0xA8-0xAF
  0xA8: () => ({ mnemonic: 'XRA', operands: 'B', bytes: [0xA8], size: 1, comment: '8085: XOR register B with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xA9: () => ({ mnemonic: 'XRA', operands: 'C', bytes: [0xA9], size: 1, comment: '8085: XOR register C with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xAA: () => ({ mnemonic: 'XRA', operands: 'D', bytes: [0xAA], size: 1, comment: '8085: XOR register D with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xAB: () => ({ mnemonic: 'XRA', operands: 'E', bytes: [0xAB], size: 1, comment: '8085: XOR register E with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xAC: () => ({ mnemonic: 'XRA', operands: 'H', bytes: [0xAC], size: 1, comment: '8085: XOR register H with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xAD: () => ({ mnemonic: 'XRA', operands: 'L', bytes: [0xAD], size: 1, comment: '8085: XOR register L with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xAE: () => ({ mnemonic: 'XRA', operands: 'M', bytes: [0xAE], size: 1, comment: '8085: XOR memory (HL) with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xAF: () => ({ mnemonic: 'XRA', operands: 'A', bytes: [0xAF], size: 1, comment: '8085: XOR accumulator with A', supportsIntel8080: true, supportsIntel8085: true }),

  // ORA (OR with Accumulator) instructions 0xB0-0xB7
  0xB0: () => ({ mnemonic: 'ORA', operands: 'B', bytes: [0xB0], size: 1, comment: '8085: OR register B with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xB1: () => ({ mnemonic: 'ORA', operands: 'C', bytes: [0xB1], size: 1, comment: '8085: OR register C with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xB2: () => ({ mnemonic: 'ORA', operands: 'D', bytes: [0xB2], size: 1, comment: '8085: OR register D with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xB3: () => ({ mnemonic: 'ORA', operands: 'E', bytes: [0xB3], size: 1, comment: '8085: OR register E with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xB4: () => ({ mnemonic: 'ORA', operands: 'H', bytes: [0xB4], size: 1, comment: '8085: OR register H with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xB5: () => ({ mnemonic: 'ORA', operands: 'L', bytes: [0xB5], size: 1, comment: '8085: OR register L with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xB6: () => ({ mnemonic: 'ORA', operands: 'M', bytes: [0xB6], size: 1, comment: '8085: OR memory (HL) with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xB7: () => ({ mnemonic: 'ORA', operands: 'A', bytes: [0xB7], size: 1, comment: '8085: OR accumulator with A', supportsIntel8080: true, supportsIntel8085: true }),

  // CMP (Compare with Accumulator) instructions 0xB8-0xBF
  0xB8: () => ({ mnemonic: 'CMP', operands: 'B', bytes: [0xB8], size: 1, comment: '8085: Compare register B with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xB9: () => ({ mnemonic: 'CMP', operands: 'C', bytes: [0xB9], size: 1, comment: '8085: Compare register C with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xBA: () => ({ mnemonic: 'CMP', operands: 'D', bytes: [0xBA], size: 1, comment: '8085: Compare register D with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xBB: () => ({ mnemonic: 'CMP', operands: 'E', bytes: [0xBB], size: 1, comment: '8085: Compare register E with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xBC: () => ({ mnemonic: 'CMP', operands: 'H', bytes: [0xBC], size: 1, comment: '8085: Compare register H with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xBD: () => ({ mnemonic: 'CMP', operands: 'L', bytes: [0xBD], size: 1, comment: '8085: Compare register L with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xBE: () => ({ mnemonic: 'CMP', operands: 'M', bytes: [0xBE], size: 1, comment: '8085: Compare memory (HL) with A', supportsIntel8080: true, supportsIntel8085: true }),
  0xBF: () => ({ mnemonic: 'CMP', operands: 'A', bytes: [0xBF], size: 1, comment: '8085: Compare accumulator with A', supportsIntel8080: true, supportsIntel8085: true }),
  
  // Additional opcodes from 0xC0 onwards (control flow, I/O, etc.)
  // These are included in the INTEL_COMMON_OPCODES but we'll add any 8085-specific variants here

  // Return instructions with Intel 8085 mnemonics
  0xC0: () => ({ mnemonic: 'RNZ', operands: '', bytes: [0xC0], size: 1, comment: '8085: Return if not zero', supportsIntel8080: true, supportsIntel8085: true }),
  0xC8: () => ({ mnemonic: 'RZ', operands: '', bytes: [0xC8], size: 1, comment: '8085: Return if zero', supportsIntel8080: true, supportsIntel8085: true }),
  0xC9: () => ({ mnemonic: 'RET', operands: '', bytes: [0xC9], size: 1, comment: '8085: Return', supportsIntel8080: true, supportsIntel8085: true }),
  
  // The RIM and SIM instructions were defined earlier

  // Immediate arithmetic operations
  0xC6: (bytes, i) => ({
    mnemonic: 'ADI',
    operands: formatByteValue(bytes[i+1]),
    bytes: [0xC6, bytes[i+1]],
    size: 2,
    comment: '8085: Add immediate to A',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  
  0xCE: (bytes, i) => ({
    mnemonic: 'ACI',
    operands: formatByteValue(bytes[i+1]),
    bytes: [0xCE, bytes[i+1]],
    size: 2,
    comment: '8085: Add immediate to A with carry',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  
  0xD6: (bytes, i) => ({
    mnemonic: 'SUI',
    operands: formatByteValue(bytes[i+1]),
    bytes: [0xD6, bytes[i+1]],
    size: 2,
    comment: '8085: Subtract immediate from A',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  
  0xDE: (bytes, i) => ({
    mnemonic: 'SBI',
    operands: formatByteValue(bytes[i+1]),
    bytes: [0xDE, bytes[i+1]],
    size: 2,
    comment: '8085: Subtract immediate from A with borrow',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  
  0xE6: (bytes, i) => ({
    mnemonic: 'ANI',
    operands: formatByteValue(bytes[i+1]),
    bytes: [0xE6, bytes[i+1]],
    size: 2,
    comment: '8085: AND immediate with A',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  
  0xEE: (bytes, i) => ({
    mnemonic: 'XRI',
    operands: formatByteValue(bytes[i+1]),
    bytes: [0xEE, bytes[i+1]],
    size: 2,
    comment: '8085: XOR immediate with A',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  
  0xF6: (bytes, i) => ({
    mnemonic: 'ORI',
    operands: formatByteValue(bytes[i+1]),
    bytes: [0xF6, bytes[i+1]],
    size: 2,
    comment: '8085: OR immediate with A',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  
  0xFE: (bytes, i) => ({
    mnemonic: 'CPI',
    operands: formatByteValue(bytes[i+1]),
    bytes: [0xFE, bytes[i+1]],
    size: 2,
    comment: '8085: Compare immediate with A',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
};

export default INTEL_8085_OPCODES;
