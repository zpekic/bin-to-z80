// CPU Architecture Constants
export const CPU_ARCHITECTURES = {
  Z80: 'Z80',
  INTEL_8080: 'Intel 8080',
  INTEL_8085: 'Intel 8085'
} as const;

export type CPUArchitecture = typeof CPU_ARCHITECTURES[keyof typeof CPU_ARCHITECTURES];

// Output Format Constants  
export const OUTPUT_FORMATS = {
  ASSEMBLY: 'assembly',
  LIST: 'list'
} as const;

export type OutputFormat = typeof OUTPUT_FORMATS[keyof typeof OUTPUT_FORMATS];

// Jump Instruction Types
export const JUMP_TYPES = {
  UNCONDITIONAL: 'unconditional',
  CONDITIONAL: 'conditional', 
  RELATIVE: 'relative',
  SUBROUTINE: 'subroutine'
} as const;

// Addressing Constants
export const ADDRESS_LIMITS = {
  MIN: 0x0000,
  MAX: 0xFFFF,
  SIGNED_BYTE_MIN: -128,
  SIGNED_BYTE_MAX: 127
} as const;

// Opcode Prefixes
export const OPCODE_PREFIXES = {
  CB: 0xCB,
  DD: 0xDD, 
  ED: 0xED,
  FD: 0xFD
} as const;