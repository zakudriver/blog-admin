import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { ComponentExtends } from '@/utils/extends';
import { MessagePage } from '@/constants/enum';
import styled from '@/styles';

interface IMessageProps extends IClassName {
  message: MessageStore.IMessageList;
  getMessage: MessageStore.IGetMessage;
  isMessageLoading: boolean;
}

@inject((store: IStore) => {
  const { message, getMessage } = store.messageStore;
  return { message, getMessage };
})
@observer
class Message extends ComponentExtends<IMessageProps> {
  public state = {
    index: 1
  };

  public removeMessage = (row: MessageStore.IMessage) => async (e: React.MouseEvent<HTMLButtonElement>) => {
    const res = await this.messageApi$$.removeMessage({ _id: row._id });
    if (res.code === 0) {
      await this.props.getMessage(this.state.index);
    }
  };

  public onChangePage = (page: number) => {
    this.setState({
      index: page
    });
    this.props.getMessage(page);
  };

  public componentDidMount() {
    this.props.getMessage();
  }

  public render() {
    const columns: Array<ColumnProps<MessageStore.IMessage>> = [
      { title: 'Email', dataIndex: 'email', key: 'email' },
      { title: 'Time', dataIndex: 'time', key: 'time' },
      { title: 'Text', dataIndex: 'text', key: 'text' },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (text, record, index) => (
          <Button type="danger" onClick={this.removeMessage(text)}>
            Delete
          </Button>
        )
      }
    ];

    const dataSource = this.props.message.rows.map((i, idx) => {
      i.key = i._id;
      return i;
    });
    return (
      <div className={this.props.className}>
        <Table
          className="message__table"
          columns={columns}
          loading={this.props.isMessageLoading}
          expandedRowRender={record => <p style={{ margin: 0 }}>{record.text}</p>}
          dataSource={dataSource}
          pagination={{
            current: this.state.index,
            pageSize: MessagePage.Limit,
            total: this.props.message.count,
            onChange: this.onChangePage
          }}
        />
      </div>
    );
  }
}

export default styled(Message)`
  .message__table {
    padding: 24px;
    background-color: #fff;
  }
`;
