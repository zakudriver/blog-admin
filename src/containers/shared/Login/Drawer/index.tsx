import * as React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styled from '@/styles';
import { withRouterProps } from '@/components/utils/withComponents';
import { ComponentExtends } from '@/utils/extends';

const FormItem = Form.Item;

interface IDrawerProps extends IClassName, IRouterProps {
  isDrawer: boolean;
  width: number;
  changeToken: GlobalStore.IChangeToken;
}

@withRouterProps
class LoginDrawer extends ComponentExtends<IDrawerProps> {
  public state = {
    username: '',
    password: '',
    isLoginBtn: false
  };

  onLogin = async (form: IForm) => {
    console.log(form);
    this.onBtnState(true);
    const res = await this.userApi$$.login(form);
    this.onBtnState(false);
    if (res.code === 0) {
      this.$message.success(res.msg);
      this.props.changeToken(res.token!);
      this.props.history!.push('/');
    } else {
      this.$message.error(res.msg);
    }
  };

  onBtnState = (state: boolean) => {
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
  background-color: #4dd0e1;
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
  onSubmit = (e: React.FormEvent<ILoginFormProps>) => {
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
