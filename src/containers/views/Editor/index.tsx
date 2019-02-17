import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Input, Row, Col } from 'antd';

import { withRouterProps } from '@/components/utils/withComponents';
import { formatDateTime } from '@/utils';
import { Preview } from '@/components/common';
import styled from '@/styles';

import Edit from './Edit';
import Upload from './Upload';
import Cover from './Cover';

interface IEditorProps extends IClassName, IWithRouterProps {
  token: string;
  article: ArticleStore.IArticle;
  changeArticle: ArticleStore.IChangeArticle;
  getArticle: ArticleStore.IGetArticle;
  display: string;
  removeUploadFile: ArticleStore.IRemoveUploadFile;
  restore: () => void;
  changeDisplay: GlobalStore.IChangeDisplay;
  articleCover: any[];
}

@withRouterProps
@inject(
  (store: IStore): IEditorProps => {
    const { display, changeDisplay } = store.globalStore;
    const { article, changeArticle, getArticle, removeUploadFile, restore } = store.articleStore;
    const { tokenStore } = store.userStore;
    const { articleCover } = store.frontStore.frontConfig;

    return {
      article,
      changeArticle,
      getArticle,
      display,
      token: tokenStore.token,
      removeUploadFile,
      restore,
      changeDisplay,
      articleCover
    };
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

  public componentWillUnmount() {
    this.props.restore();
    this.props.changeDisplay('');
  }

  public render() {
    // const { className, display, article, changeArticle, removeUploadFile, token, selectionLanguage, articleCover } = this.props;
    const { className, display, article, changeArticle, removeUploadFile, token, articleCover } = this.props;

    return (
      <div className={className}>
        {display === 'Upload' && (
          <Upload uploads={article.uploads} changeArticle={changeArticle} removeUploadFile={removeUploadFile} token={token} />
        )}
        {display === 'Cover' && <Cover articleCover={articleCover} changeArticle={changeArticle} checkedCover={article.cover} />}

        <div className="title">
          <Row>
            <Col span={article.isEdit ? 12 : 20} className="title__label">
              <label>Title : </label>
              <Input className="title__input" value={article.title} onChange={this.onChangeArticleTitle} />
            </Col>
            {article.isEdit && (
              <>
                <Col span={6} className="title__time">
                  <label>UpdateTime : </label>
                  <span>{formatDateTime(article.updateTime, false)}</span>
                </Col>
                <Col span={6} className="title__time">
                  <label>CreateTime : </label>
                  <span>{formatDateTime(article.createTime, false)}</span>
                </Col>
              </>
            )}
          </Row>
        </div>

        <Row gutter={10} className="edit__preview">
          <Col span={12} className="edit__wrapper">
            <Edit onChange={this.onChangeArticleContent} />
          </Col>
          <Col span={12} className="preview__wrapper">
            <Preview className="preview" value={article.content} />
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
