import * as React from 'react';
import styled from '@/styles';
import Profile from './Profile';
import Config from './Config';

interface ISettingAdminProps extends IClassName {}

class SettingAdmin extends React.Component<ISettingAdminProps> {
  constructor(props: ISettingAdminProps) {
    super(props);
  }

  public render() {
    return (
      <div className={this.props.className}>
        <div>
          <Profile />
        </div>
        <div>
          <Config />
        </div>
      </div>
    );
  }
}

export default styled(SettingAdmin)`
  display: flex;
  justify-content: space-between;
  height: 100%;
  & > div {
    width: calc((100% - 20px) / 2);
    padding: 80px 20px;
    background-color: #fff;
  }
  .ant-form-item-label {
    padding-right: 10px;
  }
  .block-picker {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 4px !important;
    & > div {
      border-radius: 3px !important;
    }
  }
`;
