import * as React from 'react';
import { Badge, Popover } from 'antd';
import styled from '@/styles';
import { IconBtn } from '@/components/common';

interface IBadgetipProps extends IClassName {
  source: MessageStore.IMessage[];
  config: GlobalStore.IConfig;
  onAlready: () => void;
}

class Badgetip extends React.Component<IBadgetipProps> {
  public onCheck = () => {};

  public render() {
    const { source, config, onAlready } = this.props;

    return (
      <div className={this.props.className}>
        <Badge dot={source.length ? true : false}>
          <Popover
            placement="bottom"
            title={<span>Message</span>}
            content={<Content source={source} config={config} onAlready={onAlready} />}
            trigger="click"
          >
            <IconBtn type="notification" onClick={this.onCheck} />
          </Popover>
        </Badge>
      </div>
    );
  }
}

interface IContent extends IClassName {
  source: MessageStore.IMessage[];
  config: GlobalStore.IConfig;
  onAlready: () => void;
}

const Content = styled(({ source, className, onAlready }: IContent) => (
  <div className={className}>
    {source.length ? (
      <ul>
        {source.map((i, idx) => (
          <li key={idx}>
            <label className="message__name">{i.name}:</label>
            <p className="message__text">{i.text} </p>
            <a href="https://ant.design">
              <h6>《{i.article.title}》</h6>
            </a>
            <time>{i.time}</time>
          </li>
        ))}
      </ul>
    ) : (
      <div>no more</div>
    )}
    {source.length ? <a onClick={onAlready}>Already</a> : null}
  </div>
))`
  width: 180px;
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0 0 10px 0;
    overflow-y: scroll;
    max-height: 300px;
  }
  li {
    padding-bottom: 10px;
    border-bottom: 1px solid #e1e1e1;
  }

  h6 {
    font-size: 14px;
    margin-bottom: 0;
  }
  .message {
    &__name {
      color: ${props => props.config.primaryColor};
    }
    &__text {
      color: rgba(0, 0, 0, 0.45);
      margin-bottom: 4px;
      word-wrap: break-word;
    }
  }
`;

export default Badgetip;
