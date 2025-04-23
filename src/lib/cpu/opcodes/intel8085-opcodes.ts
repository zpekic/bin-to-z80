
import { OpcodeHandler } from '../types';
import { formatByteValue, formatWordValue } from '../formatters';
import INTEL_COMMON_OPCODES from './intel-common-opcodes';

/**
 * Intel 8085 Opcodes
 * Contains only the 8085-unique opcodes.
 * Reference: https://pastraiser.com/cpu/i8085/i8085_opcodes.html
 */

const INTEL_8085_OPCODES: Record<number, OpcodeHandler> = {
  // Import all common Intel 8080/8085 opcodes
  ...INTEL_COMMON_OPCODES,
  
  // === ONLY 8085-UNIQUE OPCODES BELOW ===

  // 8085 undocumented/unique instructions not present in 8080
  
  // 0x08 - DSUB (Undocumented, unique to 8085)
  0x08: () => ({ mnemonic: 'DSUB', operands: '', bytes: [0x08], size: 1, comment: 'Double subtract (BC from HL) (undocumented)', supportsIntel8080: false, supportsIntel8085: true }),
  
  // 0x10 - ARHL (Undocumented, unique to 8085)
  0x10: () => ({ mnemonic: 'ARHL', operands: '', bytes: [0x10], size: 1, comment: 'Arithmetic shift right HL (undocumented)', supportsIntel8080: false, supportsIntel8085: true }),
  
  // 0x18 - RDEL (Undocumented, unique to 8085)
  0x18: () => ({ mnemonic: 'RDEL', operands: '', bytes: [0x18], size: 1, comment: 'Rotate DE left through carry (undocumented)', supportsIntel8080: false, supportsIntel8085: true }),
  
  // 0x20 - RIM (Official 8085, unique to 8085)
  0x20: () => ({ mnemonic: 'RIM', operands: '', bytes: [0x20], size: 1, comment: 'Read Interrupt Mask (8085 only)', supportsIntel8080: false, supportsIntel8085: true }),
  
  // 0x28 - LDHI d8 (Undocumented, unique to 8085)
  0x28: (bytes, i) => ({
    mnemonic: 'LDHI', 
    operands: formatByteValue(bytes[i+1]), 
    bytes: [0x28, bytes[i+1]], 
    size: 2, 
    comment: 'Load H immediate (undocumented) - Add immediate to H', 
    supportsIntel8080: false, 
    supportsIntel8085: true
  }),
  
  // 0x30 - SIM (Official 8085, unique to 8085)
  0x30: () => ({ mnemonic: 'SIM', operands: '', bytes: [0x30], size: 1, comment: 'Set Interrupt Mask (8085 only)', supportsIntel8080: false, supportsIntel8085: true }),
  
  // 0x38 - LDSI d8 (Undocumented, unique to 8085)
  0x38: (bytes, i) => ({
    mnemonic: 'LDSI', 
    operands: formatByteValue(bytes[i+1]), 
    bytes: [0x38, bytes[i+1]], 
    size: 2, 
    comment: 'Load SP immediate (undocumented) - Add immediate to SP', 
    supportsIntel8080: false, 
    supportsIntel8085: true
  }),
  
  // 0xCB: RSTV (Undocumented, unique to 8085)
  0xCB: () => ({ mnemonic: 'RSTV', operands: '', bytes: [0xCB], size: 1, comment: 'Restart on overflow (undocumented)', supportsIntel8080: false, supportsIntel8085: true }),
  
  // 0xD9: SHLX (Undocumented, unique to 8085)
  0xD9: () => ({ mnemonic: 'SHLX', operands: '', bytes: [0xD9], size: 1, comment: 'Store H and L indirect (undocumented)', supportsIntel8080: false, supportsIntel8085: true }),
  
  // 0xDD: JNK (Undocumented, unique to 8085)
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
  
  // 0xED: LHLX (Undocumented, unique to 8085)
  0xED: () => ({ mnemonic: 'LHLX', operands: '', bytes: [0xED], size: 1, comment: 'Load H and L indirect (undocumented)', supportsIntel8080: false, supportsIntel8085: true }),
  
  // 0xFD: JK (Undocumented, unique to 8085)
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
};

export default INTEL_8085_OPCODES;

