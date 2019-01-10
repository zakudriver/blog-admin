import * as React from 'react';
import { UploadPro } from '@/components/common';
import { API } from '@/service';

interface IArticleProps extends IClassName {
  token: string;
}

class Article extends React.Component<IArticleProps> {
  constructor(props: IArticleProps) {
    super(props);
  }

  public render() {
    const { token } = this.props;

    return (
      <div className="article">
        <h6>Article</h6>
        <UploadPro className="article__upload" token={token} action={`${API}/upload/avatar`} />
      </div>
    );
  }
}

export default Article;
