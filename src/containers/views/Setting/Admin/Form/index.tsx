import * as React from 'react';
import { Input, Upload, Icon, Form } from 'antd';
// import { FormComponentProps } from 'antd/lib/form';
import styled from '@/styles';

const FormItem = Form.Item;

interface ISettingFormProps extends IClassName {}

class SettingForm extends React.Component<ISettingFormProps> {
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
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    const noLabelformItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 24,
          offset: 4
        }
      }
    };

    return (
      <Form>
        <FormItem {...noLabelformItemLayout}>
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
        <FormItem {...formItemLayout} label="title">
          <Input placeholder="" />
        </FormItem>
      </Form>
    );
  }
}

export default styled(SettingForm)`
  .label {
    text-align: right;
  }
`;
