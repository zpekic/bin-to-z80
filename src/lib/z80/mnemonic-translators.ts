
/**
 * Translates Z80 mnemonics to Intel 8080/8085 mnemonics
 * Based on:
 * - https://pastraiser.com/cpu/i8080/i8080_opcodes.html
 * - https://saundby.com/electronics/8085/8085Ref.pdf
 * - http://www.eazynotes.com/notes/microprocessor/notes/opcodes-table-of-intel-8085.pdf
 */

// Map Z80 mnemonics to Intel 8080/8085 mnemonics
export const translateToIntel = (z80Mnemonic: string): string => {
  // Mnemonic translation table
  const mnemonicMap: Record<string, string> = {
    // Direct translations - based on Intel 8080/8085 reference
    'LD': 'MOV', // Most LD instructions map to MOV in 8080/8085
    'CALL': 'CALL',
    'RET': 'RET',
    'JP': 'JMP', // Jump is JMP in Intel syntax
    'JR': 'JMP', // Relative jumps don't exist in 8080/8085, so map to JMP
    'DJNZ': 'DCR B / JNZ', // No direct equivalent
    'INC': 'INR', // Increment register
    'DEC': 'DCR', // Decrement register
    'ADD': 'ADD',
    'ADC': 'ADC',
    'SUB': 'SUB',
    'SBC': 'SBB', // Subtract with borrow in Intel 8080/8085
    'AND': 'ANA', // Logical AND in Intel 8080/8085
    'OR': 'ORA', // Logical OR in Intel 8080/8085
    'XOR': 'XRA', // Logical XOR in Intel 8080/8085
    'CP': 'CMP', // Compare
    'PUSH': 'PUSH',
    'POP': 'POP',
    'EX': 'XTHL', // Exchange HL with top of stack (specific case)
    'IN': 'IN',
    'OUT': 'OUT',
    'RLCA': 'RLC', // Rotate A left
    'RRCA': 'RRC', // Rotate A right
    'RLA': 'RAL', // Rotate A left through carry
    'RRA': 'RAR', // Rotate A right through carry
    'DAA': 'DAA', // Decimal adjust A
    'CPL': 'CMA', // Complement A
    'SCF': 'STC', // Set carry flag
    'CCF': 'CMC', // Complement carry flag
    'HALT': 'HLT', // Halt
    'DI': 'DI',   // Disable interrupts
    'EI': 'EI',   // Enable interrupts
    'NOP': 'NOP', // No operation
    
    // Additional 8085-specific instruction translations
    'IM': 'SIM', // Set Interrupt Mask (8085 only)
    'RST': 'RST', // Restart
    'LDI': 'MVI', // Load immediate for 8085
    'LDIR': 'MOV', // No exact equivalent, closest is MOV
    'NEG': 'CMA', // Negate (complement) - closest is CMA
    'RLD': 'RRC', // Rotate left decimal - approximation
    'RRD': 'RRC', // Rotate right decimal - approximation
    'SLA': 'RAL', // Shift left arithmetic - closest is RAL
    'SRA': 'RAR', // Shift right arithmetic - closest is RAR
    'SRL': 'RAR', // Shift right logical - closest is RAR
    'BIT': 'ANA', // Bit test - uses AND in 8085/8080
    'RES': 'ANA', // Reset bit - no direct equivalent
    'SET': 'ORA', // Set bit - no direct equivalent
  };

  // Return the Intel mnemonic or the original if no translation exists
  return mnemonicMap[z80Mnemonic] || z80Mnemonic;
};

// Adjust operands for Intel syntax
export const adjustOperandsForIntel = (mnemonic: string, operands: string): string => {
  // For Intel 8080/8085, the destination is typically on the right
  // However, Intel syntax for many instructions reversed the order from Z80
  
  if (mnemonic === 'MOV') {
    // For MOV instructions, many Intel 8080/8085 assemblers use "MOV dest,src" format
    return operands;
  } else if (['ADD', 'ADC', 'SUB', 'SBB', 'ANA', 'XRA', 'ORA', 'CMP'].includes(mnemonic)) {
    // For arithmetic/logical operations in Intel, the operand is the source
    // and the accumulator is implied as the destination
    if (operands.startsWith('A, ')) {
      return operands.substring(3); // Remove 'A, ' prefix
    }
  } else if (mnemonic === 'JMP' && operands.includes(',')) {
    // Handle conditional jumps - keep condition code but adjust syntax
    const parts = operands.split(',');
    return `${parts[0]} ${parts[1].trim()}`;
  } else if (mnemonic === 'MVI') {
    // MVI format is "MVI r,data"
    if (operands.includes(',')) {
      return operands; // Already in correct format
    }
  } else if (['IN', 'OUT'].includes(mnemonic)) {
    // For IN/OUT, Intel 8080/8085 use different operand order
    if (mnemonic === 'IN' && operands.includes(',')) {
      const parts = operands.split(',');
      // Intel 8080/8085 syntax: IN port
      if (parts.length === 2 && parts[0].trim() === 'A') {
        return parts[1].trim();
      }
    } else if (mnemonic === 'OUT' && operands.includes(',')) {
      const parts = operands.split(',');
      // Intel 8080/8085 syntax: OUT port
      if (parts.length === 2 && parts[1].trim() === 'A') {
        return parts[0].trim();
      }
    }
  }
  
  return operands;
};
