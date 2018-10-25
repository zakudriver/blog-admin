import * as React from 'react';
import styled from '@/styles';
import User from './User';
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
          <User />
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
    padding: 40px;
    background-color: #fff;

    h6 {
      font-size: 24px;
      padding: 0 20px;
      margin-bottom: 20px;
      color: ${props => props.theme.primaryColor};
      /* border-left: 4px solid ${props => props.theme.primaryColor}; */
    }

    .userline {
      border-top: 1px solid #eee;
      margin: 40px 0;
    }
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
