export interface PastureDTO {
  id: number;
  name: string;
  size: number;
}

export interface PasturePostDTO {
  name: string;
  size: number;
}

export interface BovinShortDTO {
  id: number;
  loopNumber: string;
}

export interface PastureFullDTO {
  name: string;
  actualBull: string;
  availableCows: BovinShortDTO[];
  pastureCows: BovinShortDTO[];
}
