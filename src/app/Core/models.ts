export interface PathRequestModel {
  sourcePoint: number,
  destinations: Array<number>,
  useWyvern: boolean,
  useSoe: boolean,
  useShips: boolean,
}

export enum MoveType {
  GK = 1,
  Wyvern = 2,
  Ship = 3,
  Paradox = 4,
  SoE = 5
}

export interface PathModel {
  source: string,
  destination: string,
  price: number,
  type: MoveType
}

export interface CalculationResultModel {
  defaultPath: Array<PathModel>,
  customPath: Array<PathModel>,
  defaultPrice: number,
  customPrice: number
}

export interface NodeModel {
  id: number,
  name: string
}
