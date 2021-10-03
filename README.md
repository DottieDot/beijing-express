# Beijing Express

School assignment for Algorithms 1.

## Assignment

This assignment is a local simulation of a multi-player game inspired by the reality TV game Peking Express (https://en.wikipedia.org/wiki/Peking_Express), where participant couples engage in a hitchhiking race to the end destination Beijing (Peking).

You form a couple with another student and are together responsible for one character in the game. A map is given as a graph with locations and connections, where Peking is the destination location. Also given is a budget and a start location – same for each couple. In every turn, your character can move from the current location to a new one, along an available connection, or can choose to wait a round in the current location. Each move from a location to another has a cost (ticket price) associated with it. Some critical locations can only accommodate one player at a time, which means that the location, if occupied, is temporarily unavailable.

The challenge is to design and implement an algorithm that drives the moves of your character from the start location to Peking, in a minimal number of moves. Of course, the total amount spent on tickets for the whole route should fit in the budget.

The following functions need to be implemented:
- initializeGame (Json game)<br>
\- read all the game information, which is provided in a Json format (see the example
input below)
- updateOccupiedLocations (locationList)<br>
\- after every move of your own, this function should update the currently occupied locations on your locally maintained map. This is necessary for the availability checks of the critical locations.
- nextMove() : int<br>
\- when it is your turn to move, compute and return the new location of your character
Note: You can make couples yourself, in Canvas, ALG1-groups. If you prefer to travel alone, that is also fine!
See below the exact provided Input, required Output and the main structure of your algorithm using the required building blocks functionalities.

### Input

The (text) test files for this assignment will contain one Json structure with the initial game information + a simulation of the competitors behaviour, in the form of a list of occupied locations after each turn. An occupied location is a location where, at the end of the current turn, at least one group is present. When the update list ends, all locations count as free (unoccupied).

```json
{
  "Locations": {
    "number":4, // total number of locations on the map, max. 88 
    "critical": [3] // the list of critical locations
  },
  "Connections": {
    "source": [1, 1, 1, 2, 3], // source[i] – target[i] is a connection 
    "target": [2, 3, 88, 3, 88],
    "price": [1, 3, 7, 1, 1] // and the transport cost is price[i]
  },
  "StartLocation":1,
  "Budget":5,
  "OccupiedLocationsAfterEachTurn": [[2,3],[3],[88],[88]] 
}
```
*Note*: The given occupied locations list only shows “the competitors”, not your own location. If you happen to be in a location that gets marked as occupied at the end of the turn, you may stay there. The list starts at (end of) turn 1.

### Output
The output should be a list of locations describing your path from the start location to Peking (=location 88).

For example, the output `[1,2,2,2,3,88]` describes the path:
- started in startLocation 1
- turn 1: moved to location 2
- turn 2: stayed in location 2
- turn 3: moved to location 3
- turn 4: moved to location 88

### Strategy
Your algorithm will look like this:
```py
# read from the input file
def initializeGame (game):
  currentTurn = 1
  MyPath = []
  while currentLocation != 88:
    MyPath = MyPath + nextMove()
    updateOccupiedLocations(OccupiedLocations[currentTurn])
  print(MyPath)
```
