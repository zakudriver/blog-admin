import * as React from 'react';
import { Button } from 'antd';
import styled from '@/styles';

interface IToolbarProps extends IClassName {}

class Toolbar extends React.Component<IToolbarProps> {
  constructor(props: IToolbarProps) {
    super(props);
  }

  public render() {
    return (
      <div className={this.props.className}>
        <Button type="primary">
          Save
        </Button>
        <Button>Save</Button>
      </div>
    );
  }
}

export default styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;
