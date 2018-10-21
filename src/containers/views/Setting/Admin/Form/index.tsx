import * as React from 'react';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

// import styled from '@/styles';

const FormItem = Form.Item;

interface ISettingFormProps extends IClassName, FormComponentProps {}

class SettingForm extends React.Component<ISettingFormProps> {
  handleSubmit = (e: React.FormEvent<ISettingFormProps>) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem label="title">
          {getFieldDecorator('title')(
            <Input placeholder="" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Save
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(SettingForm);

// export default styled(SettingForm)``;
