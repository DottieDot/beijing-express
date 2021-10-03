
export interface Edge {
  source: Vertex
  destination: Vertex
  price: number
}

export interface Vertex {
  id: number
  edges: Edge[]
  critical: boolean
  occupied: {[turnNr: number]: boolean}
}

export interface GameData {
  locations: Vertex[]
}

export interface TurnInfo {
  position: Vertex 
  budget: number
  usedEdge: Edge | null
}

export interface InputData {
  locations: {
    number: number
    critical: number[]
  },
  connections: {
    source: number[]
    target: number[]
    price: number[]
  }
  startLocation: number
  budget: number
  occupiedLocationsAfterEachTurn: number[][]
}
