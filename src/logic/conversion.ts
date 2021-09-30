import { Theme } from '@mui/material'
import { GraphData, Edge as GraphEdge } from 'react-vis-network-graph'
import { GameData, InputData, TurnInfo, Vertex } from '.'

export function inputDataToGameData(input: InputData): [GameData, TurnInfo] {
  const {
    locations: Locations,
    connections: Connections,
    StartLocation,
    Budget,
    OccupiedLocationsAfterEachTurn
  } = input

  const vertices: {[id: number]: Vertex} = {}
  for (let i = 1; i <= Locations.number; ++i) {
    const id = i === Locations.number ? 88 : i
    vertices[id] = {
      id: id,
      edges: [],
      critical: Locations.critical.includes(i),
      occupied: {}
    }
  }

  for (let i = 0; i < Connections.source.length; ++i) {
    const source = Connections.source[i]
    const target = Connections.target[i]
    const price = Connections.price[i]

    vertices[source].edges.push({
      source: vertices[source],
      destination: vertices[target],
      price
    })
  }

  OccupiedLocationsAfterEachTurn.forEach((locations, turn) => {
    locations.forEach(location => {
      vertices[location].occupied[turn] = true
    })
  })

  const gameData: GameData = {
    locations: Object.values(vertices)
  }

  const turnInfo: TurnInfo = {
    position: vertices[StartLocation],
    budget: Budget
  }

  return [
    gameData,
    turnInfo 
  ]
}

function getVertexColor({ id, critical }: Vertex, theme: Theme): string {
  if (id === 88) {
    return theme.palette.secondary.main
  }
  if (critical) {
    return theme.palette.warning.main
  }
  
  return theme.palette.primary.main
}

export function gameDataToGraphData(gameData: GameData, theme: Theme): GraphData {
  return gameData.locations.reduce<GraphData>((accumulator, vertex) => {
    accumulator.nodes.push({
      id: vertex.id,
      label: `Station ${vertex.id}`,
      color: getVertexColor(vertex, theme)
    })

    const edges = vertex.edges.map<GraphEdge>(edge => ({
      from: edge.source.id,
      to: edge.destination.id
    }))
    accumulator.edges.push(...edges)

    return accumulator
  }, { edges: [], nodes: [] })
}
