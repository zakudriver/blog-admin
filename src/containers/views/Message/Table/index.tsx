import * as React from 'react'
import styled from '@/styles'
import { Table } from 'antd'

interface IMessageTableProps extends IClassName {}

class MessageTable extends React.Component<IMessageTableProps> {
  constructor(props: IMessageTableProps) {
    super(props)
  }

  public render() {
    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Age', dataIndex: 'age', key: 'age' },
      { title: 'Address', dataIndex: 'address', key: 'address' },
      { title: 'Action', dataIndex: '', key: 'x', render: () => <a href="javascript:;">Delete</a> }
    ]

    let data = [
      {
        key: 1,
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
      },
      {
        key: 2,
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
      },
      {
        key: 3,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
      }
    ]

    return (
      <div className={this.props.className}>
        <Table
          columns={columns}
          expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
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
