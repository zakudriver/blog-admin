import * as React from 'react';
import { observer, inject } from 'mobx-react';
import styled from '@/styles';
import User from './User';
import Config from './Config';

interface ISettingAdminProps extends IClassName {
  userInfo: UserStore.IUserInfo;
  token: string;
  changeUserInfo: UserStore.IChangeUserInfo;
  config: GlobalStore.IConfig;
  changeConfig: GlobalStore.IChangeConfig;
}

@inject(
  (store: IStore): ISettingAdminProps => {
    const { userInfo, changeUserInfo } = store.userStore;
    const { token } = store.userStore.tokenStore;
    const { config, changeConfig } = store.globalStore;
    return { userInfo, token, changeUserInfo, config, changeConfig };
  }
)
@observer
class SettingAdmin extends React.Component<ISettingAdminProps> {

  public render() {
    const { className, userInfo, token, changeUserInfo, config, changeConfig } = this.props;
    return (
      <div className={className}>
        <div>
          <User userInfo={userInfo} token={token} changeUserInfo={changeUserInfo} />
        </div>
        <div>
          <Config config={config} changeConfig={changeConfig} />
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
    padding: 20px 40px;
    background-color: #fff;

    h6 {
      font-size: 24px;
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

  .avatar__uplaod{
    .ant-upload{
        width: 110px !important;
        height: 110px !important;

      img{
        width: 100%;
        height: 100%;
      }
    }
  }
`;
