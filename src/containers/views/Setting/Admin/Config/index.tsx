import * as React from 'react';
import { Input, Form, InputNumber } from 'antd';
import { BlockPicker, TwitterPicker, ColorResult } from 'react-color';
import { Upload } from '@/components/common';
import { API } from '@/service';

const FormItem = Form.Item;

interface IConfigProps extends IClassName {
  config: GlobalStore.IConfig;
  changeConfig: GlobalStore.IChangeConfig;
  token: string;
}

export default class Config extends React.Component<IConfigProps> {
  public onChangePrimaryColor = (color: ColorResult) => {
    window.less
      .modifyVars({
        '@primary-color': color.hex
      })
      .then(() => {
        this.props.changeConfig({ primaryColor: color.hex });
      });
  };

  public onChangeConfig = (key: string) => (
    value: React.ChangeEvent<HTMLInputElement> | string | number | undefined | ColorResult
  ) => {
    if (typeof value === 'object') {
      this.props.changeConfig({
        [key]: (value as ColorResult).hex || (value as React.ChangeEvent<HTMLInputElement>).target.value
      });
    } else {
      this.props.changeConfig({ [key]: value });
    }
  };

  public onChangeAvatar = (url: string) => {};

  public render() {
    const { config, token } = this.props;

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
          <FormItem {...formItemLayout} label="Logo">
            <Upload token={token} action={`${API}/upload/avatar`} onChange={this.onChangeAvatar} avatarUrl={''} />
          </FormItem>
          <FormItem {...formItemLayout} label="Title">
            <Input placeholder="" defaultValue={config.title} onChange={this.onChangeConfig('title')} />
          </FormItem>
          <FormItem {...formItemLayout} label="PrimaryColor">
            <BlockPicker triangle="hide" color={config.primaryColor} onChange={this.onChangePrimaryColor} />
          </FormItem>
          <FormItem {...formItemLayout} label="DrawerWidth">
            <InputNumber max={100} min={0} defaultValue={config.drawerWidth} onChange={this.onChangeConfig('drawerWidth')} />
          </FormItem>
          <FormItem {...formItemLayout} label="DrawerColor">
            <TwitterPicker triangle="hide" color={config.drawerColor} onChange={this.onChangeConfig('drawerColor')} />
          </FormItem>
        </Form>
      </div>
    );
  }
}
