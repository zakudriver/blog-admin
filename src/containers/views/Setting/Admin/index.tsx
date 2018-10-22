import * as React from 'react';
import styled from '@/styles';
import Form from './Form';

interface ISettingAdminProps extends IClassName {}

class SettingAdmin extends React.Component<ISettingAdminProps> {
  constructor(props: ISettingAdminProps) {
    super(props);
  }

  public render() {
    return (
      <div className={this.props.className}>
        <Form />
      </div>
    );
  }
}

export default styled(SettingAdmin)`
  /* display: flex;
  justify-content: space-between; */
  height: 100%;
  padding: 20px;
  background-color: #fff;
`;
