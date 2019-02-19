import * as React from 'react';
import { Icon } from 'antd';
import styled from '@/styles';

interface ICoverProps extends IClassName {
  articleCover: any[];
  checkedCover: string;
  changeArticle: ArticleStore.IChangeArticle;
}

class Cover extends React.Component<ICoverProps> {
  constructor(props: ICoverProps) {
    super(props);
  }

  onCheck = (v: string) => () => {
    this.props.changeArticle({ cover: v });
  };

  public render() {
    const { className, articleCover, checkedCover } = this.props;

    return (
      <div className={className}>
        <ul>
          {articleCover.map((i, idx) => (
            <li key={idx} onClick={this.onCheck(i.url || i.response.data)}>
              <img src={i.url || i.response.data} />
              {(i.url || i.response.data) === checkedCover && (
                <i className="check">
                  <Icon type="check" />
                </i>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default styled(Cover)`
  max-height: 330px;
  overflow-y: auto;
  ul {
    padding: 0;
    li {
      display: inline-block;
      margin: 0 10px 10px 0;
      padding: 10px;
      background-color: #fff;
      list-style: none;
      width: 150px;
      height: 150px;
      position: relative;
      & > img {
        width: 100%;
      }
    }
  }
  .check {
    display: block;
    width: 30px;
    height: 30px;
    padding: 5px;
    position: absolute;
    background-color: ${props => props.theme.primaryColor};
    top: 0;
    right: 0;
    i {
      color: #fff;
      font-size: 18px;
    }
  }
`;
