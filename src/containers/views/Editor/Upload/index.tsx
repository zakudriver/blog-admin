import * as React from 'react';
import { Upload as Uploading, Icon, Modal } from 'antd';
import styled from '@/styles';

import { UploadFile } from 'antd/lib/upload/interface';

interface IUploadProps extends IClassName {}

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

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file: UploadFile) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  handleChange = ({ fileList }: any) => this.setState({ fileList });

  public render() {
    const { previewVisible, previewImage, fileList }: any = this.state;

    return (
      <div className={this.props.className}>
        <Uploading
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
          </div>
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default styled(Upload)`
  padding: 6px;
`;
