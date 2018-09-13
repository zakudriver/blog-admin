import * as React from 'react'
import * as monacoEditor from 'monaco-editor'
import styled from '@/styles'
import Monaco from './Monaco'
import CodeMirror from './CodeMirror'

interface IEditProps extends IClassName {
  value: string
  onChange: (val: string, event?: monacoEditor.editor.IModelContentChangedEvent) => void
  type: string
  language: string
}

class Edit extends React.Component<IEditProps, any> {
  public render() {
    const monacoOptions = {
      selectOnLineNumbers: true,
      parameterHints: true
    }

    return (
      <div className={this.props.className}>
        {this.props.type === 'Monaco' ? (
          <Monaco
            width={'100%'}
            height={'100%'}
            value={this.props.value}
            theme="vs-dark"
            language={this.props.language}
            options={monacoOptions}
            onChange={this.props.onChange}
          />
        ) : (
          <CodeMirror value={this.props.value} language={this.props.language} onChange={this.props.onChange} />
        )}
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
  overflow: hidden;
  .monaco__container {
    & > div {
      padding: 10px 0;
    }
  }
`
