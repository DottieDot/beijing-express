import { AppBar as MuiAppBar, Container, Toolbar, Typography } from '@mui/material'
import AcrylicPaper from './AcrylicPaper'

export default function AppBar () {
  return (
    <MuiAppBar position="sticky" component={AcrylicPaper}>
      <Container>
        <Toolbar sx={{ padding: '0 !important' }}>
          <Typography component="span" variant="h5">
            Beijing Express
          </Typography>
        </Toolbar>
      </Container>
    </MuiAppBar>
  )
}
