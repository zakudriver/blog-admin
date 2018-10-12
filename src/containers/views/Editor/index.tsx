import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Input, Row, Col } from 'antd';
import { withRouterProps } from '@/components/utils/withComponents';
import { formatDateTime } from '@/utils';
import { Preview } from '@/components/common';
import styled from '@/styles';

import Edit from './Edit';
import Upload from './Upload';

interface IEditorProps extends IClassName, IRouterProps {
  selectionEdit: string;
  selectionLanguage: string;
  article: ArticleStore.IArticle;
  changeArticle: ArticleStore.IChangeArticle;
  getArticle: ArticleStore.IGetArticle;
  isUploadDisplay: boolean;
}

@withRouterProps
@inject(
  (store: IStore): IEditorProps => {
    const { selectionEdit, selectionLanguage, isUploadDisplay } = store.globalStore;
    const { article, changeArticle, getArticle } = store.articleStore;
    return { selectionEdit, selectionLanguage, article, changeArticle, getArticle, isUploadDisplay };
  }
)
@observer
class Editor extends React.Component<IEditorProps> {
  public onChangeArticleContent = (value: string) => {
    this.props.changeArticle({ content: value });
  };

  public onChangeArticleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.changeArticle({ title: e.target.value });
  };

  public componentDidMount() {
    const search = this.props.location!.search;
    if (search) {
      const _id = search.split('=')[1];
      this.props.getArticle(_id);
    }
  }

  public render() {
    // const options = {
    //   lineNumbers: true,
    //   theme: 'monokai',
    //   mode: 'markdown',
    //   extraKeys: { Ctrl: 'autocomplete' }
    // }

    return (
      <div className={this.props.className}>
        {this.props.isUploadDisplay && <Upload uploads={this.props.article.uploads} />}
        <div className="title">
          <Row>
            <Col span={this.props.article.isEdit ? 12 : 20} className="title__label">
              <label>Title : </label>
              <Input className="title__input" value={this.props.article.title} onChange={this.onChangeArticleTitle} />
            </Col>
            {this.props.article.isEdit && (
              <>
                <Col span={6} className="title__time">
                  <label>UpdateTime : </label>
                  <span>{formatDateTime(this.props.article.updateTime, false)}</span>
                </Col>
                <Col span={6} className="title__time">
                  <label>CreateTime : </label>
                  <span>{formatDateTime(this.props.article.createTime, false)}</span>
                </Col>
              </>
            )}
          </Row>
        </div>

        <Row gutter={10} className="edit__preview">
          <Col span={12} className="edit__wrapper">
            <Edit
              className="edit"
              value={this.props.article.content}
              onChange={this.onChangeArticleContent}
              type={this.props.selectionEdit}
              language={this.props.selectionLanguage}
            />
          </Col>
          <Col span={12} className="preview__wrapper">
            <Preview className="preview" value={this.props.article.content} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default styled(Editor)`
  height: 100%;
  width: 100%;
  overflow: hidden;

  .upload {
    padding: 6px;
    /* background-color: #fff; */
  }

  .title {
    background-color: #fff;
    line-height: 50px;
    padding: 0 20px;
    margin-bottom: 10px;

    &__input {
      width: 70%;
      margin-left: 20px;
      border: none;
      border-radius: 0;
      border-bottom: 1px solid ${props => props.theme.primaryColor};
      color: #555;
      font-size: 20px;
      &:focus {
        border: none;
        border-bottom: 1px solid ${props => props.theme.primaryColor};
        box-shadow: none;
      }
    }

    &__label {
      font-size: 18px;
      font-weight: 700;
    }

    &__time {
      text-align: right;
      & > label {
        font-weight: 600;
      }
      & > span {
        margin-left: 20px;
        color: ${props => props.theme.primaryColor};
      }
    }
  }
  .edit {
    &__wrapper {
      height: 100%;
    }
  }
  .preview {
    &__wrapper {
      height: 100%;
    }
  }

  .edit__preview {
    height: calc(100% - 50px);
  }
`;
