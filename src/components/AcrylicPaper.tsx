import { Paper, PaperProps, styled, alpha } from '@mui/material'

const StyledPaper = styled(Paper)(({ theme }) => ({
  backdropFilter: 'blur(30px)', 
  background: `${alpha(theme.palette.background.paper, 0.7)} !important`
}))

export interface AcrylicPaperProps extends PaperProps {

}

export default function AcrylicPaper(props: AcrylicPaperProps) {
  return (
    <StyledPaper {...props} />
  )
}
