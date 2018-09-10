import * as React from 'react'
import * as CodeMirror from 'react-codemirror'
import styled from '@/styles'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/mode/markdown/markdown'

interface IEditProps extends IClassName {}

interface IEditState {
  code: string
}

class Edit extends React.Component<IEditProps, IEditState> {
  constructor(props: IEditProps) {
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
    const options = {
      lineNumbers: true,
      theme: 'monokai',
      mode: 'markdown',
      tabSize: 2,
      extraKeys: { Ctrl: 'autocomplete' }
    }

    console.log(<CodeMirror value={this.state.code} autoFocus={true} onChange={this.updateCode} options={options} />)
    return (
      <div className={this.props.className}>
        <CodeMirror value={this.state.code} autoFocus={true} onChange={this.updateCode} options={options}/>
      </div>
    )
  }
}

export default styled(Edit)``
