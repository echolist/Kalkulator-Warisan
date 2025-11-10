export type Relation =
  | "Suami"
  | "Istri"
  | "Ayah"
  | "Ibu"
  | "Anak Laki-laki"
  | "Anak Perempuan"
  | "Saudara Kandung Laki-laki"
  | "Saudara Kandung Perempuan"
  | "Saudara Seibu Laki-laki"
  | "Saudara Seibu Perempuan";

export const RELATIONS: Relation[] = [
  "Suami",
  "Istri",
  "Ayah",
  "Ibu",
  "Anak Laki-laki",
  "Anak Perempuan",
  "Saudara Kandung Laki-laki",
  "Saudara Kandung Perempuan",
  "Saudara Seibu Laki-laki",
  "Saudara Seibu Perempuan",
];

export interface Member {
  id: number;
  name: string;
  relation: Relation;
}

export interface Result {
  id: number;
  name: string;
  relation: Relation;
  share: number;
  note?: string;
  shareFraction?: string;
  shareReal?: number;
}

export interface Asset {
  id: number;
  name: string;
  value: number;
}

export type Suggestion = {
  assetName: string;
  assignedTo: string;
  difference: number;
};