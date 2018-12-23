import * as React from 'react';
import { Badge, Popover, List } from 'antd';
import styled from '@/styles';
import { IconBtn } from '@/components/common';

interface IBadgetipProps extends IClassName {
  source: MessageStore.IMessage[];
}

class Badgetip extends React.Component<IBadgetipProps> {
  public onCheck = () => {};

  public render() {
    const { source } = this.props;
    const text = <span>Message</span>;

    return (
      <div className={this.props.className}>
        <Badge dot={false}>
          <Popover placement="bottom" title={text} content={<Content source={source} />} trigger="click">
            <IconBtn type="notification" onClick={this.onCheck} />
          </Popover>
        </Badge>
      </div>
    );
  }
}

interface IContent {
  source: MessageStore.IMessage[];
}

const ContentWrapper = styled('div')`
  .message {
    &__name {
      text-align: right;
    }
  }
`;

const Content = ({ source }: IContent) => (
  <ContentWrapper>
    <List
      itemLayout="vertical"
      dataSource={source}
      renderItem={(i: MessageStore.IMessage) => (
        <List.Item>
          <List.Item.Meta title={<a href="https://ant.design">《{i.article.title}》</a>} description={i.text} />
          <div className="message__name">
            <label>—— {i.name}</label>
          </div>
          <time>{i.time}</time>
        </List.Item>
      )}
    />
    <a>Already</a>
  </ContentWrapper>
);

export default Badgetip;
