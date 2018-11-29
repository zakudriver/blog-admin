import * as React from 'react';
import { Input, Form } from 'antd';
import { API } from '@/service';
import { Upload } from '@/components/common';

// import { FormComponentProps } from 'antd/lib/form';
// import styled from '@/styles';

const FormItem = Form.Item;

interface IUserProps extends IClassName {
  userInfo: UserStore.IUserInfo;
  token: string;
  changeUserInfo: UserStore.IChangeUserInfo;
}

interface IUserState {
  loading: boolean;
  avatarUrl: string;
}

class User extends React.Component<IUserProps, IUserState> {
  constructor(props: IUserProps) {
    super(props);
    this.state = {
      loading: false,
      avatarUrl: props.userInfo.avatar
    };
  }

  // public onChangeAvatar = (info: UploadChangeParam) => {
  //   console.log('info');
  //   console.log(info);
  //   if (info.file.status === 'uploading') {
  //     this.setState({ loading: true });
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     this.props.changeUserInfo({ avatar: info.file.response.data });
  //     this.setState({
  //       avatarUrl: info.file.response.data,
  //       loading: false
  //     });
  //   }
  // };

  public onChangeAvatar = (url: string) => {
    console.log('url');
    console.log(url);
    this.props.changeUserInfo({ avatar: url });
  };

  public onChangeUser = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.changeUserInfo({ [key]: e.target.value });
  };

  public render() {
    const { userInfo, token } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };
    return (
      <div>
        <div>
          <h6>User</h6>
          <Form>
            <FormItem {...formItemLayout} label="Avatar">
              <Upload action={`${API}/upload/avatar`} token={token} onChange={this.onChangeAvatar} avatarUrl={userInfo.avatar} />
            </FormItem>
            <FormItem {...formItemLayout} label="Username">
              <Input placeholder="" defaultValue={userInfo.username} onChange={this.onChangeUser('username')} />
            </FormItem>
            <FormItem {...formItemLayout} label="Old Password">
              <Input type="password" placeholder="" onChange={this.onChangeUser('oldPassword')} />
            </FormItem>
            <FormItem {...formItemLayout} label="New Password">
              <Input type="password" placeholder="" onChange={this.onChangeUser('newPassword')} />
            </FormItem>
          </Form>
        </div>
        <div className="userline" />
      </div>
    );
  }
}

export default User;
