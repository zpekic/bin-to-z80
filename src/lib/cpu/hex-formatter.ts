
/**
 * Converts a binary array to Intel HEX format
 * 
 * Intel HEX format:
 * :LLAAAATT[DD...]CC
 * 
 * LL: Record length (number of data bytes)
 * AAAA: Address (16-bit)
 * TT: Record type (00 = data, 01 = end of file)
 * DD: Data bytes
 * CC: Checksum (two's complement of the sum of all bytes)
 */
export const convertToIntelHex = (data: Uint8Array, baseAddress = 0): string => {
  const BYTES_PER_LINE = 16;
  let hexOutput: string[] = [];
  
  // Process data in 16-byte chunks
  for (let offset = 0; offset < data.length; offset += BYTES_PER_LINE) {
    const bytesInLine = Math.min(BYTES_PER_LINE, data.length - offset);
    const address = baseAddress + offset;
    
    // Build record
    let line = `:${bytesInLine.toString(16).padStart(2, '0')}${address.toString(16).padStart(4, '0')}00`;
    
    let checksum = bytesInLine + (address >> 8) + (address & 0xFF) + 0; // 0 is the record type (00)
    
    // Add data bytes
    for (let i = 0; i < bytesInLine; i++) {
      const byte = data[offset + i];
      line += byte.toString(16).padStart(2, '0');
      checksum += byte;
    }
    
    // Calculate checksum (two's complement of the lowest byte of the sum)
    const checksumByte = ((~checksum) + 1) & 0xFF;
    line += checksumByte.toString(16).padStart(2, '0');
    
    hexOutput.push(line.toUpperCase());
  }
  
  // Add end-of-file record
  hexOutput.push(':00000001FF');
  
  return hexOutput.join('\n');
};
