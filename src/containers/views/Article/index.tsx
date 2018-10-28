import * as React from 'react';
import { observer, inject } from 'mobx-react';
import styled from '@/styles';
import { Table, Button, Modal } from 'antd';
import { ActionGroup, Preview } from '@/components/common';
import { withRouterProps } from '@/components/utils/withComponents';
import { ComponentExtends } from '@/utils/extends';
import { formatDateTime } from '@/utils';
import { ArticlePage } from '@/constants/enum';
import { ColumnProps } from 'antd/lib/table';

const ActionItem = ActionGroup.ActionItem;

interface IArticleProps extends IClassName, IWithRouterProps {
  getArticleList: ArticleStore.IGetArticleList;
  articleList: ArticleStore.IArticleList;
}

@withRouterProps
@inject((store: IStore) => {
  const { getArticleList, articleList } = store.articleStore;
  return {
    getArticleList,
    articleList
  };
})
@observer
class Article extends ComponentExtends<IArticleProps> {
  public state = {
    index: 1
  };

  public onEdit = (row: any) => (e: React.MouseEvent<HTMLButtonElement>) => {
    this.props.history!.push(`/editor?article=${row._id}`);
  };

  public onDelete = (row: any) => (e: React.MouseEvent<HTMLButtonElement>) => {
    Modal.confirm({
      title: 'Warning',
      content: 'Bla bla ...',
      okText: 'ok',
      okType: 'danger',
      cancelText: 'no',
      onOk: async () => {
        const res = await this.articleApi$$.removeArticle({ _id: row._id });
        if (res.code === 0) {
          this.$message.success(res.msg);
          await this.articleApi$$.getArticleList(this.state.index);
        } else {
          this.$message.error(res.msg);
        }
      }
    });
  };

  public onChangePage = (page: number) => {
    this.setState({
      index: page
    });
    this.props.getArticleList(page);
  };

  public componentDidMount() {
    this.props.getArticleList();
  }

  public render() {
    const columns: Array<ColumnProps<ArticleStore.IArticle>> = [
      { title: 'Title', dataIndex: 'title', key: 'title' },
      { title: 'Classification', dataIndex: 'className.name', key: 'className._id' },
      {
        title: 'UpdateTime',
        dataIndex: 'updateTime',
        key: 'updateTime',
        render: (text, record) => <span>{formatDateTime(record.updateTime)}</span>
      },
      {
        title: 'CreateTime',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text, record) => <span>{formatDateTime(record.createTime)}</span>
      },
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

    return (
      <div className={this.props.className}>
        {/* <ArticleTable /> */}
        <Table
          className="article__table"
          columns={columns}
          expandedRowRender={record => <Preview value={record.content} />}
          dataSource={this.props.articleList.rows}
          pagination={{
            current: this.state.index,
            pageSize: ArticlePage.Limit,
            total: this.props.articleList.count,
            onChange: this.onChangePage
          }}
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
