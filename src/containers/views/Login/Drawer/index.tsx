import * as React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styled from '@/styles';

const FormItem = Form.Item;

interface IDrawerProps extends IClassName {
  isDrawer: boolean;
  drawerWidth: number;
}

class LoginDrawer extends React.Component<IDrawerProps> {
  public state = {
    username: '',
    password: ''
  };

  onLogin = (form: IForm) => {
    console.log(form);
  };

  public render() {
    const WrappedLoginForm = Form.create()(LoginForm);
    return (
      <div className={this.props.className}>
        <main>
          <h6>Sign in</h6>

          <WrappedLoginForm {...this.state} onLogin={this.onLogin} />
        </main>
      </div>
    );
  }
}

interface IForm {
  username: string;
  password: string;
}

interface ILoginFormProps extends FormComponentProps, IForm {
  onLogin: (form: IForm) => void;
}

class LoginForm extends React.Component<ILoginFormProps> {
  handleSubmit = (e: React.FormEvent<ILoginFormProps>) => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        this.props.onLogin(value);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'username is required' }]
          })(<Input prefix={<Icon type="user" />} placeholder="Username" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'password is required' }]
          })(<Input prefix={<Icon type="user" />} placeholder="Password" />)}
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

export default styled(LoginDrawer)`
  height: 100vh;
  background-color: #4dd0e1;
  width: 30%;
  float: left;
  margin-left: ${props => (props.isDrawer ? 0 : `-${props.drawerWidth}%`)};
  transition: margin-left 0.8s;
  padding: 40px 80px;
  & > main {
    & > h6 {
      font-size: 30px;
    }
  }
`;
