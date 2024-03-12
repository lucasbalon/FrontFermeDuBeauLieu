export interface BirthForm {
  loopNumber: String;
  gender: boolean;
  coat: String;
  birthDate: Date;
  pasture: String;
}

export interface ReducedBovin {
  id: number;
  loopNumber: string;
  gender: boolean;
  coat: string;
  birthDate: Date;
  pasture: string;
}

export interface FullBovin {
  loopNumber: string;
  coat: string;
  gender: true;
  birthDate: Date;
  cesarean: boolean;
  status: Status;
  fatherLoopNumber: string;
  motherLoopNumber: string;
  pastureName: string;
  saleSaleDate: Date;
  saleAmount: number;
  saleCarrierNumber: number;
  saleCustomerNumber: number;
  children: Child[];
  scans: Scan[];
  injections: Injection[];
}

interface Child {
  loopNumber: string;
  birthDate: Date;
}
interface Scan {
  scan_date: Date;
  result: boolean;
}
interface Injection {
  injectionDate: Date;
  substance: string;
}
export enum Status {
  DEAD,
  SOLD,
  ALIVE
}
