import * as React from 'react';
import { observer, inject } from 'mobx-react';
import styled from '@/styles';
import User from './User';
import Config from './Config';

interface IAdminProps extends IClassName {
  userInfoForm: UserStore.IUserInfoForm;
  token: string;
  changeUserInfo: UserStore.IChangeUserInfo;
  config: GlobalStore.IConfig;
  changeConfig: GlobalStore.IChangeConfig;
  userList: UserStore.IUserInfo[];
  getUserList: () => void;
}

// @inject(
//   (store: IStore): IAdminProps => {
//     const { userInfoForm, changeUserInfo, userList, getUserList } = store.userStore;
//     const { token } = store.userStore.tokenStore;
//     const { config, changeConfig } = store.globalStore;
//     return { userInfoForm, token, changeUserInfo, config, changeConfig, userList, getUserList };
//   }
// )
// @observer
// class Admin extends React.Component<IAdminProps> {
//   public render() {
//     const { className, userInfoForm, token, changeUserInfo, config, changeConfig, userList, getUserList } = this.props;
//     return (
//       <div className={className}>
//         <User
//           userInfoForm={userInfoForm}
//           token={token}
//           changeUserInfo={changeUserInfo}
//           userList={userList}
//           getUserList={getUserList}
//         />
//         <Config config={config} token={token} changeConfig={changeConfig} />
//       </div>
//     );
//   }
// }
const Admin = ({ className, userInfoForm, token, changeUserInfo, config, changeConfig, userList, getUserList }: IAdminProps) => (
  <div className={className}>
    <User
      userInfoForm={userInfoForm}
      token={token}
      changeUserInfo={changeUserInfo}
      userList={userList}
      getUserList={getUserList}
    />
    <Config config={config} token={token} changeConfig={changeConfig} />
  </div>
);

const InjectAdmin = inject((store: IStore) => {
  const { userInfoForm, changeUserInfo, userList, getUserList } = store.userStore;
  const { token } = store.userStore.tokenStore;
  const { config, changeConfig } = store.globalStore;
  return { userInfoForm, token, changeUserInfo, config, changeConfig, userList, getUserList };
})(observer(Admin));

export default styled(InjectAdmin)`
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
      margin: 30px 0;
    }
    .userlist{
      height: 250px;
      overflow: auto;
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
