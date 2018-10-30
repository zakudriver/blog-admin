import * as React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styled from '@/styles';
import { withRouterProps } from '@/components/utils/withComponents';

const FormItem = Form.Item;

interface IDrawerProps extends IClassName, IWithRouterProps {
  isDrawer: boolean;
  width: number;
  login: UserStore.IOnLogin;
}

@withRouterProps
class LoginDrawer extends React.Component<IDrawerProps> {
  public state = {
    username: '',
    password: '',
    isLoginBtn: false
  };

  public onLogin = async (form: IForm) => {
    this.onBtnState(true);
    const res = await this.props.login(form);
    this.onBtnState(false);
    if (res) {
      // this.props.history!.push('/');
      location.href = '/';
    }
  };

  public onBtnState = (state: boolean) => {
    this.setState({
      isLoginBtn: state
    });
  };

  public render() {
    const WrappedLoginForm = Form.create()(LoginForm);
    return (
      <LoginDrawerWrapper {...this.props}>
        <main>
          <h6>Sign in</h6>

          <WrappedLoginForm {...this.state} onLogin={this.onLogin} />
        </main>
      </LoginDrawerWrapper>
    );
  }
}

// 抽屉包装
interface LoginDrawerWrapperProps extends IDrawerProps {}

const LoginDrawerWrapper = styled<LoginDrawerWrapperProps, 'div'>('div')`
  height: 100vh;
  background-color: ${props => props.theme.drawerColor};
  width: 30%;
  float: left;
  margin-left: ${props => (props.isDrawer ? 0 : `-${props.width}%`)};
  transition: margin-left 0.8s;
  padding: 40px 5% 40px;
  & > main {
    & > h6 {
      font-size: 30px;
    }
  }
`;

// 表单
interface IForm {
  username: string;
  password: string;
}

interface ILoginFormProps extends FormComponentProps, IForm {
  onLogin: (form: IForm) => void;
  isLoginBtn: boolean;
}

class LoginForm extends React.Component<ILoginFormProps> {
  public onSubmit = (e: React.FormEvent<ILoginFormProps>) => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        this.props.onLogin(value);
      }
    });
  };

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onSubmit}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'username is required' }]
          })(<Input prefix={<Icon type="user" />} placeholder="Username" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: false, message: 'password is required' }]
          })(<Input prefix={<Icon type="lock" />} type="password" placeholder="Password" />)}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" disabled={this.props.isLoginBtn}>
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default LoginDrawer;
