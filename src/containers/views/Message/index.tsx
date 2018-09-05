import * as React from 'react'
import styled from '@/styles'
import MessageTable from '@/containers/views/Message/Table'

interface IMessageProps extends IClassName {}

class Message extends React.Component<IMessageProps> {
  constructor(props: IMessageProps) {
    super(props)
  }

  public render() {
    return (
      <div className={this.props.className}>
        <MessageTable />
      </div>
    )
  }
}

export default styled(Message)``
