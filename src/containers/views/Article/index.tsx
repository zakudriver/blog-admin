import * as React from 'react';
import { observer, inject } from 'mobx-react';
import styled from '@/styles';
import { Table, Button, Modal } from 'antd';
import { ActionModel } from '@/components/common';
import { ColumnProps } from 'antd/lib/table';

const ActionGroup = ActionModel.ActionGroup;
const ActionItem = ActionModel.ActionItem;

interface IArticleProps extends IClassName {
  getArticleList: DataStore.IGetArticleList;
  articleList: DataStore.IArticleList;
}

@inject((store: IStore) => {
  const { getArticleList, articleList } = store.dataStore;
  return {
    getArticleList,
    articleList
  };
})
@observer
class Article extends React.Component<IArticleProps> {
  public onEdit = (val: any) => (e: React.MouseEvent<HTMLButtonElement>) => {
    EditConfirm();
  };

  public onDelete = (val: any) => (e: React.MouseEvent<HTMLButtonElement>) => {
    DelConfirm();
  };

  public componentDidMount() {
    this.props.getArticleList();
  }

  public render() {
    const columns: Array<ColumnProps<DataStore.IArticle>> = [
      { title: 'Title', dataIndex: 'title', key: 'title' },
      { title: 'Classification', dataIndex: 'className.name', key: 'className._id' },
      { title: 'UpdateTime', dataIndex: 'updateTime', key: 'updateTime' },
      { title: 'CreateTime', dataIndex: 'createTime', key: 'createTime' },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (text: any, record: any, index: any) => (
          <ActionGroup direction="right">
            <ActionItem>
              <Button type="primary" onClick={this.onEdit(text)}>
                Edit
              </Button>
            </ActionItem>
            <ActionItem>
              <Button type="danger" onClick={this.onDelete(text)}>
                Delete
              </Button>
            </ActionItem>
          </ActionGroup>
        )
      }
    ];

    const dataSource = this.props.articleList.rows.map(i => {
      i.key = i._id;
      return i;
    });
    return (
      <div className={this.props.className}>
        {/* <ArticleTable /> */}
        <Table
          className="article__table"
          columns={columns}
          expandedRowRender={record => <p style={{ margin: 0 }}>{record.content}</p>}
          dataSource={dataSource}
        />
      </div>
    );
  }
}

export default styled(Article)`
  .article__table {
    padding: 24px;
    background-color: #fff;
  }
`;

const EditConfirm = () =>
  Modal.confirm({
    title: 'Confirm',
    content: 'Bla bla ...',
    okText: '确认',
    cancelText: '取消'
  });

const DelConfirm = () =>
  Modal.confirm({
    title: 'Warning',
    content: 'Bla bla ...',
    okText: '确认',
    cancelText: '取消'
  });
