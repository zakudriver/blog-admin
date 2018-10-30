import * as React from 'react';
import { Input, Upload, Icon, Form } from 'antd';
import { API } from '@/service';
import { UploadChangeParam } from 'antd/lib/upload/interface';

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

  public onChangeAvatar = (info: UploadChangeParam) => {
    console.log('info');
    console.log(info);
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.props.changeUserInfo({ avatar: info.file.response.data });
      this.setState({
        avatarUrl: info.file.response.data,
        loading: false
      });
    }
  };

  public onChangeUser = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.changeUserInfo({ [key]: e.target.value });
  };

  public render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const avatarUrl = this.state.avatarUrl;

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
              <Upload
                className="avatar__uplaod"
                name="avatar"
                listType="picture-card"
                showUploadList={false}
                action={`${API}/upload/avatar`}
                headers={{
                  Authorization: token
                }}
                onChange={this.onChangeAvatar}
              >
                {avatarUrl ? <img src={avatarUrl} alt="avatar" /> : uploadButton}
              </Upload>
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
