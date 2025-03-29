
import { OpcodeHandler } from '../types';
import { formatByteValue } from '../formatters';

// I/O operations
export const IO_OPCODES: Record<number, OpcodeHandler> = {
  // OUT operations
  0xD3: (bytes, i) => ({
    mnemonic: 'OUT',
    operands: `(${formatByteValue(bytes[i+1]).replace("'", "").replace("'", "")}), A`,
    bytes: [0xD3, bytes[i+1]],
    size: 2,
    isIOOperation: true,
    comment: 'Output to port'
  }),
  
  // IN operations
  0xDB: (bytes, i) => ({
    mnemonic: 'IN',
    operands: `A, (${formatByteValue(bytes[i+1]).replace("'", "").replace("'", "")})`,
    bytes: [0xDB, bytes[i+1]],
    size: 2,
    isIOOperation: true,
    comment: 'Input from port'
  }),
};
