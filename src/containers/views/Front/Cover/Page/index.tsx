import * as React from 'react';
import { Form } from 'antd';
import { Upload } from '@/components/common';
import { FormItemLayout } from '@/constants';

const FormItem = Form.Item;

interface IPageProps extends IClassName {}

class Page extends React.Component<IPageProps> {
  constructor(props: IPageProps) {
    super(props);
  }

  public render() {

    return (
      <div className="page">
        <h6>Page</h6>
        <Form layout="inline">
          <FormItem {...FormItemLayout} className="form__item" label="Home">
            <Upload />
          </FormItem>
          <FormItem {...FormItemLayout} className="form__item" label="Blog">
            <Upload />
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Page;
