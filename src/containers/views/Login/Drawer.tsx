import * as React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import styled from '@/styles';

const FormItem = Form.Item;

interface IDrawerProps {
  className?: string;
  isDrawer: boolean;
  drawerWidth: number;
}

class Drawer extends React.Component<IDrawerProps> {
  public render() {
    return (
      <div className={this.props.className}>
        <main>
          <h6>登录</h6>

          <WrappedNormalLoginForm />
        </main>
      </div>
    );
  }
}

class NormalLoginForm extends React.Component<any> {
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default styled(Drawer)`
  height: 100vh;
  background-color: #ccc;
  width: 30%;
  float: left;
  margin-left: ${props => (props.isDrawer ? 0 : `-${props.drawerWidth}%`)};
  transition: margin-left 0.8s;
  padding: 40px 80px;
`;
