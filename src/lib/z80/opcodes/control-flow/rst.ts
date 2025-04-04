
import { OpcodeHandler } from '../../types';

// Restart opcodes - special calls to predefined addresses
export const RST_OPCODES: Record<number, OpcodeHandler> = {
  0xC7: () => ({ 
    mnemonic: 'RST', 
    operands: '00h', 
    bytes: [0xC7], 
    size: 1,
    targetAddress: 0x0000,
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
  0xD7: () => ({ 
    mnemonic: 'RST', 
    operands: '10h', 
    bytes: [0xD7], 
    size: 1,
    targetAddress: 0x0010,
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
  0xE7: () => ({ 
    mnemonic: 'RST', 
    operands: '20h', 
    bytes: [0xE7], 
    size: 1,
    targetAddress: 0x0020,
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
  0xF7: () => ({ 
    mnemonic: 'RST', 
    operands: '30h', 
    bytes: [0xF7], 
    size: 1,
    targetAddress: 0x0030,
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
