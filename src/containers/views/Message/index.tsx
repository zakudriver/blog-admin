import * as React from 'react';
import styled from '@/styles';
import { inject, observer } from 'mobx-react';
import MessageTable from '@/containers/views/Message/Table';

interface IMessageProps extends IClassName {
  message?: DataStore.IMessage[];
  getMessage: DataStore.IGetMessage;
}

@inject((store: IStore) => {
  const { message, getMessage } = store.dataStore;
  return { message, getMessage };
})
@observer
class Message extends React.Component<IMessageProps> {
  constructor(props: IMessageProps) {
    super(props);
  }

  async componentDidMount() {
    this.props.getMessage()
  }

  public render() {
    return (
      <div className={this.props.className}>
        <MessageTable />
      </div>
    );
  }
}

export default styled(Message)``;
