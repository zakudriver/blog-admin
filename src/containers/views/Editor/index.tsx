import * as React from 'react'
import styled from '@/styles'

import Edit from './Edit'
import Preview from './Preview'

interface IEditorProps extends IClassName {}

class Editor extends React.Component<IEditorProps> {
  constructor(props: IEditorProps) {
    super(props)
    this.state = {
      code: '// Code'
    }
  }

  public render() {
    return (
      <div className={this.props.className}>
        <Edit />
        <Preview />
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
