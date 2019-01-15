import * as React from 'react';
import { Upload as AntUpload, Icon, Modal } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import styled from '@/styles';
import { IconBtn } from '@/components/common';

import { UploadFile } from 'antd/lib/upload/interface';

interface IUploadComponentProps extends IClassName {
  action?: string;
  token?: string;
  imgURL?: string;
  onChange?: (url: string) => void;
  onRemove?: () => void;
  isPreview?: boolean;
  size?: number;
}

interface IUploadComponentState {
  loading: boolean;
  imgURL: string;
  isShowPreview: boolean;
  previewVisible: boolean;
}

class UploadComponent extends React.Component<IUploadComponentProps, IUploadComponentState> {
  static defaultProps = {
    isPreview: false,
    size: 110
  };

  public state = {
    loading: false,
    imgURL: '',
    isShowPreview: false,
    previewVisible: false
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
        imgURL: info.file.response.data,
        loading: false
      });
    }
  };

  public onMouse = (mode: string) => () => {
    this.setState({
      isShowPreview: mode === 'Enter'
    });
  };

  public onPreview = () => {
    this.setState({
      previewVisible: true
    });
  };

  public onCancelPreview = () => {
    this.setState({
      previewVisible: false
    });
  };

  public render() {
    const { action, token, className, imgURL, isPreview, onRemove } = this.props;
    const { loading, isShowPreview, previewVisible } = this.state;

    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div>Upload</div>
      </div>
    );

    return (
      <div className={className}>
        <div onMouseEnter={this.onMouse('Enter')} onMouseLeave={this.onMouse('Leave')}>
          <AntUpload
            name="uploadFile"
            listType="picture-card"
            showUploadList={false}
            action={action}
            headers={{
              Authorization: token || ''
            }}
            onChange={this.onChange}
          >
            {imgURL ? <img src={imgURL} alt="avatar" /> : uploadButton}
          </AntUpload>
          {isPreview && isShowPreview && imgURL && (
            <div className="masking">
              <IconBtn className="iconbtn" type="eye" color="#fff" size={26} onClick={this.onPreview} />
              {onRemove && <IconBtn className="iconbtn" type="delete" color="#fff" size={26} onClick={onRemove} />}
            </div>
          )}
          {isPreview && (
            <Modal visible={previewVisible} footer={null} onCancel={this.onCancelPreview}>
              <img style={{ width: '100%' }} src={imgURL} />
            </Modal>
          )}
        </div>
      </div>
    );
  }
}

export const Upload = styled(UploadComponent)`
  & > div {
    display: inline-block;
    position: relative;
  }
  .ant-upload {
    width: ${props => props.size || 110}px !important;
    height: ${props => props.size || 110}px !important;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .masking {
    width: ${props => (props.size || 110) - 18}px;
    height: ${props => (props.size || 110) - 18}px;
    position: absolute;
    z-index: 99;
    top: 50%;
    left: 50%;
    margin-top: ${props => -((props.size || 110) - 10) / 2}px;
    margin-left: ${props => -((props.size || 110) - 10) / 2}px;
    background-color: rgba(0, 0, 0, 0.65);
    display: flex;
    justify-content: space-around;
    align-items: center;
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

  // public onChange = (fileInfo: UploadChangeParam) => {
  //   if (this.props.onChange) {
  //     this.props.onChange(fileInfo);
  //   }
  // };

  public render() {
    const { action, token, uploads, limit, multiple, onRemove, onChange, className, isUrl } = this.props;
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
          onChange={onChange}
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
