import * as React from 'react';
import { UploadPro } from '@/components/common';
import { API } from '@/service';
import { UploadChangeParam } from 'antd/lib/upload';
import { toJS } from 'mobx';

interface IArticleProps extends IClassName {
  token: string;
  defaultThumb: string[];
  changeDefaultThumb: FrontStore.IChangeDefaultThumb;
}

class Article extends React.Component<IArticleProps> {
  public onChangeUpload = (fileInfo: UploadChangeParam) => {
    console.log('info');
    this.props.changeDefaultThumb(fileInfo.fileList);
  };

  // public onRemoveUpload = (file: UploadFile) => {
  //   console.log(file);
  //   // this.props.changeDefaultThumb(file.fileList);
  // };

  public render() {
    const { token, defaultThumb } = this.props;
    // const uploads = defaultThumb.map((i, idx) => ({
    //   url: i,
    //   uid: idx,
    //   key: idx
    // }));

    return (
      <div className="article">
        <h6>Article</h6>
        <UploadPro
          className="article__upload"
          token={token}
          action={`${API}/upload`}
          uploads={toJS<any[]>(defaultThumb)}
          onChange={this.onChangeUpload}
        />
      </div>
    );
  }
}

export default Article;
