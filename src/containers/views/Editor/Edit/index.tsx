import * as React from 'react'
import * as CodeMirror from 'react-codemirror'
import styled from '@/styles'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/mode/markdown/markdown'

interface IEditProps extends IClassName {
  value: string
  onChange: (val: string) => void
}

// interface IEditState {
//   text: string
// }

// class Edit extends React.Component<IEditProps, IEditState> {
//   constructor(props: IEditProps) {
//     super(props)
//     this.state = {
//       code: '// Code'
//     }
//   }

//   public updateCode = (code: string) => {
//     this.setState({
//       code
//     })
//   }

//   public render() {
//     const options = {
//       lineNumbers: true,
//       theme: 'monokai',
//       mode: 'markdown',
//       tabSize: 2,
//       extraKeys: { Ctrl: 'autocomplete' }
//     }

//     return (
//       <div className={this.props.className}>
//         <CodeMirror value={this.state.code} autoFocus={true} onChange={this.onChange} options={options} />
//       </div>
//     )
//   }
// }

const options = {
  lineNumbers: true,
  theme: 'monokai',
  mode: 'markdown',
  tabSize: 2,
  extraKeys: { Ctrl: 'autocomplete' }
}

const Edit = (props: IEditProps) => {
  return (
    <div className={props.className}>
      <CodeMirror value={props.value} autoFocus={true} onChange={props.onChange} options={options} />
    </div>
  )
}

export default styled(Edit)`
  .ReactCodeMirror {
    height: 100%;
    & > .CodeMirror.cm-s-monokai {
      height: 100%;
    }
  }
`
