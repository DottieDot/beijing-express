import { Container, Box, Typography, useTheme, Button, Slider } from '@mui/material'
import { useMemo, useState } from 'react'
import { AcrylicPaper } from '../../components'
import JsonEditor from './JsonEditor'
import Graph from 'react-vis-network-graph'
import { gameDataToGraphData, inputDataToGameData } from '../../logic/conversion'

const inputData = {"locations": {"number": 20, "critical": [12, 13, 11, 17, 15, 19, 7, 2, 16, 14]}, "connections": {"source": [14, 13, 5, 15, 1, 10, 3, 18, 2, 9, 11, 6, 8, 19, 7, 4, 17, 12, 16, 4, 1, 1, 18, 13, 17, 17, 2, 10, 14, 11, 9, 2, 4, 12, 8, 14, 13, 7, 7, 7, 15, 19, 1, 3, 3, 8, 13, 4, 5, 6], "target": [13, 5, 15, 1, 10, 3, 18, 2, 9, 11, 6, 8, 19, 7, 4, 17, 12, 16, 88, 88, 7, 19, 4, 17, 88, 16, 16, 16, 4, 12, 88, 88, 12, 88, 4, 10, 1, 12, 17, 16, 4, 12, 11, 8, 16, 16, 7, 16, 17, 88], "price": [6, 2, 2, 1, 9, 9, 6, 2, 7, 6, 6, 8, 2, 5, 6, 1, 5, 4, 7, 6, 7, 1, 2, 1, 9, 3, 6, 5, 8, 5, 5, 5, 3, 4, 4, 3, 3, 7, 5, 9, 7, 8, 8, 7, 5, 6, 4, 5, 9, 2]}, "StartLocation": 14, "Budget": 11, "OccupiedLocationsAfterEachTurn": [[4, 15, 8, 18], [15, 2, 8], [5, 1, 88, 16], [15, 10, 8, 16, 7], [88, 19, 7], [4, 2, 8, 13], [5, 14, 88, 12, 16], [10, 13, 17, 16], [1, 13, 5], [14, 10, 7, 1], [13, 15, 3, 12, 1], [15, 1, 10, 11, 7], [9, 11, 10], [2, 9, 14], [9, 13, 18, 10, 4], [4, 7, 2, 18], [4, 19, 18, 1, 17], [18, 7, 19, 1, 4], [2, 1, 8, 88], [2, 4, 88]]}
const [gameData] = inputDataToGameData(inputData)

export default function HomePage() {
  const [input, setInput] = useState('')
  const theme = useTheme()
  const graph = useMemo(() => gameDataToGraphData(gameData, theme), [theme])

  return (
    <Container sx={{ height: '100%', display: 'flex', flexDirection: 'column', pt: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Simulator
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateAreas: `'input output'`,
          gridTemplateRows: '1fr',
          gridTemplateColumns: '1fr 1fr',
          columnGap: 2,
          rowGap: 2,
          flex: 1,
          pb: 2
        }}
      >
        <Box sx={{ gridArea: 'input', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', pb: 1 }}>
            <Typography variant="h5" component="h2">
              Input
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button variant="contained" size="small">
              Confirm
            </Button>
          </Box>
          <AcrylicPaper sx={{ flex: 1, overflow: 'hidden' }}>
            <JsonEditor value={input} onChange={setInput} />
          </AcrylicPaper>
        </Box>
        <Box sx={{ gridArea: 'output', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', pb: 1 }}>
            <Typography variant="h5" component="h2">
              Output
            </Typography>
            <Slider
              valueLabelDisplay="auto"
              valueLabelFormat={value => `Turn ${value}`}
              size="small"
              defaultValue={1}
              step={1}
              max={10}
              min={1}
              marks
              sx={{ ml: 3 }}
            />
          </Box>
          <AcrylicPaper sx={{ flex: 1, overflow: 'hidden' }}>
            <Graph
              graph={graph}
              options={{
                layout: {
                  
                },
                edges: {
                  color: theme.palette.mode === 'dark' ? '#fff' : '#000'
                },
                physics: {
                  enabled: true,

                },
                interaction: {
                  dragNodes: false
                },
                height: '100%',
                width: '100%'
              }}
            />
          </AcrylicPaper>
        </Box>
      </Box>
    </Container>
  )
}
