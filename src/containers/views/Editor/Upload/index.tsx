import * as React from 'react';
import { Upload as Uploading, Icon, Modal } from 'antd';
import styled from '@/styles';
import { Authorization } from '@/api';

import { UploadFile, UploadChangeParam } from 'antd/lib/upload/interface';

interface IUploadProps extends IClassName {
  uploads?: UploadFile[];
}

class Upload extends React.Component<IUploadProps> {
  public state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }
    ]
  };

  public onCancelPreview = () => this.setState({ previewVisible: false });

  public onPreviewUpload = (file: UploadFile) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  public onChangeUpload = (fileInfo: UploadChangeParam) => {
    console.log(fileInfo);
  };

  public onRemoveUpload = () => {
    return false;
  };

  public render() {
    const { previewVisible, previewImage }: any = this.state;

    return (
      <div className={this.props.className}>
        <Uploading
          action="http://127.0.0.1:8999/upload"
          listType="picture-card"
          multiple={true}
          headers={{
            Authorization
          }}
          fileList={this.props.uploads}
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
