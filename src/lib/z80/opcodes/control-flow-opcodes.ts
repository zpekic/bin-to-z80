
import { OpcodeHandler } from '../types';
import { format16BitHex, formatByteValue } from '../formatters';

// Control flow operations (0xC0-0xFF)
export const CONTROL_FLOW_OPCODES: Record<number, OpcodeHandler> = {
  // Conditional Return instructions
  0xC0: () => ({ mnemonic: 'RET', operands: 'NZ', bytes: [0xC0], size: 1 }),
  0xC1: () => ({ mnemonic: 'POP', operands: 'BC', bytes: [0xC1], size: 1 }),
  0xC2: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `NZ, ${format16BitHex(targetAddress)}`,
      bytes: [0xC2, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress
    };
  },
  0xC3: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `${format16BitHex(targetAddress)}`,
      bytes: [0xC3, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress
    };
  },
  0xC4: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `NZ, ${format16BitHex(targetAddress)}`,
      bytes: [0xC4, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress
    };
  },
  0xC5: () => ({ mnemonic: 'PUSH', operands: 'BC', bytes: [0xC5], size: 1 }),
  0xC7: () => ({ 
    mnemonic: 'RST', 
    operands: '00h', 
    bytes: [0xC7], 
    size: 1,
    targetAddress: 0x0000
  }),
  
  0xC8: () => ({ mnemonic: 'RET', operands: 'Z', bytes: [0xC8], size: 1 }),
  0xC9: () => ({ mnemonic: 'RET', operands: '', bytes: [0xC9], size: 1 }),
  0xCA: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `Z, ${format16BitHex(targetAddress)}`,
      bytes: [0xCA, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress
    };
  },
  0xCC: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `Z, ${format16BitHex(targetAddress)}`,
      bytes: [0xCC, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress
    };
  },
  0xCD: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `${format16BitHex(targetAddress)}`,
      bytes: [0xCD, bytes[i+1], bytes[i+2]],
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
  0xCF: () => ({ 
    mnemonic: 'RST', 
    operands: '08h', 
    bytes: [0xCF], 
    size: 1,
    targetAddress: 0x0008
  }),
  
  // More conditional instructions
  0xD0: () => ({ mnemonic: 'RET', operands: 'NC', bytes: [0xD0], size: 1 }),
  0xD1: () => ({ mnemonic: 'POP', operands: 'DE', bytes: [0xD1], size: 1 }),
  0xD2: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `NC, ${format16BitHex(targetAddress)}`,
      bytes: [0xD2, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress
    };
  },
  0xD4: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `NC, ${format16BitHex(targetAddress)}`,
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
  0xD7: () => ({ 
    mnemonic: 'RST', 
    operands: '10h', 
    bytes: [0xD7], 
    size: 1,
    targetAddress: 0x0010
  }),
  0xD8: () => ({ mnemonic: 'RET', operands: 'C', bytes: [0xD8], size: 1 }),
  0xD9: () => ({ mnemonic: 'EXX', operands: '', bytes: [0xD9], size: 1 }),
  0xDA: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `C, ${format16BitHex(targetAddress)}`,
      bytes: [0xDA, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress
    };
  },
  0xDC: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `C, ${format16BitHex(targetAddress)}`,
      bytes: [0xDC, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress
    };
  },
  0xDF: () => ({ 
    mnemonic: 'RST', 
    operands: '18h', 
    bytes: [0xDF], 
    size: 1,
    targetAddress: 0x0018
  }),
  
  // Stack and miscellaneous
  0xE0: () => ({ mnemonic: 'RET', operands: 'PO', bytes: [0xE0], size: 1 }),
  0xE1: () => ({ mnemonic: 'POP', operands: 'HL', bytes: [0xE1], size: 1 }),
  // New conditional jumps - Parity Odd
  0xE2: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `PO, ${format16BitHex(targetAddress)}`,
      bytes: [0xE2, bytes[i+1], bytes[i+2]],
      size: 3,
      comment: 'Jump if parity odd',
      targetAddress
    };
  },
  0xE3: () => ({ mnemonic: 'EX', operands: '(SP), HL', bytes: [0xE3], size: 1 }),
  // New conditional calls - Parity Odd
  0xE4: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `PO, ${format16BitHex(targetAddress)}`,
      bytes: [0xE4, bytes[i+1], bytes[i+2]],
      size: 3,
      comment: 'Call if parity odd',
      targetAddress
    };
  },
  0xE5: () => ({ mnemonic: 'PUSH', operands: 'HL', bytes: [0xE5], size: 1 }),
  0xE6: (bytes, i) => ({
    mnemonic: 'AND',
    operands: `${formatByteValue(bytes[i+1])}`,
    bytes: [0xE6, bytes[i+1]],
    size: 2
  }),
  0xE7: () => ({ 
    mnemonic: 'RST', 
    operands: '20h', 
    bytes: [0xE7], 
    size: 1,
    targetAddress: 0x0020
  }),
  // New conditional returns - Parity Even
  0xE8: () => ({ mnemonic: 'RET', operands: 'PE', bytes: [0xE8], size: 1, comment: 'Return if parity even' }),
  0xE9: () => ({ mnemonic: 'JP', operands: '(HL)', bytes: [0xE9], size: 1 }),
  // New conditional jumps - Parity Even
  0xEA: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `PE, ${format16BitHex(targetAddress)}`,
      bytes: [0xEA, bytes[i+1], bytes[i+2]],
      size: 3,
      comment: 'Jump if parity even',
      targetAddress
    };
  },
  0xEB: () => ({ mnemonic: 'EX', operands: 'DE, HL', bytes: [0xEB], size: 1 }),
  // New conditional calls - Parity Even
  0xEC: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `PE, ${format16BitHex(targetAddress)}`,
      bytes: [0xEC, bytes[i+1], bytes[i+2]],
      size: 3,
      comment: 'Call if parity even',
      targetAddress
    };
  },
  0xEE: (bytes, i) => ({
    mnemonic: 'XOR',
    operands: `${formatByteValue(bytes[i+1])}`,
    bytes: [0xEE, bytes[i+1]],
    size: 2
  }),
  0xEF: () => ({ 
    mnemonic: 'RST', 
    operands: '28h', 
    bytes: [0xEF], 
    size: 1,
    targetAddress: 0x0028
  }),
  
  0xF0: () => ({ mnemonic: 'RET', operands: 'P', bytes: [0xF0], size: 1, comment: 'Return if positive (S flag = 0)' }),
  0xF1: () => ({ mnemonic: 'POP', operands: 'AF', bytes: [0xF1], size: 1 }),
  // New conditional jumps - Sign Positive
  0xF2: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `P, ${format16BitHex(targetAddress)}`,
      bytes: [0xF2, bytes[i+1], bytes[i+2]],
      size: 3,
      comment: 'Jump if positive (S flag = 0)',
      targetAddress
    };
  },
  0xF3: () => ({ mnemonic: 'DI', operands: '', bytes: [0xF3], size: 1 }),
  // New conditional calls - Sign Positive
  0xF4: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `P, ${format16BitHex(targetAddress)}`,
      bytes: [0xF4, bytes[i+1], bytes[i+2]],
      size: 3,
      comment: 'Call if positive (S flag = 0)',
      targetAddress
    };
  },
  0xF5: () => ({ mnemonic: 'PUSH', operands: 'AF', bytes: [0xF5], size: 1 }),
  0xF6: (bytes, i) => ({
    mnemonic: 'OR',
    operands: `${formatByteValue(bytes[i+1])}`,
    bytes: [0xF6, bytes[i+1]],
    size: 2
  }),
  0xF7: () => ({ 
    mnemonic: 'RST', 
    operands: '30h', 
    bytes: [0xF7], 
    size: 1,
    targetAddress: 0x0030
  }),
  // New conditional returns - Sign Negative
  0xF8: () => ({ mnemonic: 'RET', operands: 'M', bytes: [0xF8], size: 1, comment: 'Return if minus/negative (S flag = 1)' }),
  0xF9: () => ({ mnemonic: 'LD', operands: 'SP, HL', bytes: [0xF9], size: 1 }),
  // New conditional jumps - Sign Negative
  0xFA: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `M, ${format16BitHex(targetAddress)}`,
      bytes: [0xFA, bytes[i+1], bytes[i+2]],
      size: 3,
      comment: 'Jump if minus/negative (S flag = 1)',
      targetAddress
    };
  },
  0xFB: () => ({ mnemonic: 'EI', operands: '', bytes: [0xFB], size: 1 }),
  // New conditional calls - Sign Negative
  0xFC: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `M, ${format16BitHex(targetAddress)}`,
      bytes: [0xFC, bytes[i+1], bytes[i+2]],
      size: 3,
      comment: 'Call if minus/negative (S flag = 1)',
      targetAddress
    };
  },
  0xFE: (bytes, i) => ({
    mnemonic: 'CP',
    operands: `${formatByteValue(bytes[i+1])}`,
    bytes: [0xFE, bytes[i+1]],
    size: 2
  }),
  0xFF: () => ({ 
    mnemonic: 'RST', 
    operands: '38h', 
    bytes: [0xFF], 
    size: 1,
    targetAddress: 0x0038
  }),
};
