
export interface Edge {
  vertex1: Vertex
  vertex2: Vertex
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
}

