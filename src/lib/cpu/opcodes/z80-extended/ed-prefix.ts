
import { OpcodeHandler } from '../../types';
import { format16BitHex, formatByteValue } from '../../formatters';

// ED prefix opcodes - Z80 specific extended instructions
export const ED_PREFIX_OPCODES: Record<number, OpcodeHandler> = {
  // Block 0x40-0x4F
  0x40: (bytes, i) => ({ 
    mnemonic: 'IN', 
    operands: 'B,(C)', 
    bytes: [0xED, 0x40], 
    size: 2,
    comment: 'Input from port (C) to B',
    isIOOperation: true,
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  0x41: (bytes, i) => ({ 
    mnemonic: 'OUT', 
    operands: '(C),B', 
    bytes: [0xED, 0x41], 
    size: 2,
    comment: 'Output B to port (C)',
    isIOOperation: true,
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  0x42: (bytes, i) => ({ 
    mnemonic: 'SBC', 
    operands: 'HL,BC', 
    bytes: [0xED, 0x42], 
    size: 2,
    comment: 'Subtract BC from HL with carry',
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  0x43: (bytes, i) => ({ 
    mnemonic: 'LD', 
    operands: `(${format16BitHex((bytes[i+3] << 8) | bytes[i+2])}),BC`, 
    bytes: [0xED, 0x43, bytes[i+2], bytes[i+3]], 
    size: 4,
    comment: 'Store BC at address',
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  0x44: (bytes, i) => ({ 
    mnemonic: 'NEG', 
    operands: '', 
    bytes: [0xED, 0x44], 
    size: 2,
    comment: 'Negate accumulator (A = 0-A)',
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  0x45: (bytes, i) => ({ 
    mnemonic: 'RETN', 
    operands: '', 
    bytes: [0xED, 0x45], 
    size: 2,
    comment: 'Return from non-maskable interrupt',
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  0x46: (bytes, i) => ({ 
    mnemonic: 'IM', 
    operands: '0', 
    bytes: [0xED, 0x46], 
    size: 2,
    comment: 'Set interrupt mode 0',
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  0x47: (bytes, i) => ({ 
    mnemonic: 'LD', 
    operands: 'I,A', 
    bytes: [0xED, 0x47], 
    size: 2,
    comment: 'Load interrupt register from A',
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  
  // Block 0x48-0x4F
  0x48: (bytes, i) => ({ 
    mnemonic: 'IN', 
    operands: 'C,(C)', 
    bytes: [0xED, 0x48], 
    size: 2,
    isIOOperation: true,
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  0x49: (bytes, i) => ({ 
    mnemonic: 'OUT', 
    operands: '(C),C', 
    bytes: [0xED, 0x49], 
    size: 2,
    isIOOperation: true,
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  0x4A: (bytes, i) => ({ 
    mnemonic: 'ADC', 
    operands: 'HL,BC', 
    bytes: [0xED, 0x4A], 
    size: 2,
    comment: 'Add BC to HL with carry',
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  0x4B: (bytes, i) => ({ 
    mnemonic: 'LD', 
    operands: `BC,(${format16BitHex((bytes[i+3] << 8) | bytes[i+2])})`, 
    bytes: [0xED, 0x4B, bytes[i+2], bytes[i+3]], 
    size: 4,
    comment: 'Load BC from address',
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  0x4D: (bytes, i) => ({ 
    mnemonic: 'RETI', 
    operands: '', 
    bytes: [0xED, 0x4D], 
    size: 2,
    comment: 'Return from interrupt',
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  0x4F: (bytes, i) => ({ 
    mnemonic: 'LD', 
    operands: 'R,A', 
    bytes: [0xED, 0x4F], 
    size: 2,
    comment: 'Load refresh register from A',
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  
  // Block 0x50-0x5F (similar pattern with DE register pair)
  0x50: (bytes, i) => ({ 
    mnemonic: 'IN', 
    operands: 'D,(C)', 
    bytes: [0xED, 0x50], 
    size: 2,
    isIOOperation: true,
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  0x51: (bytes, i) => ({ 
    mnemonic: 'OUT', 
    operands: '(C),D', 
    bytes: [0xED, 0x51], 
    size: 2,
    isIOOperation: true,
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  0x52: (bytes, i) => ({ 
    mnemonic: 'SBC', 
    operands: 'HL,DE', 
    bytes: [0xED, 0x52], 
    size: 2,
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  0x53: (bytes, i) => ({ 
    mnemonic: 'LD', 
    operands: `(${format16BitHex((bytes[i+3] << 8) | bytes[i+2])}),DE`, 
    bytes: [0xED, 0x53, bytes[i+2], bytes[i+3]], 
    size: 4,
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  0x56: (bytes, i) => ({ 
    mnemonic: 'IM', 
    operands: '1', 
    bytes: [0xED, 0x56], 
    size: 2,
    comment: 'Set interrupt mode 1',
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  0x57: (bytes, i) => ({ 
    mnemonic: 'LD', 
    operands: 'A,I', 
    bytes: [0xED, 0x57], 
    size: 2,
    comment: 'Load A from interrupt register',
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  
  // Additional ED prefix opcodes can be added following the same pattern
  // This includes blocks 0x60-0x6F, 0x70-0x7F, 0xA0-0xBF
  // Block A0-BF includes block I/O and block transfer instructions
  
  0xA0: (bytes, i) => ({ 
    mnemonic: 'LDI', 
    operands: '', 
    bytes: [0xED, 0xA0], 
    size: 2,
    comment: 'Load and Increment',
    supportsIntel8080: false,
    supportsIntel8085: false
  }),
  0xB0: (bytes, i) => ({ 
    mnemonic: 'LDIR', 
    operands: '', 
    bytes: [0xED, 0xB0], 
    size: 2,
    comment: 'Load and Increment, Repeat',
    supportsIntel8080: false,
    supportsIntel8085: false
  })
  // Additional block instructions can be added as needed
};
