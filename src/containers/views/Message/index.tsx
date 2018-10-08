import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { ComponentExtends } from '@/utils/extends';
import styled from '@/styles';

interface IMessageProps extends IClassName {
  message: DataStore.IMessageList;
  getMessage: DataStore.IGetMessage;
  isMessageLoading: boolean;
}

@inject((store: IStore) => {
  const { message, getMessage } = store.dataStore;
  return { message, getMessage };
})
@observer
class Message extends ComponentExtends<IMessageProps> {
  public state = {
    index: 1
  };

  public rmMessage = (row: DataStore.IMessage) => async (e: React.MouseEvent<HTMLButtonElement>) => {
    await this.messageApi$$.rmMessage({ _id: row._id });
    await this.props.getMessage(this.state.index);
  };

  public onChangePage = (page: number) => {
    this.setState({
      index: page
    });
    this.props.getMessage(page);
  };

  public async componentDidMount() {
    this.props.getMessage();
  }

  public render() {
    const columns: Array<ColumnProps<DataStore.IMessage>> = [
      { title: 'Email', dataIndex: 'email', key: 'email' },
      { title: 'Time', dataIndex: 'time', key: 'time' },
      { title: 'Text', dataIndex: 'text', key: 'text' },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (text, record, index) => (
          <Button type="danger" onClick={this.rmMessage(text)}>
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
            pageSize: 10,
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
