import * as React from 'react';
import { Upload as AntUpload, Icon, Modal } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import styled from '@/styles';
import { UploadFile } from 'antd/lib/upload/interface';

interface IUploadComponentProps extends IClassName {
  action?: string;
  token?: string;
  avatarUrl?: string;
  onChange?: (url: string) => void;
}

interface IUploadComponentState {
  loading: boolean;
  avatarUrl: string;
}

class UploadComponent extends React.Component<IUploadComponentProps, IUploadComponentState> {
  public state = {
    loading: false,
    avatarUrl: ''
  };

  public onChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      if (this.props.onChange) {
        this.props.onChange(info.file.response.data);
      }
      this.setState({
        avatarUrl: info.file.response.data,
        loading: false
      });
    }
  };

  public render() {
    const { action, token, className, avatarUrl } = this.props;
    const { loading } = this.state;

    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div>Upload</div>
      </div>
    );

    return (
      <AntUpload
        className={className}
        name="uploadFile"
        listType="picture-card"
        showUploadList={false}
        action={action}
        headers={{
          Authorization: token || ''
        }}
        onChange={this.onChange}
      >
        {avatarUrl ? <img src={avatarUrl} alt="avatar" /> : uploadButton}
      </AntUpload>
    );
  }
}

export const Upload = styled(UploadComponent)`
  .ant-upload {
    width: 110px !important;
    height: 110px !important;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

// =========================================

interface IUploadProComponentProps extends IClassName {
  uploads?: any[];
  action?: string;
  token?: string;
  onChange?: (fileInfo: UploadChangeParam) => void;
  onRemove?: (file: UploadFile) => any;
  limit?: number;
  multiple?: boolean;
  isUrl?: boolean;
}

interface IUploadProComponentState {
  // loading: boolean;
  previewVisible: boolean;
  previewImage: string;
}

class UploadProComponent extends React.Component<IUploadProComponentProps, IUploadProComponentState> {
  static defaultProps = {
    limit: 99,
    multiple: true,
    isUrl: false
  };

  public state = {
    previewVisible: false,
    previewImage: ''
  };

  public onPreview = (file: UploadFile) => {
    this.setState({
      previewImage: file.url || file.response.data.url,
      previewVisible: true
    });
  };

  public onCancelPreview = () => this.setState({ previewVisible: false });

  // public onRemove: any = () => (file: UploadFile) =>
  //   new Promise((resolve, reject) => {
  //     Modal.confirm({
  //       title: 'Warning',
  //       content: 'Bla bla ...',
  //       okText: 'ok',
  //       okType: 'danger',
  //       cancelText: 'no',
  //       onOk: () => {
  //         if (this.props.onRemove) {
  //           if (file.response) {
  //             resolve(this.props.onRemove(file.response.data._id));
  //           } else {
  //             resolve(this.props.onRemove((file as any)._id));
  //           }
  //         }
  //       },
  //       onCancel: () => {
  //         reject(false);
  //       }
  //     });
  //   });

  public onChange = (fileInfo: UploadChangeParam) => {
    if (this.props.onChange) {
      this.props.onChange(fileInfo);
    }
  };

  public render() {
    const { action, token, uploads, limit, multiple, onRemove, className, isUrl } = this.props;
    const { previewVisible, previewImage } = this.state;

    return (
      <>
        <AntUpload
          className={className}
          name="uploadFile"
          action={action}
          listType="picture-card"
          multiple={multiple}
          headers={{
            Authorization: token || ''
          }}
          fileList={uploads}
          onPreview={this.onPreview}
          onRemove={onRemove}
          onChange={this.onChange}
        >
          {uploads ? (
            uploads.length >= limit! ? null : (
              <div>
                <Icon type="plus" />
                <div>Upload</div>
              </div>
            )
          ) : (
            <div>
              <Icon type="plus" />
              <div>Upload</div>
            </div>
          )}
        </AntUpload>
        <Modal visible={previewVisible} footer={null} onCancel={this.onCancelPreview}>
          <img style={{ width: '100%' }} src={previewImage} />
          {isUrl ? <p>{previewImage}</p> : null}
        </Modal>
      </>
    );
  }
}

export const UploadPro = UploadProComponent;
