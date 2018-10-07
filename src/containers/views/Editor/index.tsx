import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Input } from 'antd';
import styled from '@/styles';

import Edit from './Edit';
import Preview from './Preview';

interface IEditorProps extends IClassName {
  selectionEdit: string;
  selectionLanguage: string;
  article: DataStore.IArticle;
  changeArticle: DataStore.IChangeArticle;
}

@inject(
  (store: IStore): IEditorProps => {
    const { selectionEdit, selectionLanguage } = store.globalStore;
    const { article, changeArticle } = store.dataStore;
    return { selectionEdit, selectionLanguage, article, changeArticle };
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

  public render() {
    // const options = {
    //   lineNumbers: true,
    //   theme: 'monokai',
    //   mode: 'markdown',
    //   extraKeys: { Ctrl: 'autocomplete' }
    // }
    return (
      <div className={this.props.className}>
        <div className="title">
          <label>Title : </label>
          <Input className="title__input" value={this.props.article.title} onChange={this.onChangeArticleTitle} />
        </div>
        <Edit
          className="edit"
          value={this.props.article.content}
          onChange={this.onChangeArticleContent}
          type={this.props.selectionEdit}
          language={this.props.selectionLanguage}
        />
        <Preview className="preview" value={this.props.article.content} />
      </div>
    );
  }
}

export default styled(Editor)`
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50px auto;
  grid-gap: 10px;
  grid-template-areas:
    'title title'
    'edit preview';

  .title {
    grid-area: title;
    background-color: #fff;
    line-height: 50px;
    padding: 0 20px;

    &__input {
      width: 70%;
      margin-left: 20px;
      border: none;
      border-radius: 0;
      border-bottom: 1px solid ${props => props.theme.primaryColor};
      font-size: 20px;
      &:focus {
        border: none;
        border-bottom: 1px solid ${props => props.theme.primaryColor};
        box-shadow: none;
      }
    }
  }
  .edit {
    grid-area: edit;
  }
  .preview {
    grid-area: preview;
  }
`;
