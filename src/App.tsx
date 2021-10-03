import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'
import { HomePage } from './pages'
import { AppBar } from './components'
import { Box } from '@mui/system'

const theme = createTheme({
  palette: {
    mode: 'dark',
  }
})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%' 
        }}
      >
        <AppBar />
        <Box sx={{ flex: 1 }}>
          <HomePage />
        </Box>
      </Box>
    </ThemeProvider>
  )
}
