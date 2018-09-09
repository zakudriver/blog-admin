import * as React from 'react'
import * as ReactMarkdown from 'react-markdown'
import * as CodeMirror from 'react-codemirror'
import styled from '@/styles'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/mode/markdown/markdown'

interface IEditorProps extends IClassName {}

interface IEditorState {
  code: string
}

class Editor extends React.Component<IEditorProps, IEditorState> {
  constructor(props: IEditorProps) {
    super(props)
    this.state = {
      code: '// Code'
    }
  }

  public updateCode = (code: string) => (event: React.ChangeEvent) => {
    this.setState({
      code
    })
  }

  public render() {
    const input = '# This is a header\n\nAnd this is a paragraph'

    const options = {
      lineNumbers: true,
      theme: 'monokai',
      mode: 'markdown',
      extraKeys: { Ctrl: 'autocomplete' }
    }
    return (
      <div className={this.props.className}>
        <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} />
        {/* <ReactMarkdown source={input} /> */}
      </div>
    )
  }
}

export default styled(Editor)``
