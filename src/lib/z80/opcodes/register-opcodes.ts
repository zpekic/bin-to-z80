
import { OpcodeHandler } from '../types';

// Register-Register operations (0x40-0x7F)
export const REGISTER_OPCODES: Record<number, OpcodeHandler> = {
  // Register-Register loads
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
  
  // Add ASCII comments for single-byte opcodes in the range 0x60 to 0x7E
  0x60: () => ({ 
    mnemonic: 'LD', 
    operands: 'H, B', 
    bytes: [0x60], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x60)}' (\`)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x61: () => ({ 
    mnemonic: 'LD', 
    operands: 'H, C', 
    bytes: [0x61], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x61)}' (a)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x62: () => ({ 
    mnemonic: 'LD', 
    operands: 'H, D', 
    bytes: [0x62], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x62)}' (b)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x63: () => ({ 
    mnemonic: 'LD', 
    operands: 'H, E', 
    bytes: [0x63], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x63)}' (c)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x64: () => ({ 
    mnemonic: 'LD', 
    operands: 'H, H', 
    bytes: [0x64], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x64)}' (d)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x65: () => ({ 
    mnemonic: 'LD', 
    operands: 'H, L', 
    bytes: [0x65], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x65)}' (e)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x66: () => ({ 
    mnemonic: 'LD', 
    operands: 'H, (HL)', 
    bytes: [0x66], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x66)}' (f)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x67: () => ({ 
    mnemonic: 'LD', 
    operands: 'H, A', 
    bytes: [0x67], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x67)}' (g)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  
  0x68: () => ({ 
    mnemonic: 'LD', 
    operands: 'L, B', 
    bytes: [0x68], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x68)}' (h)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x69: () => ({ 
    mnemonic: 'LD', 
    operands: 'L, C', 
    bytes: [0x69], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x69)}' (i)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x6A: () => ({ 
    mnemonic: 'LD', 
    operands: 'L, D', 
    bytes: [0x6A], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x6A)}' (j)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x6B: () => ({ 
    mnemonic: 'LD', 
    operands: 'L, E', 
    bytes: [0x6B], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x6B)}' (k)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x6C: () => ({ 
    mnemonic: 'LD', 
    operands: 'L, H', 
    bytes: [0x6C], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x6C)}' (l)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x6D: () => ({ 
    mnemonic: 'LD', 
    operands: 'L, L', 
    bytes: [0x6D], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x6D)}' (m)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x6E: () => ({ 
    mnemonic: 'LD', 
    operands: 'L, (HL)', 
    bytes: [0x6E], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x6E)}' (n)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x6F: () => ({ 
    mnemonic: 'LD', 
    operands: 'L, A', 
    bytes: [0x6F], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x6F)}' (o)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  
  0x70: () => ({ 
    mnemonic: 'LD', 
    operands: '(HL), B', 
    bytes: [0x70], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x70)}' (p)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x71: () => ({ 
    mnemonic: 'LD', 
    operands: '(HL), C', 
    bytes: [0x71], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x71)}' (q)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x72: () => ({ 
    mnemonic: 'LD', 
    operands: '(HL), D', 
    bytes: [0x72], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x72)}' (r)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x73: () => ({ 
    mnemonic: 'LD', 
    operands: '(HL), E', 
    bytes: [0x73], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x73)}' (s)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x74: () => ({ 
    mnemonic: 'LD', 
    operands: '(HL), H', 
    bytes: [0x74], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x74)}' (t)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x75: () => ({ 
    mnemonic: 'LD', 
    operands: '(HL), L', 
    bytes: [0x75], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x75)}' (u)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x76: () => ({ 
    mnemonic: 'HALT', 
    operands: '', 
    bytes: [0x76], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x76)}' (v)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x77: () => ({ 
    mnemonic: 'LD', 
    operands: '(HL), A', 
    bytes: [0x77], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x77)}' (w)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  
  0x78: () => ({ 
    mnemonic: 'LD', 
    operands: 'A, B', 
    bytes: [0x78], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x78)}' (x)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x79: () => ({ 
    mnemonic: 'LD', 
    operands: 'A, C', 
    bytes: [0x79], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x79)}' (y)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x7A: () => ({ 
    mnemonic: 'LD', 
    operands: 'A, D', 
    bytes: [0x7A], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x7A)}' (z)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x7B: () => ({ 
    mnemonic: 'LD', 
    operands: 'A, E', 
    bytes: [0x7B], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x7B)}' ({)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x7C: () => ({ 
    mnemonic: 'LD', 
    operands: 'A, H', 
    bytes: [0x7C], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x7C)}' (|)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x7D: () => ({ 
    mnemonic: 'LD', 
    operands: 'A, L', 
    bytes: [0x7D], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x7D)}' (})`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x7E: () => ({ 
    mnemonic: 'LD', 
    operands: 'A, (HL)', 
    bytes: [0x7E], 
    size: 1,
    comment: `ASCII: '${String.fromCharCode(0x7E)}' (~)`,
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0x7F: () => ({ mnemonic: 'LD', operands: 'A, A', bytes: [0x7F], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
};
