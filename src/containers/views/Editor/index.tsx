import * as React from 'react'
import { inject, observer } from 'mobx-react'
import styled from '@/styles'

import Edit from './Edit'
import Preview from './Preview'

interface IEditorProps extends IClassName {
  isCollapsed?: boolean
  selectionEdit?: string
  selectionLanguage?: string
}

interface IEditorState {
  value: string
}

@inject(
  (store: IStore): IEditorProps => {
    const { isCollapsed, selectionEdit, selectionLanguage } = store.globalStore
    return { isCollapsed, selectionEdit, selectionLanguage }
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

  public updateCode = (value: string) => (event: React.ChangeEvent) => {
    this.setState({
      value
    })
  }

  public render() {
    // const options = {
    //   lineNumbers: true,
    //   theme: 'monokai',
    //   mode: 'markdown',
    //   extraKeys: { Ctrl: 'autocomplete' }
    // }
    return (
      <div className={this.props.className}>
        <Edit value={this.state.value} onChange={this.onInput} type={this.props.selectionEdit!} language={this.props.selectionLanguage!}/>
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
  grid-template-rows: 100%;
  grid-gap: 10px;
`
