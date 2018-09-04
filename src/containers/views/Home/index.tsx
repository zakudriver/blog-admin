import * as React from 'react'
import styled from '@/styles'
import { withRouter } from 'react-router';

interface IHomeProps extends IClassName {}

class Home extends React.Component<IHomeProps> {
  constructor(props: IHomeProps) {
    super(props)
  }

  public render() {
    const T= withRouter((props:any)=>{
      function aaa(){
        props.history.push('/login')
        console.log(props)
      }

      return(<div onClick={aaa}>111</div>)
    })
    return (
      <div className={this.props.className}>
        Home1
        <T></T>
      </div>
    )
  }
}

export default styled(Home)``
