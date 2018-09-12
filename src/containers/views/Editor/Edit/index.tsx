import * as React from 'react'
import * as monacoEditor from 'monaco-editor'
import { computed } from 'mobx'
import styled from '@/styles'
import Monaco from './Monaco'

interface IEditProps extends IClassName {
  value: string
  onChange: (val: string, event?: monacoEditor.editor.IModelContentChangedEvent) => void
  isCollapsed: boolean
}

class Edit extends React.Component<IEditProps, any> {
  setRef: HTMLElement | null
  constructor(props: IEditProps) {
    super(props)
    this.setRef = null
  }

  @computed
  get containerWidth() {
    return this.setRef && this.setRef.clientWidth
  }

  public monacoDidMount = (editor: monacoEditor.editor.IStandaloneCodeEditor, monaco: typeof monacoEditor) => {
    console.log('editorDidMount', editor)
    editor.focus()
  }

  public render() {
    const options = {
      selectOnLineNumbers: true,
      parameterHints: true
    }
    return (
      <div className={this.props.className} ref={ref => (this.setRef = ref)}>
        <Monaco
          width={this.containerWidth || '100%'}
          height={'100%'}
          value={this.props.value}
          theme="vs-dark"
          language="typescript"
          options={options}
          onChange={this.props.onChange}
          monacoDidMount={this.monacoDidMount}
        />
      </div>
    )
  }
}

// const options = {
//   lineNumbers: true,
//   theme: 'monokai',
//   mode: 'markdown',
//   tabSize: 2,
//   extraKeys: { Ctrl: 'autocomplete' }
// }

// const options = {
//   selectOnLineNumbers: true
// }

// const Edit = (props: IEditProps) => {
//   function editorDidMount(editor, monaco) {
//     console.log('editorDidMount', editor)
//     editor.focus()
//   }

//   return (
//     <div className={props.className}>
//       {/* <CodeMirror value={props.value} autoFocus={true} onChange={props.onChange} options={options} /> */}
//       <Monaco
//         width="100%"
//         height="100%"
//         value={'test'}
//         language="javascript"
//         options={options}
//         onChange={val => console.log(val)}
//         monacoDidMount={editorDidMount}
//       />
//     </div>
//   )
// }

export default styled(Edit)`
  height: 100%;
  .monaco__container {
    & > div {
      padding: 10px 0;
    }
  }
`
