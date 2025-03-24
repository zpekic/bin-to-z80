
// Z80 disassembler implementation
// This is a simplified version - a real implementation would be more comprehensive

// Define instruction types
type Z80Instruction = {
  mnemonic: string;
  operands: string;
  bytes: number[];
  size: number;
  comment?: string;
};

// Simple Z80 instruction set (subset for demonstration)
const Z80_OPCODES: Record<number, (bytes: Uint8Array, index: number) => Z80Instruction> = {
  0x00: () => ({ mnemonic: 'NOP', operands: '', bytes: [0x00], size: 1 }),
  0x01: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `BC, ${bytes[i+1] + (bytes[i+2] << 8)}h`,
    bytes: [0x01, bytes[i+1], bytes[i+2]],
    size: 3
  }),
  0x03: () => ({ mnemonic: 'INC', operands: 'BC', bytes: [0x03], size: 1 }),
  0x04: () => ({ mnemonic: 'INC', operands: 'B', bytes: [0x04], size: 1 }),
  0x05: () => ({ mnemonic: 'DEC', operands: 'B', bytes: [0x05], size: 1 }),
  0x06: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `B, ${bytes[i+1]}h`,
    bytes: [0x06, bytes[i+1]],
    size: 2
  }),
  0x0A: () => ({ mnemonic: 'LD', operands: 'A, (BC)', bytes: [0x0A], size: 1 }),
  0x0E: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `C, ${bytes[i+1]}h`,
    bytes: [0x0E, bytes[i+1]],
    size: 2
  }),
  0x11: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `DE, ${bytes[i+1] + (bytes[i+2] << 8)}h`,
    bytes: [0x11, bytes[i+1], bytes[i+2]],
    size: 3
  }),
  0x18: (bytes, i) => ({
    mnemonic: 'JR',
    operands: `${(bytes[i+1] & 0x80) ? '-' : '+'}${bytes[i+1] & 0x7F}`,
    bytes: [0x18, bytes[i+1]],
    size: 2
  }),
  0x21: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `HL, ${bytes[i+1] + (bytes[i+2] << 8)}h`,
    bytes: [0x21, bytes[i+1], bytes[i+2]],
    size: 3
  }),
  0x3E: (bytes, i) => ({
    mnemonic: 'LD',
    operands: `A, ${bytes[i+1]}h`,
    bytes: [0x3E, bytes[i+1]],
    size: 2
  }),
  0x76: () => ({ mnemonic: 'HALT', operands: '', bytes: [0x76], size: 1 }),
  0xC3: (bytes, i) => ({
    mnemonic: 'JP',
    operands: `${bytes[i+1] + (bytes[i+2] << 8)}h`,
    bytes: [0xC3, bytes[i+1], bytes[i+2]],
    size: 3
  }),
  0xC9: () => ({ mnemonic: 'RET', operands: '', bytes: [0xC9], size: 1 }),
  0xCD: (bytes, i) => ({
    mnemonic: 'CALL',
    operands: `${bytes[i+1] + (bytes[i+2] << 8)}h`,
    bytes: [0xCD, bytes[i+1], bytes[i+2]],
    size: 3
  }),
  // Add more opcodes as needed
};

// Format a number as hexadecimal with padding
export const formatHex = (num: number, pad: number): string => {
  return num.toString(16).toUpperCase().padStart(pad, '0');
};

// Convert binary data to array of bytes
export const bytesToHexString = (bytes: number[]): string => {
  return bytes.map(byte => formatHex(byte, 2)).join(' ');
};

// Disassemble a binary file
export const disassembleBinary = (binary: Uint8Array, origin = 0): {
  address: number;
  instruction: Z80Instruction;
}[] => {
  const result: { address: number; instruction: Z80Instruction }[] = [];
  let index = 0;

  while (index < binary.length) {
    const opcode = binary[index];
    const handler = Z80_OPCODES[opcode];
    
    if (handler) {
      const instruction = handler(binary, index);
      result.push({
        address: origin + index,
        instruction
      });
      index += instruction.size;
    } else {
      // Unknown opcode, treat as data byte
      result.push({
        address: origin + index,
        instruction: {
          mnemonic: 'DB',
          operands: `${formatHex(opcode, 2)}h`,
          bytes: [opcode],
          size: 1,
          comment: 'Unknown opcode'
        }
      });
      index += 1;
    }
  }

  return result;
};

// Format the disassembly as text
export const formatDisassembly = (disassembly: {
  address: number;
  instruction: Z80Instruction;
}[]): string => {
  return disassembly
    .map(({ address, instruction }) => {
      const addressStr = formatHex(address, 4);
      const bytesStr = bytesToHexString(instruction.bytes);
      const instructionStr = `${instruction.mnemonic} ${instruction.operands}`.trim();
      const commentStr = instruction.comment ? `; ${instruction.comment}` : '';
      return `${addressStr}  ${bytesStr.padEnd(12)}  ${instructionStr.padEnd(20)} ${commentStr}`;
    })
    .join('\n');
};
