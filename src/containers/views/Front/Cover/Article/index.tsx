import * as React from 'react';
import { UploadPro } from '@/components/common';
import { API } from '@/service';

interface IArticleProps extends IClassName {
  token: string;
  defaultThumb: string[];
}

class Article extends React.Component<IArticleProps> {
  constructor(props: IArticleProps) {
    super(props);
  }

  public render() {
    const { token, defaultThumb } = this.props;
    const uploads = defaultThumb.map((i, idx) => ({
      url: i,
      uid: idx,
      key: idx
    }));

    return (
      <div className="article">
        <h6>Article</h6>
        <UploadPro className="article__upload" token={token} action={`${API}/upload`} uploads={uploads} />
      </div>
    );
  }
}

export default Article;
