import * as React from 'react';
import { Input, Form, InputNumber } from 'antd';
import { BlockPicker } from 'react-color';
import styled from '@/styles';

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
      </Form>
    );
  }
}

export default styled(Config)``;
