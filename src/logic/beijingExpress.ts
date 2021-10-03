import { Queue } from '@datastructures-js/queue'
import { TurnInfo, Vertex } from './model'

class Node {
  vertex  : Vertex
  previous: Node|null
  budget  : number

  constructor(vertex: Vertex, previous: Node|null, budget: number) {
    this.vertex   = vertex
    this.previous = previous
    this.budget   = budget
  }

  static fromTurnInfo({ position, budget }: TurnInfo): Node {
    return new Node(position, null, budget)
  }

  toTurnList(): TurnInfo[] {
    const result: TurnInfo[] = []
    for (let node: Node|null = this; node; node = node.previous) {
      result.push({
        position: node.vertex,
        budget: node.budget
      })
    }

    return result.reverse()
  }
}

export function makeTurn(turnInfo: TurnInfo, turn: number): TurnInfo {
  const processingQueue = new Queue<Node>([ Node.fromTurnInfo(turnInfo) ])
  let result: Node | null = null

  while (!result && !processingQueue.isEmpty()) {
    const delayedNodes: Node[] = []

    const node = processingQueue.dequeue()
    const { vertex, budget } = node

    if (node.vertex.id === 88) {
      result = node
      break
    }

    const viable = vertex.edges
      .filter(({ price }) => price <= budget)
      .filter(({ destination, price }) => {
        if (vertex === turnInfo.position && destination.critical && destination.occupied[turn]) {
          const waitingNode = new Node(node.vertex, node, budget)
          delayedNodes.push(new Node(destination, waitingNode, budget - price))

          return false
        }
        return true
      })

    for (const { destination, price } of viable) {
      const newNode = new Node(destination, node, budget - price)
      processingQueue.enqueue(newNode)
    }

    delayedNodes.forEach(n => {
      processingQueue.enqueue(n)
    })
  }

  if (!result) {
    throw new Error('Unsolvable Input')
  }
  
  const turnList = result.toTurnList()
  return turnList[1] ?? turnList[0]
}

export function beijingExpress(initialTurn: TurnInfo): TurnInfo[] {
  const result: TurnInfo[] = [ initialTurn ] 

  if (initialTurn.position.id === 88) {
    return result
  }

  let lastTurn = initialTurn
  let turnCounter = 0
  while (lastTurn.position.id !== 88) {
    lastTurn = makeTurn(lastTurn, turnCounter++)
    result.push(lastTurn)
  }

  return result
}
