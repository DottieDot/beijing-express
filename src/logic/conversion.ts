import { Theme } from '@mui/material'
import { Edge as GraphEdge, GraphData } from 'react-vis-network-graph'
import { GameData, InputData, TurnInfo, Vertex } from '.'

export function inputDataToGameData(input: InputData): [GameData, TurnInfo] {
  const {
    locations: Locations,
    connections: Connections,
    startLocation: StartLocation,
    budget: Budget,
    occupiedLocationsAfterEachTurn: OccupiedLocationsAfterEachTurn
  } = input

  const vertices: {[id: number]: Vertex} = {}
  for (let i = 1; i <= Locations.number; ++i) {
    const id = i === Locations.number ? 88 : i
    vertices[id] = {
      id: id,
      edges: [],
      critical: Locations.critical.includes(id),
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
    budget: Budget,
    usedEdge: null
  }

  return [
    gameData,
    turnInfo 
  ]
}

function getVertexColor({ id, critical, occupied }: Vertex, turnNr: number, turn: TurnInfo, theme: Theme): string {
  if (turn.position.id === id && id === 88) {
    return theme.palette.success.main
  }
  if (turn.position.id === id) {
    return theme.palette.info.dark
  }
  if (id === 88) {
    return theme.palette.secondary.main
  }
  if (critical && occupied[turnNr]) {
    return theme.palette.error.main
  }
  if (critical) {
    return theme.palette.warning.main
  }

  return theme.palette.primary.main
}

export function gameDataToGraphData(gameData: GameData, turnNr: number, turn: TurnInfo, theme: Theme): GraphData {
  return gameData.locations.reduce<GraphData>((accumulator, vertex) => {
    accumulator.nodes.push({
      id: vertex.id,
      label: `Station ${vertex.id}`,
      color: getVertexColor(vertex, turnNr, turn, theme)
    })

    const edges = vertex.edges.map<GraphEdge>(edge => ({
      from: edge.source.id,
      to: edge.destination.id,
      label: edge.price.toString(),
      color: edge === turn.usedEdge ? theme.palette.info.main : theme.palette.text.primary,
      width: edge === turn.usedEdge ? 3 : 0
    }))
    accumulator.edges.push(...edges)

    return accumulator
  }, { edges: [], nodes: [] })
}

export function inputDataFromString(str: string): InputData {
  const json = JSON.parse(str)
  const result: any = {}

  Object.keys(json).forEach(key => {
    const newKey = `${key[0].toLowerCase()}${key.substr(1)}`
    result[newKey] = json[key]
  })

  return result
}
