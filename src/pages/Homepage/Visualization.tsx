import { Box, Slider, Typography, useTheme } from '@mui/material'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import Graph from 'react-vis-network-graph'
import { AcrylicPaper } from '../../components'
import { beijingExpress, InputData } from '../../logic'
import { gameDataToGraphData, inputDataToGameData } from '../../logic/conversion'

export default function Visualization({ inputData }: { inputData: InputData }) {
  const theme = useTheme()
  const [gameData, initialTurn] = useMemo(() => inputDataToGameData(inputData), [inputData])
  const turns = useMemo(() => beijingExpress(initialTurn), [initialTurn])
  const [turn, setTurn] = useState(1)
  const graph = useMemo(() => gameDataToGraphData(gameData, turn, turns[turn - 1], theme), [gameData, theme, turns, turn])

  useEffect(() => {
    setTurn(1)
  }, [turns])

  const handleTurnChange = useCallback((_, value: number | number[]) => {
    if (!Array.isArray(value)) {
      setTurn(value)
    }
  }, [setTurn])

  return (
    <Fragment>
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
          max={turns.length}
          min={1}
          marks
          sx={{ ml: 3 }}
          value={turn}
          onChange={handleTurnChange}
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
    </Fragment>
  )
}