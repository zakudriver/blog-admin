import * as React from 'react';
import { Form } from 'antd';
import { observer } from 'mobx-react';
import { Upload } from '@/components/common';
import { FormItemLayout } from '@/constants';
import { API } from '@/service';

const FormItem = Form.Item;

interface IPageProps extends IClassName {
  token: string;
  cover: FrontStore.ICover;
  changeCover: FrontStore.IChangeCover;
}

@observer
class Page extends React.Component<IPageProps> {
  public onChangeUpload = (key: string) => (url: string) => {
    this.props.changeCover({ [key]: url });
  };

  public onRemoveUpload = (key: string) => () => {
    this.props.changeCover({ [key]: '' });
  };

  public render() {
    const { token, cover } = this.props;

    return (
      <div className="page">
        <h6>Page</h6>
        <Form layout="inline">
          <FormItem {...FormItemLayout} className="form__item" label="Home">
            <Upload
              token={token}
              action={`${API}/upload`}
              imgURL={cover.home}
              isPreview={true}
              size={200}
              onChange={this.onChangeUpload('home')}
              onRemove={this.onRemoveUpload('home')}
            />
          </FormItem>
          <FormItem {...FormItemLayout} className="form__item" label="Blog">
            <Upload
              token={token}
              action={`${API}/upload`}
              imgURL={cover.blog}
              isPreview={true}
              size={200}
              onChange={this.onChangeUpload('blog')}
              onRemove={this.onRemoveUpload('blog')}
            />
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Page;
