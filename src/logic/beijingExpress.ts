import { GameData, TurnInfo, Vertex } from './model'

function makeTurn(game: GameData, turnInfo: TurnInfo): TurnInfo {
  return {
    position: {} as Vertex,
    budget: 69
  }
}

export function beijingExpress(game: GameData, initialTurn: TurnInfo): TurnInfo[] {
  const result: TurnInfo[] = []

  let lastTurn = initialTurn
  while (lastTurn.position.id !== 88) {
    const turn = makeTurn(game, lastTurn)
    result.push(turn)
  }

  return result
}
