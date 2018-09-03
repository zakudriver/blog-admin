import * as React from 'react';
import styled from '@/styles';

interface IHomeProps extends IClassName {}

class Home extends React.Component<IHomeProps> {
  constructor(props: IHomeProps) {
    super(props);
  }

  public render() {
    return <div className={this.props.className}>Home1</div>;
  }
}

export default styled(Home)``;
