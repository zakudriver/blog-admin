import * as React from 'react';
import { Badge, Popover } from 'antd';
import styled from '@/styles';
import { IconBtn } from '@/components/common';

interface IBadgetipProps extends IClassName {
  source: MessageStore.IMessage[];
}

class Badgetip extends React.Component<IBadgetipProps> {
  constructor(props: IBadgetipProps) {
    super(props);
  }

  public onCheck = () => {};

  public render() {
    const { source } = this.props;
    const text = <span>Message</span>;
    const content = (
      <div>
        {source.map((i, idx) => (
          <div key={idx}>
            <div>{i.name} :</div>
            <p>{i.text}</p>
            <time>{i.time}</time>
            {i.article.title}
          </div>
        ))}
      </div>
    );
    return (
      <div className={this.props.className}>
        <Badge dot={false}>
          <Popover placement="bottom" title={text} content={content} trigger="click">
            <IconBtn type="notification" onClick={this.onCheck} />
          </Popover>
        </Badge>
      </div>
    );
  }
}

export default styled(Badgetip)``;
