import * as React from 'react'
import styled from '@/styles'

interface IPrivateRouteProps extends IClassName {}

class PrivateRoute extends React.Component<IPrivateRouteProps> {
  constructor(props: IPrivateRouteProps) {
    super(props)
  }

  public render() {
    return (
      <div className={this.props.className}>PrivateRoute</div>
    )
  }
}


export default styled(PrivateRoute)``