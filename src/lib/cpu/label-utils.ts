
import { Z80Instruction } from './types';
import { formatHex } from './formatters';

// Generate a label for an address
export const generateLabel = (address: number): string => {
  return `L_${formatHex(address, 4)}`;
};

// Check if an address is within a given range
export const isAddressInRange = (address: number, start: number, end: number): boolean => {
  return address >= start && address <= end;
};

// Find all jump and call destinations in the code
export const findLabelAddresses = (disassembly: {
  address: number;
  instruction: Z80Instruction;
}[]): Set<number> => {
  const labelAddresses = new Set<number>();
  
  for (const { instruction } of disassembly) {
    if (instruction.targetAddress !== undefined) {
      labelAddresses.add(instruction.targetAddress);
    }
  }
  
  return labelAddresses;
};

// Create a mapping of addresses to labels
export const createLabelMap = (labelAddresses: Set<number>): Map<number, string> => {
  const labelMap = new Map<number, string>();
  
  labelAddresses.forEach(address => {
    labelMap.set(address, generateLabel(address));
  });
  
  return labelMap;
};
