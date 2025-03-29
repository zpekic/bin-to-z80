/**
 * Translates Z80 mnemonics to Intel 8080/8085 mnemonics
 * Based on: https://pastraiser.com/cpu/i8080/i8080_opcodes.html
 */

// Map Z80 mnemonics to Intel 8080/8085 mnemonics
export const translateToIntel = (z80Mnemonic: string): string => {
  // Mnemonic translation table
  const mnemonicMap: Record<string, string> = {
    // Direct translations
    'LD': 'MOV', // Most LD instructions map to MOV in 8080
    'CALL': 'CALL',
    'RET': 'RET',
    'JP': 'JMP', // Jump is JMP in Intel syntax
    'JR': 'JMP', // Relative jumps don't exist in 8080, so map to JMP
    'DJNZ': 'DCR B / JNZ', // No direct equivalent
    'INC': 'INR', // Increment register
    'DEC': 'DCR', // Decrement register
    'ADD': 'ADD',
    'ADC': 'ADC',
    'SUB': 'SUB',
    'SBC': 'SBB', // Subtract with borrow in Intel
    'AND': 'ANA', // Logical AND in Intel
    'OR': 'ORA', // Logical OR in Intel
    'XOR': 'XRA', // Logical XOR in Intel
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
    'NOP': 'NOP'  // No operation
  };

  // Return the Intel mnemonic or the original if no translation exists
  return mnemonicMap[z80Mnemonic] || z80Mnemonic;
};

// Adjust operands for Intel syntax
export const adjustOperandsForIntel = (mnemonic: string, operands: string): string => {
  // For Intel 8080, the destination is typically on the right
  // However, Intel syntax for many instructions reversed the order from Z80
  
  if (mnemonic === 'MOV') {
    // For MOV instructions, operands remain the same order
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
  }
  
  return operands;
};
