import * as React from 'react';
import { Input, Form, InputNumber } from 'antd';
import { BlockPicker, TwitterPicker, ColorResult } from 'react-color';

const FormItem = Form.Item;

interface IConfigProps extends IClassName {
  webConfig: GlobalStore.IWebConfig;
  changeWebConfig: GlobalStore.IChangeWebConfig;
}

class Config extends React.Component<IConfigProps> {
  constructor(props: IConfigProps) {
    super(props);
  }

  public onChangePrimaryColor = (color: ColorResult) => {
    console.log(color);
    this.props.changeWebConfig({ primaryColor: color.hex });
    window.less.modifyVars({
      '@primary-color': color.hex
    });
  };

  public render() {
    const { primaryColor } = this.props.webConfig;

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
          <FormItem {...formItemLayout} label="PrimaryColor">
            <BlockPicker triangle="hide" color={primaryColor} onChange={this.onChangePrimaryColor} />
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
