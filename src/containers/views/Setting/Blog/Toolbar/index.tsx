import * as React from 'react'
import styled from '@/styles'

interface IToolbarProps extends IClassName {}

class Toolbar extends React.Component<IToolbarProps> {
  constructor(props: IToolbarProps) {
    super(props)
  }

  public render() {
    return (
      <div className={this.props.className}>Toolbar</div>
    )
  }
}


export default styled(Toolbar)``