import * as React from 'react';
import { UploadPro } from '@/components/common';
import { API } from '@/service';
import { UploadChangeParam } from 'antd/lib/upload';
import { toJS } from 'mobx';

interface IArticleProps extends IClassName {
  token: string;
  articleCover: string[];
  changeArticleCover: FrontStore.IChangeArticleCover;
}

class Article extends React.Component<IArticleProps> {
  public onChangeUpload = (fileInfo: UploadChangeParam) => {
    console.log('info');
    this.props.changeArticleCover(fileInfo.fileList);
  };

  public render() {
    const { token, articleCover } = this.props;
    console.log(articleCover)

    return (
      <div className="article">
        <h6>Article</h6>
        <UploadPro
          className="article__upload"
          token={token}
          action={`${API}/upload`}
          uploads={toJS<any[]>(articleCover)}
          onChange={this.onChangeUpload}
        />
      </div>
    );
  }
}

export default Article;
