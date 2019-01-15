import * as React from 'react';
import { Button } from 'antd';
import styled from '@/styles';

interface IToolbarProps extends IClassName {}

class Toolbar extends React.Component<IToolbarProps> {
  constructor(props: IToolbarProps) {
    super(props);
  }

  public render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <Button type="primary">Save</Button>
      </div>
    );
  }
}

export default styled(Toolbar)``;
