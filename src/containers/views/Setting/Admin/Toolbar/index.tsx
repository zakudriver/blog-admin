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
        <Button className="toolbarbtn" type="primary">
          Save
        </Button>
      </div>
    );
  }
}

export default styled(Toolbar)`
  .toolbarbtn {
    float: right;
  }
`;
