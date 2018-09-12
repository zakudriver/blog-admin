import * as React from 'react'
import { inject, observer } from 'mobx-react'
import styled from '@/styles'

import Edit from './Edit'
import Preview from './Preview'

interface IEditorProps extends IClassName {
  isCollapsed?: boolean
}

interface IEditorState {
  value: string
}

@inject(
  (store: IStore): IEditorProps => {
    const { isCollapsed } = store.globalStore
    return { isCollapsed }
  }
)
@observer
class Editor extends React.Component<IEditorProps, IEditorState> {
  autoCollapsed: any
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
        <Edit value={this.state.value} onChange={this.onInput} isCollapsed={this.props.isCollapsed!} />
        <Preview value={this.state.value} />
      </div>
    )
  }
}

export default styled(Editor)`
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;
  grid-gap: 10px;
`
