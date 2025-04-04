
import { OpcodeHandler } from '../../types';
import { format16BitHex, formatByteValue } from '../../formatters';

// Call opcodes
export const CALL_OPCODES: Record<number, OpcodeHandler> = {
  // Unconditional call
  0xCD: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `${format16BitHex(targetAddress)}`,
      bytes: [0xCD, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  
  // Zero flag conditional calls
  0xC4: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `NZ, ${format16BitHex(targetAddress)}`,
      bytes: [0xC4, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0xCC: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `Z, ${format16BitHex(targetAddress)}`,
      bytes: [0xCC, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  
  // Carry flag conditional calls
  0xD4: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `NC, ${format16BitHex(targetAddress)}`,
      bytes: [0xD4, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0xDC: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `C, ${format16BitHex(targetAddress)}`,
      bytes: [0xDC, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  
  // Parity flag conditional calls
  0xE4: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `PO, ${format16BitHex(targetAddress)}`,
      bytes: [0xE4, bytes[i+1], bytes[i+2]],
      size: 3,
      comment: 'Call if parity odd',
      targetAddress,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0xEC: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `PE, ${format16BitHex(targetAddress)}`,
      bytes: [0xEC, bytes[i+1], bytes[i+2]],
      size: 3,
      comment: 'Call if parity even',
      targetAddress,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  
  // Sign flag conditional calls
  0xF4: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `P, ${format16BitHex(targetAddress)}`,
      bytes: [0xF4, bytes[i+1], bytes[i+2]],
      size: 3,
      comment: 'Call if positive (S flag = 0)',
      targetAddress,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0xFC: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'CALL',
      operands: `M, ${format16BitHex(targetAddress)}`,
      bytes: [0xFC, bytes[i+1], bytes[i+2]],
      size: 3,
      comment: 'Call if minus/negative (S flag = 1)',
      targetAddress,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
};
