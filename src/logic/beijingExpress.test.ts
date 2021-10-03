import { makeTurn, inputDataToGameData, beijingExpress } from '.'

describe('makeTurn', () => {
  it('waits if critical node is occupied', () => {
    const [, initialTurn] = inputDataToGameData({
      locations: {
        number: 3,
        critical: [2]
      },
      connections: {
        source: [1, 2],
        target: [2, 88],
        price: [0, 0]
      },
      startLocation: 1,
      budget: 0,
      occupiedLocationsAfterEachTurn: [[2]]
    })

    const result = makeTurn({
      position: initialTurn.position,
      budget: 0
    }, 0)

    expect(result.position.id).toBe(1)
  })

  it('waits if destination node is occupied', () => {
    const [, initialTurn] = inputDataToGameData({
      locations: {
        number: 2,
        critical: [88]
      },
      connections: {
        source: [1],
        target: [88],
        price: [0, 0]
      },
      startLocation: 1,
      budget: 0,
      occupiedLocationsAfterEachTurn: [[88]]
    })

    const result = makeTurn({
      position: initialTurn.position,
      budget: 0
    }, 0)

    expect(result.position.id).toBe(1)
  })

  it('avoids occupied critical nodes', () => {
    const [, initialTurn] = inputDataToGameData({
      locations: {
        number: 4,
        critical: [2]
      },
      connections: {
        source: [1, 1, 2, 3],
        target: [2, 3, 88, 88],
        price: [0, 0, 0, 0]
      },
      startLocation: 1,
      budget: 0,
      occupiedLocationsAfterEachTurn: [[2]]
    })

    const result = makeTurn({
      position: initialTurn.position,
      budget: 0
    }, 0)

    expect(result.position.id).toBe(3)
  })

  it('uses unoccupied critical nodes', () => {
    const [, initialTurn] = inputDataToGameData({
      locations: {
        number: 3,
        critical: [2]
      },
      connections: {
        source: [1, 2],
        target: [2, 88],
        price: [0, 0]
      },
      startLocation: 1,
      budget: 0,
      occupiedLocationsAfterEachTurn: []
    })

    const result = makeTurn({
      position: initialTurn.position,
      budget: 0
    }, 0)

    expect(result.position.id).toBe(2)
  })

  it('throws if there is no solution', () => {
    const [, initialTurn] = inputDataToGameData({
      locations: {
        number: 3,
        critical: [2]
      },
      connections: {
        source: [1],
        target: [2],
        price: [0]
      },
      startLocation: 1,
      budget: 0,
      occupiedLocationsAfterEachTurn: []
    })

    expect(() => {
      makeTurn({
        position: initialTurn.position,
        budget: 0
      }, 0)
    }).toThrow()
  })
})

