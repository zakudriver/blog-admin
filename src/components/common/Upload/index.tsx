import * as React from 'react';
import { Upload as AntUpload, Icon } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import styled from '@/styles';

interface IUploadProps extends IClassName {
  action?: string;
  token?: string;
  avatarUrl?: string;
  onChange?: (url: string) => void;
}

interface IUploadState {
  loading: boolean;
  avatarUrl: string;
}

class Upload extends React.Component<IUploadProps, IUploadState> {
  constructor(props: IUploadProps) {
    super(props);
    this.state = {
      loading: false,
      avatarUrl: props.avatarUrl || ''
    };
  }

  public onChangeUpload = (info: UploadChangeParam) => {
    console.log('info');
    console.log(info);
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
    const { action, token, className } = this.props;
    const { loading, avatarUrl } = this.state;

    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div>Upload</div>
      </div>
    );

    return (
      <AntUpload
        className={className}
        name="avatar"
        listType="picture-card"
        showUploadList={false}
        action={action}
        headers={{
          Authorization: token || ''
        }}
        onChange={this.onChangeUpload}
      >
        {avatarUrl ? <img src={avatarUrl} alt="avatar" /> : uploadButton}
      </AntUpload>
    );
  }
}

export default styled(Upload)`
  .ant-upload {
    width: 110px !important;
    height: 110px !important;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;
