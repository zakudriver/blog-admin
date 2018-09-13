import * as React from 'react'
import styled from '@/styles'
import { Table, Button } from 'antd'
import { ColumnProps } from 'antd/lib/table'

interface IMessageTableProps extends IClassName {}

interface IColumn {
  key: number
  email: string
  time: string
  text: string
}

class MessageTable extends React.Component<IMessageTableProps> {
  constructor(props: IMessageTableProps) {
    super(props)
  }

  public render() {
    const columns: Array<ColumnProps<IColumn>> = [
      { title: 'Email', dataIndex: 'email', key: 'email' },
      { title: 'Time', dataIndex: 'time', key: 'time' },
      { title: 'Text', dataIndex: 'text', key: 'text' },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: () => <Button type="danger">Delete</Button>
      }
    ]

    const data = [
      {
        key: 1,
        email: 'John Brown',
        time: '32',
        text: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
      }
    ]

    return (
      <div className={this.props.className}>
        <Table
          columns={columns}
          expandedRowRender={record => <p style={{ margin: 0 }}>{record.text}</p>}
          dataSource={data}
        />
      </div>
    )
  }
}

export default styled(MessageTable)`
  padding: 24px;
  background-color: #fff;
`
