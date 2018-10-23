import * as React from 'react';
import { Input, Upload, Icon, Form } from 'antd';
// import { FormComponentProps } from 'antd/lib/form';
// import styled from '@/styles';

const FormItem = Form.Item;

interface IProfileProps extends IClassName {}

class Profile extends React.Component<IProfileProps> {
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
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    };

    return (
      <Form className={this.props.className}>
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
        <FormItem {...formItemLayout} label="Password">
          <Input placeholder="" />
        </FormItem>
      </Form>
    );
  }
}

export default Profile
