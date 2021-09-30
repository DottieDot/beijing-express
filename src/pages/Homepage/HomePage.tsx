import { Container, Box, Typography } from '@mui/material'
import { useState } from 'react'
import { AcrylicPaper } from '../../components'
import JsonEditor from './JsonEditor'

export default function HomePage() {
  const [input, setInput] = useState('')

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
          <Typography variant="h5" component="h2" gutterBottom>
            Input
          </Typography>
          <AcrylicPaper sx={{ flex: 1, overflow: 'hidden' }}>
            <JsonEditor value={input} onChange={setInput} />
          </AcrylicPaper>
        </Box>
        <Box sx={{ gridArea: 'output', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Output
          </Typography>
          <AcrylicPaper sx={{ flex: 1, overflow: 'hidden' }}>

          </AcrylicPaper>
        </Box>
      </Box>
    </Container>
  )
}
