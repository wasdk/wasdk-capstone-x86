type ArrayLike = {length: number};

export interface Instruction {
  id: number;
  address: number;
  size: number;
  bytes: number[];
  mnemonic: string;
  op_str: string;
}

export declare class Capstone {
  public constructor(arch: number, mode: number);
  public disasm(buffer: ArrayLike, addr?: number, max?: number): Instruction[];
  public close(): void;
}

export declare const ARCH_X86 : number;
export declare const MODE_64 : number;
