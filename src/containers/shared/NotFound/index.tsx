import * as React from 'react'
import styled from '@/styles'

interface INotFoundProps extends IClassName {}

class NotFound extends React.Component<INotFoundProps> {
  constructor(props: INotFoundProps) {
    super(props)
  }

  public render() {
    return (
      <div className={this.props.className}>NotFound</div>
    )
  }
}


export default styled(NotFound)``