import * as React from 'react'
import styled from '@/styles'

import Edit from './Edit'
import Preview from './Preview'

interface IEditorProps extends IClassName {}

interface IEditorState {
  value: string
}

class Editor extends React.Component<IEditorProps, IEditorState> {
  constructor(props: IEditorProps) {
    super(props)
    this.state = {
      value: 'test'
    }
  }

  onInput = (val: string) => {
    console.log(val)
    this.setState({
      value: val
    })
  }

  public render() {
    return (
      <div className={this.props.className}>
        <Edit value={this.state.value} onChange={this.onInput} />
        <Preview value={this.state.value} />
      </div>
    )
  }
}

export default styled(Editor)`
  height: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 100%;
  grid-column-gap: 10px;
`
