import { Box, Button, Container, Typography } from '@mui/material'
import { useCallback, useState } from 'react'
import { AcrylicPaper } from '../../components'
import { InputData } from '../../logic'
import { inputDataFromString } from '../../logic/conversion'
import JsonEditor from './JsonEditor'
import Visualization from './Visualization'

export default function HomePage() {
  const [input, setInput] = useState('')
  const [inputData, setInputData] = useState<InputData|null>(null)
  
  const handleConfirmInput = useCallback(() => {
    setInputData(inputDataFromString(input))
  }, [setInputData, input])

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
            <Button 
              variant="contained" 
              size="small"
              onClick={handleConfirmInput}
            >
              Confirm
            </Button>
          </Box>
          <AcrylicPaper sx={{ flex: 1, overflow: 'hidden' }}>
            <JsonEditor value={input} onChange={setInput} />
          </AcrylicPaper>
        </Box>
        <Box sx={{ gridArea: 'output', display: 'flex', flexDirection: 'column' }}>
          {inputData ? (
            <Visualization inputData={inputData} />
          ) : (
            null
          )}
        </Box>
      </Box>
    </Container>
  )
}
