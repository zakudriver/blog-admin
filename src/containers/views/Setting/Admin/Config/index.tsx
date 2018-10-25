import * as React from 'react';
import { Input, Form, InputNumber } from 'antd';
import { BlockPicker, TwitterPicker } from 'react-color';

const FormItem = Form.Item;

interface IConfigProps extends IClassName {}

class Config extends React.Component<IConfigProps> {
  constructor(props: IConfigProps) {
    super(props);
  }

  public render() {
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
      <div>
        <h6>Config</h6>
        <Form className={this.props.className}>
          <FormItem {...formItemLayout} label="Title">
            <Input placeholder="" />
          </FormItem>
          <FormItem {...formItemLayout} label="Theme">
            <BlockPicker triangle="hide" />
          </FormItem>
          <FormItem {...formItemLayout} label="DrawerWidth">
            <InputNumber />
          </FormItem>
          <FormItem {...formItemLayout} label="DrawerColor">
            <TwitterPicker triangle="hide" />
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Config;
