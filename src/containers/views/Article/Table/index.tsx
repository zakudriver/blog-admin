import * as React from 'react'
import styled from '@/styles'
import { Table, Button, Modal } from 'antd'
import { ActionGroup } from '@/components/common'
import { ColumnProps } from 'antd/lib/table'

interface IArticleTableProps extends IClassName {}

interface IColumn {
  key: number
  title: string
  classify: string
  date: string
  content: string
  _id: string
}

class ArticleTable extends React.Component<IArticleTableProps> {
  public onEdit = (val: any) => (e: React.MouseEvent<HTMLButtonElement>) => {
    EditConfirm()
  }

  public onDelete = (val: any) => (e: React.MouseEvent<HTMLButtonElement>) => {
    DelConfirm()
  }

  public render() {
    const columns: Array<ColumnProps<IColumn>> = [
      { title: 'Title', dataIndex: 'title', key: 'title' },
      { title: 'Classify', dataIndex: 'classify', key: 'classify' },
      { title: 'Date', dataIndex: 'date', key: 'date' },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (text: any, record: any, index: any) => (
          <ActionGroup direction="right" ele="button">
            <Button type="primary" onClick={this.onEdit(text)}>
              Edit
            </Button>
            <Button type="danger" onClick={this.onDelete(text)}>
              Delete
            </Button>
          </ActionGroup>
        )
      }
    ]

    const data = [
      {
        key: 1,
        _id: 'id111',
        title: 'John Brown',
        classify: '32',
        date: 'New York No. 1 Lake Park',
        content:
          'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
      }
    ]

    return (
      <div className={this.props.className}>
        <Table
          columns={columns}
          expandedRowRender={record => <p style={{ margin: 0 }}>{record.content}</p>}
          dataSource={data}
        />
      </div>
    )
  }
}

const EditConfirm = () =>
  Modal.confirm({
    title: 'Confirm',
    content: 'Bla bla ...',
    okText: '确认',
    cancelText: '取消'
  })

const DelConfirm = () =>
  Modal.confirm({
    title: 'Warning',
    content: 'Bla bla ...',
    okText: '确认',
    cancelText: '取消'
  })

export default styled(ArticleTable)`
  padding: 24px;
  background-color: #fff;
`
