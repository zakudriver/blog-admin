import * as React from 'react'
import styled from '@/styles'

interface IColorProps extends IClassName {}

class Color extends React.Component<IColorProps> {
  constructor(props: IColorProps) {
    super(props)
  }

  public render() {
    return (
      <div className={this.props.className}>Color</div>
    )
  }
}


export default styled(Color)``