import { useTheme } from '@mui/material'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-terminal'
import 'ace-builds/src-noconflict/theme-xcode'

interface JsonEditorProps {
  value: string
  onChange: (newValue: string) => void
}

export default function JsonEditor({ value, onChange }: JsonEditorProps) {
  const theme = useTheme()
  const dark = theme.palette.mode === 'dark'

  return (
    <AceEditor
      mode="json"
      theme={ dark ? 'terminal' : 'xcode' }
      name="INPUT_JSON_EDITOR"
      editorProps={{ $blockScrolling: true }}
      value={value}
      onChange={onChange}
      style={{ background: 'none' }}
      height="100%"
      width="100%"
    />
  )
}
