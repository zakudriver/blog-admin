import * as React from 'react';
import { toJS } from 'mobx';
import { Upload as Uploading, Icon, Modal } from 'antd';

import styled from '@/styles';
import { API } from '@/api';
import { UploadFile, UploadChangeParam } from 'antd/lib/upload/interface';

interface IUploadProps extends IClassName {
  uploads: Array<UploadFile | ArticleStore.UploadedFile | string>;
  token: string;
  changeArticle: ArticleStore.IChangeArticle;
}

interface IUploadState {
  previewVisible: boolean;
  previewImage: string;
  // fileList: any[];
}

class Upload extends React.Component<IUploadProps, IUploadState> {
  constructor(props: IUploadProps) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: ''
    };
  }

  public onCancelPreview = () => this.setState({ previewVisible: false });

  public onPreviewUpload = (file: UploadFile) => {
    console.log(file);
    this.setState({
      previewImage: file.thumbUrl || file.url!,
      previewVisible: true
    });
  };

  public onChangeUpload = (fileInfo: UploadChangeParam) => {
    console.log('..change');
    console.log(fileInfo);
    this.props.changeArticle({ uploads: fileInfo.fileList });
  };

  public onRemoveUpload = (file: any) => {
    let _id;
    if (file.response) {
      _id = file.response.data._id;
    } else {
      _id = file._id;
    }

    console.log(_id);
    return false;
  };

  public render() {
    const { previewVisible, previewImage } = this.state;

    return (
      <div className={this.props.className}>
        <Uploading
          name="uploadFile"
          action={`${API}/upload`}
          listType="picture-card"
          multiple={true}
          headers={{
            Authorization: this.props.token
          }}
          // fileList={this.state.fileList}
          fileList={toJS(this.props.uploads as UploadFile[])}
          onPreview={this.onPreviewUpload}
          onRemove={this.onRemoveUpload}
          onChange={this.onChangeUpload}
        >
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
          </div>
        </Uploading>
        <Modal visible={previewVisible} footer={null} onCancel={this.onCancelPreview}>
          <img style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default styled(Upload)`
  padding: 6px;
`;
