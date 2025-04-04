
// Format a number as hexadecimal with padding
export const formatHex = (num: number, pad: number): string => {
  return num.toString(16).toUpperCase().padStart(pad, '0');
};

// Format a 16-bit value to hexadecimal
export const format16BitHex = (value: number): string => {
  return `${formatHex(value, 4)}h`;
};

// Format a byte as binary string
export const formatBinary = (value: number): string => {
  return value.toString(2).padStart(8, '0');
};

// Helper function to convert printable ASCII bytes to character representation
export const formatByteValue = (byteValue: number): string => {
  // Check if the byte is in the printable ASCII range (0x20 to 0x7E)
  if (byteValue >= 0x20 && byteValue <= 0x7E) {
    return `'${String.fromCharCode(byteValue)}' ; ${formatHex(byteValue, 2)}h`;
  }
  // Otherwise, just return the hex value
  return `${formatHex(byteValue, 2)}h`;
};

// Helper function to format a word value (16-bit) for display
export const formatWordValue = (value: number): string => {
  return `${formatHex(value, 4)}h`;
};

// Convert binary data to array of bytes
export const bytesToHexString = (bytes: number[]): string => {
  return bytes.map(byte => formatHex(byte, 2)).join(' ');
};
