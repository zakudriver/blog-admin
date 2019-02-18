import * as React from 'react';
import styled from '@/styles';
import Contextmenu from './Contextmenu';

interface IEditProps extends IClassName {
  value?: string;
  onChange: (val: string) => void;
}

interface IEditState {
  content: string;
}

class Edit extends React.Component<IEditProps, IEditState> {
  editRef: React.RefObject<HTMLDivElement>;
  isUpdate = true;
  constructor(props: IEditProps) {
    super(props);
    this.editRef = React.createRef();
  }

  public onChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    if (this.props.onChange) {
      this.props.onChange(e.target.innerText);
    }
  };

  public onShort = (value: string) => {
    this.editRef.current!.innerText += value;
    if (this.props.onChange) {
      this.props.onChange(this.editRef.current!.innerText);
    }
  };

  public componentDidUpdate() {
    if (this.isUpdate && this.props.value) {
      this.editRef.current!.innerText = this.props.value;
      this.isUpdate = false;
    }
  }

  public render() {
    const { className } = this.props;

    return (
      <div className={className}>
        <div className="editor" ref={this.editRef} contentEditable={'plaintext-only' as any} onInput={this.onChange} />
        <Contextmenu parentRef={this.editRef} onShort={this.onShort} />
      </div>
    );
  }
}

export default styled(Edit)`
  height: 100%;

  & > .editor {
    width: 100%;
    height: 100%;
    padding: 10px;
    outline: none;
    background-color: #fafafa;
    overflow-y: auto;
  }
`;
