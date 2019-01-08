import * as React from 'react';
import { Form, Input } from 'antd';

import styled from '@/styles';
import { API } from '@/service';
import { Upload } from '@/components/common';
import { inject, observer } from 'mobx-react';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

interface IFrontProps extends IClassName {
  frontConfig: FrontStore.IFrontConfig;
  changeFrontConfig: FrontStore.IChangeFrontConfig;
  token: string;
}

@inject((store: IStore) => {
  const { frontConfig, changeFrontConfig } = store.frontStore;
  const { token } = store.userStore.tokenStore;
  return { frontConfig, changeFrontConfig, token };
})
@observer
class Front extends React.Component<IFrontProps> {
  constructor(props: IFrontProps) {
    super(props);
  }

  public onChangeConfig = (key: string) => (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    this.props.changeFrontConfig({ [key]: e.target.value });
  };

  public onChangeAvatar = (url: string) => {
    this.props.changeFrontConfig({ avatar: url });
  };

  public render() {
    const { className, frontConfig, token } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };

    return (
      <div className={className}>
        <Form>
          <FormItem {...formItemLayout} label="Avatar">
            <Upload
              action={`${API}/upload/avatar`}
              avatarUrl={frontConfig.avatar}
              token={token}
              onChange={this.onChangeAvatar}
            />
          </FormItem>
          <FormItem {...formItemLayout} label="Name">
            <Input placeholder="" value={frontConfig.name} onChange={this.onChangeConfig('name')} />
          </FormItem>
          <FormItem {...formItemLayout} label="Profile">
            <Input placeholder="" value={frontConfig.profile} onChange={this.onChangeConfig('profile')} />
          </FormItem>
          <FormItem {...formItemLayout} label="Description">
            <TextArea rows={5} value={frontConfig.description} onChange={this.onChangeConfig('description')} />
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default styled(Front)`
  background-color: #fff;
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
