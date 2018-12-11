import * as React from 'react';
import { Badge, Popover } from 'antd';
import styled from '@/styles';
import { IconBtn } from '@/components/common';

interface IBadgetipProps extends IClassName {}

class Badgetip extends React.Component<IBadgetipProps> {
  constructor(props: IBadgetipProps) {
    super(props);
  }

  public onCheck = () => {};

  public render() {
    const text = <span>Message</span>;
    const content = (
      <div>
        <p>Content</p>
        <p>Content</p>
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
