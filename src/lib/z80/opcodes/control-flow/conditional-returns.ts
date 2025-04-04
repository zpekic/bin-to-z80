
import { OpcodeHandler } from '../../types';
import { format16BitHex, formatByteValue } from '../../formatters';

// Conditional Return opcodes
export const CONDITIONAL_RETURN_OPCODES: Record<number, OpcodeHandler> = {
  // Zero flag conditional returns
  0xC0: () => ({ mnemonic: 'RET', operands: 'NZ', bytes: [0xC0], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xC8: () => ({ mnemonic: 'RET', operands: 'Z', bytes: [0xC8], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xC9: () => ({ mnemonic: 'RET', operands: '', bytes: [0xC9], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  
  // Carry flag conditional returns
  0xD0: () => ({ mnemonic: 'RET', operands: 'NC', bytes: [0xD0], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xD8: () => ({ mnemonic: 'RET', operands: 'C', bytes: [0xD8], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  
  // Parity flag conditional returns
  0xE0: () => ({ mnemonic: 'RET', operands: 'PO', bytes: [0xE0], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  0xE8: () => ({ 
    mnemonic: 'RET', 
    operands: 'PE', 
    bytes: [0xE8], 
    size: 1, 
    comment: 'Return if parity even',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  
  // Sign flag conditional returns
  0xF0: () => ({ 
    mnemonic: 'RET', 
    operands: 'P', 
    bytes: [0xF0], 
    size: 1, 
    comment: 'Return if positive (S flag = 0)',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
  0xF8: () => ({ 
    mnemonic: 'RET', 
    operands: 'M', 
    bytes: [0xF8], 
    size: 1, 
    comment: 'Return if minus/negative (S flag = 1)',
    supportsIntel8080: true,
    supportsIntel8085: true
  }),
};
