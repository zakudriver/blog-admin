import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from '@/styles';

import Edit from './Edit';
import Preview from './Preview';

interface IEditorProps extends IClassName {
  selectionEdit: string;
  selectionLanguage: string;
}

@inject(
  (store: IStore): IEditorProps => {
    const { selectionEdit, selectionLanguage } = store.globalStore;
    return { selectionEdit, selectionLanguage };
  }
)
@observer
class Editor extends React.Component<IEditorProps> {
  public state = {
    value: 'test'
  };

  public onChangeArticle = (value: string) => {
    this.setState({
      value
    });
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
        <Edit
          value={this.state.value}
          onChange={this.onChangeArticle}
          type={this.props.selectionEdit}
          language={this.props.selectionLanguage}
        />
        <Preview value={this.state.value} />
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
  grid-template-rows: 100%;
  grid-gap: 10px;
`;
