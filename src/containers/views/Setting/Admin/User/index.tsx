import * as React from 'react';
import { Input, Form, Table, Button, Avatar, Modal } from 'antd';
import { API } from '@/service';
import { Upload } from '@/components/common';
import { PermissionMap } from '@/constants/map';
import { ComponentExtends } from '@/utils/extends';

const FormItem = Form.Item;

interface IUserProps extends IClassName {
  userInfo: UserStore.IUserInfo;
  token: string;
  changeUserInfo: UserStore.IChangeUserInfo;
  userList: UserStore.IUserInfo[];
  getUserList: () => void;
}

interface IUserState {
  loading: boolean;
  avatarUrl: string;
}

class User extends ComponentExtends<IUserProps, IUserState> {
  constructor(props: IUserProps) {
    super(props);
    this.state = {
      loading: false,
      avatarUrl: props.userInfo.avatar
    };
  }

  public onChangeAvatar = (url: string) => {
    console.log('url');
    console.log(url);
    this.props.changeUserInfo({ avatar: url });
  };

  public onChangeUser = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.changeUserInfo({ [key]: e.target.value });
  };

  public onDelete = (row: UserStore.IUserInfo) => async () => {
    Modal.confirm({
      title: 'Warning',
      content: 'Bla bla ...',
      okText: 'ok',
      okType: 'danger',
      cancelText: 'no',
      onOk: async () => {
        const res = await this.userApi$$.removeUser({ _id: row._id });
        if (res.code === 0) {
          this.$message.success(res.msg);
          this.props.getUserList();
        } else {
          this.$message.error(res.msg);
        }
      }
    });
  };

  public render() {
    const { userInfo, token, userList } = this.props;

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

    const columns = [
      {
        title: 'Avatar',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text: any, record: any, index: any) => <Avatar shape="square" icon="user" src={text} />
      },
      {
        title: 'Name',
        dataIndex: 'username',
        key: 'name'
      },
      {
        title: 'Permission',
        dataIndex: 'permission',
        key: 'permission',
        render: (text: any, record: any, index: any) => PermissionMap.get(text)
      },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (text: any, record: any, index: any) => {
          if (text.permission === 0) {
            return <span>-</span>;
          } else {
            return (
              <Button type="danger" onClick={this.onDelete(text)}>
                Delete
              </Button>
            );
          }
        }
      }
    ];
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

        <div className="userlist">
          <Table columns={columns} dataSource={userList} pagination={false} />
        </div>
      </div>
    );
  }
}

export default User;