describe('beijingExpress', () => {
  test('1', () => {
    const [, initialTurn] = inputDataToGameData({ "locations": { "number": 4, "critical": [3] }, "connections": { "source": [3, 2, 1, 2, 3], "target": [2, 1, 88, 88, 88], "price": [3, 7, 9, 2, 1] }, "startLocation": 3, "budget": 21, "occupiedLocationsAfterEachTurn": [[1, 3], [2], [88, 3]] })

    const result = beijingExpress(initialTurn)

    expect(result.map(t => t.position.id)).toStrictEqual([3, 88])
  })

  test('2', () => {
    const [, initialTurn] = inputDataToGameData({ "locations": { "number": 10, "critical": [7, 6, 3] }, "connections": { "source": [2, 7, 3, 1, 9, 4, 6, 8, 5, 4], "target": [7, 3, 1, 9, 4, 6, 8, 5, 88, 5], "price": [3, 1, 5, 6, 2, 8, 3, 7, 2, 5] }, "startLocation": 2, "budget": 39, "occupiedLocationsAfterEachTurn": [[4, 9, 8, 88], [6, 1, 9], [4, 1, 3, 8, 9], [4, 5, 1, 9, 3], [3, 6, 1, 88, 5], [5, 4, 7, 3, 88], [4, 2, 5, 7], [9, 2, 8, 3], [4, 1, 6, 5], [4, 5, 9, 88, 6]] })

    const result = beijingExpress(initialTurn)

    expect(result.map(t => t.position.id)).toStrictEqual([2, 7, 3, 1, 9, 4, 5, 88])
  })

  test('3', () => {
    const [, initialTurn] = inputDataToGameData({"locations": {"number": 10, "critical": [8, 9, 4, 2]}, "connections": {"source": [8, 5, 1, 4, 9, 6, 2, 3, 7, 6, 2, 4, 3, 8, 6, 5, 9, 6, 2, 1, 5, 9, 1, 1, 4, 4, 8, 8, 8, 4], "target": [5, 1, 4, 9, 6, 2, 3, 7, 88, 7, 88, 88, 88, 9, 88, 88, 3, 3, 7, 9, 4, 2, 6, 7, 2, 6, 2, 4, 88, 3], "price": [6, 4, 1, 3, 2, 8, 2, 7, 8, 7, 2, 2, 3, 2, 1, 1, 4, 5, 4, 7, 3, 9, 6, 3, 3, 5, 1, 1, 8, 8]}, "startLocation": 8, "budget": 105, "occupiedLocationsAfterEachTurn": [[1, 88, 9], [3, 5], [9, 6], [8, 6, 3], [88, 3, 2], [7, 8, 4], [5, 3], [88, 1, 9], [7, 3], [2, 1, 3]]})

    const result = beijingExpress(initialTurn)

    expect(result.map(t => t.position.id)).toStrictEqual([8, 88])
  })

  test('4', () => {
    const [, initialTurn] = inputDataToGameData({"locations": {"number": 40, "critical": [20, 38, 39, 19, 11, 26, 1, 2, 15, 8]}, "connections": {"source": [8, 30, 16, 24, 10, 22, 19, 36, 13, 5, 11, 18, 26, 25, 4, 7, 6, 20, 32, 37, 1, 12, 27, 35, 3, 34, 9, 38, 28, 39, 2, 29, 23, 14, 33, 31, 21, 17, 15, 38, 37, 24, 22, 28, 14, 18, 30, 24, 20, 34, 9, 37, 11, 1, 35, 14, 9, 16, 20, 33], "target": [30, 16, 24, 10, 22, 19, 36, 13, 5, 11, 18, 26, 25, 4, 7, 6, 20, 32, 37, 1, 12, 27, 35, 3, 34, 9, 38, 28, 39, 2, 29, 23, 14, 33, 31, 21, 17, 15, 88, 23, 23, 38, 2, 31, 15, 35, 13, 34, 38, 39, 21, 88, 32, 34, 9, 21, 88, 11, 3, 21], "price": [4, 1, 6, 5, 3, 3, 7, 7, 5, 2, 3, 4, 8, 2, 3, 4, 1, 4, 7, 9, 8, 1, 6, 2, 8, 9, 7, 6, 8, 6, 8, 4, 5, 5, 4, 2, 6, 5, 9, 9, 2, 9, 3, 9, 4, 2, 5, 1, 2, 3, 9, 9, 7, 7, 9, 2, 2, 2, 5, 7]}, "startLocation": 8, "budget": 110, "occupiedLocationsAfterEachTurn": [[7, 30, 31, 25, 8], [28, 33, 4, 26, 6], [18, 25, 38, 20, 31, 14], [11, 20, 32, 6, 15], [32, 7, 20, 11, 3], [16, 20, 3, 34, 11, 6, 38], [9, 38, 35, 18, 3, 30, 11], [13, 11, 23, 24, 3, 21, 35], [16, 20, 30, 10, 32], [3, 8, 16, 32, 6, 22, 38], [9, 20, 2, 24, 37, 35, 28], [23, 6, 9, 32, 88], [35, 37, 20, 14, 11, 21], [31, 6, 5, 3, 16], [35, 11, 20, 24, 13, 33, 28], [32, 21, 6, 14, 34, 3, 10], [3, 1, 31, 11, 9, 35], [28, 18, 38, 12, 37, 33], [24, 9, 38, 32, 26], [28, 10, 21, 20, 24, 37, 11], [32, 6, 34, 5, 9, 23, 24], [16, 9, 3, 37, 11], [24, 16, 5, 30, 38], [10, 8, 38, 9, 34], [22, 34, 88, 39, 28, 21, 3], [15, 31, 17, 33, 28, 3], [15, 21, 39, 38, 20], [24, 23, 28, 32, 88, 2], [16, 38, 14, 37, 20], [20, 3, 32, 1, 28, 9, 6]]})

    const result = beijingExpress(initialTurn)

    expect(result.map(t => t.position.id)).toStrictEqual([8,30,16,24,34,9,88])
  })
  
  test('5', () => {
    const [, initialTurn] = inputDataToGameData({"locations": {"number": 7, "critical": [1, 5]}, "connections": {"source": [1, 2, 4, 6, 5, 3, 1, 1, 1, 6, 6], "target": [2, 4, 6, 5, 3, 88, 4, 6, 5, 88, 3], "price": [8, 7, 5, 1, 9, 1, 7, 5, 9, 9, 4]}, "startLocation": 1, "budget": 11, "occupiedLocationsAfterEachTurn": [[5, 2], [3], [88, 5], [6], [3, 4]]})

    const result = beijingExpress(initialTurn)

    expect(result.map(t => t.position.id)).toStrictEqual([1,6,3,88])
  })

  test('6', () => {
    const [, initialTurn] = inputDataToGameData({"locations": {"number": 20, "critical": [12, 13, 11, 17, 15, 19, 7, 2, 16, 14]}, "connections": {"source": [14, 13, 5, 15, 1, 10, 3, 18, 2, 9, 11, 6, 8, 19, 7, 4, 17, 12, 16, 4, 1, 1, 18, 13, 17, 17, 2, 10, 14, 11, 9, 2, 4, 12, 8, 14, 13, 7, 7, 7, 15, 19, 1, 3, 3, 8, 13, 4, 5, 6], "target": [13, 5, 15, 1, 10, 3, 18, 2, 9, 11, 6, 8, 19, 7, 4, 17, 12, 16, 88, 88, 7, 19, 4, 17, 88, 16, 16, 16, 4, 12, 88, 88, 12, 88, 4, 10, 1, 12, 17, 16, 4, 12, 11, 8, 16, 16, 7, 16, 17, 88], "price": [6, 2, 2, 1, 9, 9, 6, 2, 7, 6, 6, 8, 2, 5, 6, 1, 5, 4, 7, 6, 7, 1, 2, 1, 9, 3, 6, 5, 8, 5, 5, 5, 3, 4, 4, 3, 3, 7, 5, 9, 7, 8, 8, 7, 5, 6, 4, 5, 9, 2]}, "startLocation": 14, "budget": 11, "occupiedLocationsAfterEachTurn": [[4, 15, 8, 18], [15, 2, 8], [5, 1, 88, 16], [15, 10, 8, 16, 7], [88, 19, 7], [4, 2, 8, 13], [5, 14, 88, 12, 16], [10, 13, 17, 16], [1, 13, 5], [14, 10, 7, 1], [13, 15, 3, 12, 1], [15, 1, 10, 11, 7], [9, 11, 10], [2, 9, 14], [9, 13, 18, 10, 4], [4, 7, 2, 18], [4, 19, 18, 1, 17], [18, 7, 19, 1, 4], [2, 1, 8, 88], [2, 4, 88]]})

    expect(() => beijingExpress(initialTurn)).toThrow()
  })

  test('8', () => {
    const [, initialTurn] = inputDataToGameData({"locations": {"number": 50, "critical": [40, 26, 27, 12, 17, 37, 30, 24, 32, 25, 5, 14, 38, 33, 8, 41, 1, 49, 48, 29, 20, 2, 28, 31, 39, 7, 23, 15, 44, 11]}, "connections": {"source": [11, 2, 3, 18, 41, 49, 36, 37, 38, 9, 30, 25, 31, 35, 27, 5, 20, 12, 29, 47, 46, 26, 14, 32, 19, 44, 42, 10, 22, 4, 7, 45, 16, 40, 48, 34, 8, 23, 17, 6, 24, 21, 43, 39, 33, 28, 13, 15, 1, 38, 20, 40, 39, 41, 33, 38, 12, 37, 28, 26, 13, 17, 19, 31, 16, 24, 20, 47, 35, 37, 20, 15, 36, 34, 36, 44, 2, 31, 2, 9, 3, 44, 3, 24, 8, 16, 38, 18, 26, 6, 24, 18, 45, 32, 22, 44, 22, 30, 38, 10], "target": [2, 3, 18, 41, 49, 36, 37, 38, 9, 30, 25, 31, 35, 27, 5, 20, 12, 29, 47, 46, 26, 14, 32, 19, 44, 42, 10, 22, 4, 7, 45, 16, 40, 48, 34, 8, 23, 17, 6, 24, 21, 43, 39, 33, 28, 13, 15, 1, 88, 88, 1, 23, 1, 20, 1, 4, 24, 42, 15, 6, 88, 33, 10, 7, 33, 33, 40, 13, 44, 13, 15, 88, 47, 43, 14, 33, 28, 44, 22, 33, 49, 6, 44, 28, 21, 43, 40, 43, 44, 13, 88, 30, 6, 44, 88, 22, 34, 42, 19, 45], "price": [5, 2, 9, 2, 4, 4, 5, 4, 4, 2, 5, 7, 4, 3, 5, 4, 3, 8, 6, 1, 5, 7, 6, 1, 3, 6, 8, 4, 1, 6, 2, 2, 6, 6, 6, 4, 4, 6, 8, 1, 2, 6, 6, 3, 6, 5, 3, 9, 6, 6, 3, 4, 8, 5, 5, 8, 1, 2, 9, 6, 1, 8, 9, 6, 9, 7, 7, 4, 3, 1, 6, 3, 4, 5, 4, 2, 3, 1, 1, 6, 4, 8, 8, 6, 9, 3, 2, 6, 7, 6, 5, 7, 3, 9, 3, 9, 1, 5, 2, 9]}, "startLocation": 11, "budget": 167, "occupiedLocationsAfterEachTurn": [[49, 14, 43, 88, 38], [13, 32, 37, 36, 24], [49, 12, 38, 14, 36], [20, 19, 37, 40, 47], [10, 36, 29, 44, 23], [26, 22, 37, 12, 6], [34, 13, 6, 26, 14], [43, 6, 44, 24, 36], [47, 18, 88, 37, 33], [15, 30, 28, 38, 36], [40, 1, 33, 47, 28], [38, 39, 23, 9, 20], [8, 5, 4, 15, 41], [34, 27, 13, 88, 28], [43, 2, 24, 8, 6], [13, 26, 45, 33, 21], [46, 88, 1, 44, 10], [33, 47, 15, 26, 31], [24, 46, 13, 6, 7], [26, 21, 12, 47, 24], [8, 36, 44, 33, 43], [23, 21, 47, 17, 6], [26, 40, 46, 17, 29], [20, 46, 44, 48, 47], [1, 40, 42, 29, 5], [15, 10, 27, 30, 20], [88, 12, 18, 5, 13], [28, 20, 30, 29, 15], [1, 28, 47, 12, 41], [2, 29, 33, 24, 39]]})

    const result = beijingExpress(initialTurn)

    expect(result.map(t => t.position.id)).toStrictEqual([11, 2, 22, 88])
  })
})