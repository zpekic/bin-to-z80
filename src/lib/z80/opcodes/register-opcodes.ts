
import { OpcodeHandler } from '../types';

// Register-Register operations (0x40-0x7F)
export const REGISTER_OPCODES: Record<number, OpcodeHandler> = {
  // Register-Register loads
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
  
  // HALT instruction
  0x76: () => ({ mnemonic: 'HALT', operands: '', bytes: [0x76], size: 1 }),
  
  // More register to register operations would be added here (0x50-0x7F)
};
