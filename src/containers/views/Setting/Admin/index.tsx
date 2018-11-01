import * as React from 'react';
import { observer, inject } from 'mobx-react';
import styled from '@/styles';
import User from './User';
import Config from './Config';

interface ISettingAdminProps extends IClassName {
  userInfo: UserStore.IUserInfo;
  token: string;
  changeUserInfo: UserStore.IChangeUserInfo;
  webConfig: GlobalStore.IWebConfig;
  changeWebConfig: GlobalStore.IChangeWebConfig;
}

@inject(
  (store: IStore): ISettingAdminProps => {
    const { userInfo, changeUserInfo } = store.userStore;
    const { token } = store.userStore.tokenStore;
    const { webConfig, changeWebConfig } = store.globalStore;
    return { userInfo, token, changeUserInfo, webConfig, changeWebConfig };
  }
)
@observer
class SettingAdmin extends React.Component<ISettingAdminProps> {
  constructor(props: ISettingAdminProps) {
    super(props);
    const initialValue = {
      '@primary-color': '#fffff',
      // '@secondary-color': '#0000ff',
      // '@text-color': '#000000',
      // '@text-color-secondary': '#eb2f96',
      // '@heading-color': '#fa8c16',
      // '@layout-header-background': '#b36e94',
      // '@btn-primary-bg': '#397dcc'
    };
    let vars = {};

    try {
      vars = Object.assign({}, initialValue);
    } finally {
      this.state = { vars, initialValue };
      window.less
        .modifyVars(vars)
        .then(() => {
          console.log('ok');
        })
        .catch((err: any) => {
          // message.error(`Failed to update theme`);
          console.log('error');
          console.log(err);
        });
    }
  }

  public render() {
    const { className, userInfo, token, changeUserInfo, webConfig, changeWebConfig } = this.props;
    return (
      <div className={className}>
        <div>
          <User userInfo={userInfo} token={token} changeUserInfo={changeUserInfo} />
        </div>
        <div>
          <Config webConfig={webConfig} changeWebConfig={changeWebConfig} />
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
