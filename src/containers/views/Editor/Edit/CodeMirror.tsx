import * as React from 'react'
import * as CodeMirror from 'react-codemirror'
import styled from '@/styles'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/javascript/javascript'

interface ICodeMirrorEditorProps extends IClassName {
  value: string
  language: string
  onChange: (val: string) => void
}

class CodeMirrorEditor extends React.Component<ICodeMirrorEditorProps> {
  public render() {
    const options = {
      lineNumbers: true,
      theme: 'monokai',
      mode: this.props.language,
      tabSize: 2,
      extraKeys: { Ctrl: 'autocomplete' }
    }

    return (
      <div className={this.props.className}>
        <CodeMirror value={this.props.value} autoFocus={true} onChange={this.props.onChange} options={options} />
      </div>
    )
  }
}
export default styled(CodeMirrorEditor)`
  height: 100%;
  .ReactCodeMirror {
    height: 100%;
    & > .CodeMirror.cm-s-monokai {
      height: 100%;

      .CodeMirror-vscrollbar {
        /*滚动条整体部分,必须要设置*/
        ::-webkit-scrollbar {
          width: 6px;
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

  .CodeMirror-scroll {
    /* padding: 6px 0; */
  }

  .CodeMirror-line {
    padding-left: 22px;
  }

  .CodeMirror-linenumber.CodeMirror-gutter-elt {
    padding-left: 16px !important;
  }
`
