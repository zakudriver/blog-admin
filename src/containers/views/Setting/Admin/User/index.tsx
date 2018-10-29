import * as React from 'react';
import { Input, Upload, Icon, Form } from 'antd';
// import { FormComponentProps } from 'antd/lib/form';
// import styled from '@/styles';

const FormItem = Form.Item;

interface IUserProps extends IClassName {}

class User extends React.Component<IUserProps> {
  public state = {
    loading: false,
    imageUrl: ''
  };

  public render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;

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
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="//jsonplaceholder.typicode.com/posts/"
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
              </Upload>
            </FormItem>
            <FormItem {...formItemLayout} label="Username">
              <Input placeholder="" />
            </FormItem>
            <FormItem {...formItemLayout} label="Old Password">
              <Input type="password" placeholder="" />
            </FormItem>
            <FormItem {...formItemLayout} label="New Password">
              <Input type="password" placeholder="" />
            </FormItem>
          </Form>
        </div>
        <div className="userline" />
      </div>
    );
  }
}

export default User;
