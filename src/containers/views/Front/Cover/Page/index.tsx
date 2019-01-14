import * as React from 'react';
import { Form } from 'antd';
import { UploadPro } from '@/components/common';
import { FormItemLayout } from '@/constants';
import { API } from '@/service';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { observer } from 'mobx-react';

const FormItem = Form.Item;

interface IPageProps extends IClassName {
  token: string;
  cover: FrontStore.ICover;
  changeCover: FrontStore.IChangeCover;
}

@observer
class Page extends React.Component<IPageProps> {
  constructor(props: IPageProps) {
    super(props);
  }

  public onChangeUpload = (key: string) => (fileInfo: UploadChangeParam) => {
    console.log(fileInfo);
  };

  public onRemoveUpload = (key: string) => (file: UploadFile) => {
    console.log(file);
    this.props.changeCover({ [key]: '' });
  };

  public render() {
    const { token, cover } = this.props;
    const homeUploads = cover.home ? [{ url: cover.home, key: 0, uid: '0' }] : [];
    const blogUploads = cover.blog ? [{ url: cover.blog, key: 0, uid: '0' }] : [];

    return (
      <div className="page">
        <h6>Page</h6>
        <Form layout="inline">
          <FormItem {...FormItemLayout} className="form__item" label="Home">
            <UploadPro
              token={token}
              action={`${API}/upload`}
              limit={1}
              uploads={homeUploads}
              onChange={this.onChangeUpload('home')}
              onRemove={this.onRemoveUpload('home')}
            />
          </FormItem>
          <FormItem {...FormItemLayout} className="form__item" label="Blog">
            <UploadPro
              token={token}
              action={`${API}/upload`}
              limit={1}
              uploads={blogUploads}
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
