import * as React from 'react'
// import * as CodeMirror from 'react-codemirror'
import * as monacoEditor from 'monaco-editor'

import styled from '@/styles'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/mode/markdown/markdown'

import Monaco from './Monaco'

interface IEditProps extends IClassName {
  value: string
  onChange: (val: string, event?: monacoEditor.editor.IModelContentChangedEvent) => void
}

class Edit extends React.Component<IEditProps> {
  constructor(props: IEditProps) {
    super(props)
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
      <div className={this.props.className}>
        {/* <CodeMirror value={props.value} autoFocus={true} onChange={props.onChange} options={options} /> */}
        <Monaco
          width="100%"
          height="100%"
          value={this.props.value}
          theme="vs-dark"
          language="typescript"
          options={options}
          onChange={this.props.onChange}
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
  .ReactCodeMirror {
    height: 100%;
    & > .CodeMirror.cm-s-monokai {
      height: 100%;

      .CodeMirror-vscrollbar {
        /*滚动条整体部分,必须要设置*/
        ::-webkit-scrollbar {
          width: 4px;
          height: 0;
          background-color: #f7f7f7;
        }
        /*滚动条的轨道*/
        ::-webkit-scrollbar-track {
          background-color: #f7f7f7;
        }
        /*滚动条的滑块按钮*/
        ::-webkit-scrollbar-thumb {
          background-color: rgba(215, 215, 215, 1);
        }
        /*滚动条的上下两端的按钮*/
        ::-webkit-scrollbar-button {
          height: 0;
          background-color: #f7f7f7;
        }
      }
    }
  }
`
