
import { OpcodeHandler } from '../../types';
import { format16BitHex, formatByteValue } from '../../formatters';

// Helper for calculating relative jump target address
const calculateRelativeJumpTarget = (currentAddress: number, offset: number): number => {
  // Offset is a signed 8-bit value (-128 to 127)
  const signedOffset = offset > 127 ? offset - 256 : offset;
  // Calculate target address (PC + 2 + offset)
  return (currentAddress + 2 + signedOffset) & 0xFFFF;
};

// Jump opcodes
export const JUMP_OPCODES: Record<number, OpcodeHandler> = {
  // Unconditional jumps
  0xC3: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `${format16BitHex(targetAddress)}`,
      bytes: [0xC3, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0xE9: () => ({ mnemonic: 'JP', operands: '(HL)', bytes: [0xE9], size: 1, supportsIntel8080: true, supportsIntel8085: true }),
  
  // Z80 Relative jumps
  0x18: (bytes, i, address) => {
    const offset = bytes[i+1];
    const targetAddress = calculateRelativeJumpTarget(address || i, offset);
    return {
      mnemonic: 'JR',
      operands: `${format16BitHex(targetAddress)}`,
      bytes: [0x18, offset],
      size: 2,
      targetAddress,
      comment: 'Relative jump',
      supportsIntel8080: false,
      supportsIntel8085: false
    };
  },
  
  // Z80 Conditional relative jumps
  0x20: (bytes, i, address) => {
    const offset = bytes[i+1];
    const targetAddress = calculateRelativeJumpTarget(address || i, offset);
    return {
      mnemonic: 'JR',
      operands: `NZ, ${format16BitHex(targetAddress)}`,
      bytes: [0x20, offset],
      size: 2,
      targetAddress,
      comment: 'Relative jump if not zero',
      supportsIntel8080: false,
      supportsIntel8085: false
    };
  },
  0x28: (bytes, i, address) => {
    const offset = bytes[i+1];
    const targetAddress = calculateRelativeJumpTarget(address || i, offset);
    return {
      mnemonic: 'JR',
      operands: `Z, ${format16BitHex(targetAddress)}`,
      bytes: [0x28, offset],
      size: 2,
      targetAddress,
      comment: 'Relative jump if zero',
      supportsIntel8080: false,
      supportsIntel8085: false
    };
  },
  0x30: (bytes, i, address) => {
    const offset = bytes[i+1];
    const targetAddress = calculateRelativeJumpTarget(address || i, offset);
    return {
      mnemonic: 'JR',
      operands: `NC, ${format16BitHex(targetAddress)}`,
      bytes: [0x30, offset],
      size: 2,
      targetAddress,
      comment: 'Relative jump if no carry',
      supportsIntel8080: false,
      supportsIntel8085: false
    };
  },
  0x38: (bytes, i, address) => {
    const offset = bytes[i+1];
    const targetAddress = calculateRelativeJumpTarget(address || i, offset);
    return {
      mnemonic: 'JR',
      operands: `C, ${format16BitHex(targetAddress)}`,
      bytes: [0x38, offset],
      size: 2,
      targetAddress,
      comment: 'Relative jump if carry',
      supportsIntel8080: false,
      supportsIntel8085: false
    };
  },
  
  // DJNZ - Z80 specific
  0x10: (bytes, i, address) => {
    const offset = bytes[i+1];
    const targetAddress = calculateRelativeJumpTarget(address || i, offset);
    return {
      mnemonic: 'DJNZ',
      operands: `${format16BitHex(targetAddress)}`,
      bytes: [0x10, offset],
      size: 2,
      targetAddress,
      comment: 'Decrement B and jump if not zero',
      supportsIntel8080: false,
      supportsIntel8085: false
    };
  },
  
  // Zero flag conditional jumps
  0xC2: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `NZ, ${format16BitHex(targetAddress)}`,
      bytes: [0xC2, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0xCA: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `Z, ${format16BitHex(targetAddress)}`,
      bytes: [0xCA, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  
  // Carry flag conditional jumps
  0xD2: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `NC, ${format16BitHex(targetAddress)}`,
      bytes: [0xD2, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0xDA: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `C, ${format16BitHex(targetAddress)}`,
      bytes: [0xDA, bytes[i+1], bytes[i+2]],
      size: 3,
      targetAddress,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  
  // Parity flag conditional jumps
  0xE2: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `PO, ${format16BitHex(targetAddress)}`,
      bytes: [0xE2, bytes[i+1], bytes[i+2]],
      size: 3,
      comment: 'Jump if parity odd',
      targetAddress,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0xEA: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `PE, ${format16BitHex(targetAddress)}`,
      bytes: [0xEA, bytes[i+1], bytes[i+2]],
      size: 3,
      comment: 'Jump if parity even',
      targetAddress,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  
  // Sign flag conditional jumps
  0xF2: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `P, ${format16BitHex(targetAddress)}`,
      bytes: [0xF2, bytes[i+1], bytes[i+2]],
      size: 3,
      comment: 'Jump if positive (S flag = 0)',
      targetAddress,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
  0xFA: (bytes, i) => {
    const targetAddress = bytes[i+1] + (bytes[i+2] << 8);
    return {
      mnemonic: 'JP',
      operands: `M, ${format16BitHex(targetAddress)}`,
      bytes: [0xFA, bytes[i+1], bytes[i+2]],
      size: 3,
      comment: 'Jump if minus/negative (S flag = 1)',
      targetAddress,
      supportsIntel8080: true,
      supportsIntel8085: true
    };
  },
};
