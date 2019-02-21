import * as React from 'react';
import styled from '@/styles';
import Contextmenu from './Contextmenu';

interface IEditProps extends IClassName {
  value?: string;
  onChange: (val: string) => void;
}

interface IEditState {
  lineNum: number;
}

class Edit extends React.Component<IEditProps, IEditState> {
  editRef: React.RefObject<HTMLTextAreaElement>;
  editorRef: React.RefObject<HTMLDivElement>;
  isUpdate = true;
  constructor(props: IEditProps) {
    super(props);
    this.editRef = React.createRef();
    this.editorRef = React.createRef();
    this.state = {
      lineNum: 1
    };
  }

  public onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
      this.updateLineNum();
    }
  };

  public onShort = (params: [string, string, string]) => {
    const [prefix, hint, subfix] = params;
    const ref = this.editRef.current!;
    const value = ref.value;
    if (ref.selectionStart || ref.selectionStart === 0) {
      const start = ref.selectionStart;
      const end = ref.selectionEnd;

      const restoreTop = ref.scrollTop;

      if (start === end) {
        ref.value = value.substring(0, start) + prefix + hint + subfix + value.substring(end, value.length);
        ref.selectionStart = start + prefix.length;
        ref.selectionEnd = end + prefix.length + hint.length;
      } else {
        ref.value =
          value.substring(0, start) + prefix + value.substring(start, end) + subfix + value.substring(end, value.length);
        ref.selectionStart = start + prefix.length;
        ref.selectionEnd = end + prefix.length;
      }

      ref.focus();
      if (restoreTop >= 0) {
        ref.scrollTop = restoreTop;
      }
      this.props.onChange(ref.value);
      this.updateLineNum();
    }
  };

  public updateLineNum = () => {
    const value = this.props.value;
    const lineNum = value ? value.split('\n').length : 1;
    this.setState({
      lineNum
    });
  };

  public componentDidMount() {
    this.updateLineNum();
  }

  public componentDidUpdate() {
    if (this.props.value && this.isUpdate) {
      this.updateLineNum();
      this.isUpdate = false;
    }
  }

  public render() {
    const { className } = this.props;
    const { value } = this.props;
    const lineNumRen = () => {
      const list = [];
      for (let i = 0; i < this.state.lineNum; i++) {
        list.push(<li key={i + 1}>{i + 1}</li>);
      }
      return <ul className="linenum">{list}</ul>;
    };

    return (
      <div className={className}>
        {/* <div className="editor" ref={this.editRef} contentEditable={'plaintext-only' as any} onInput={this.onChange} /> */}
        <div className="wrapper">
          {lineNumRen()}
          <div className="editor" ref={this.editorRef}>
            <pre>{value} </pre>
            <textarea ref={this.editRef} value={value} onChange={this.onChange} placeholder="// content..." />
          </div>
        </div>

        <Contextmenu parentRef={this.editorRef} onShort={this.onShort} />
      </div>
    );
  }
}

export default styled(Edit)`
  height: 100%;
  overflow: auto;

  .wrapper {
    display: flex;
    justify-content: space-between;
    line-height: 1.6;
    min-height: 100%;
  }

  .editor {
    flex: 1;
    position: relative;
    background-color: #fafafa;
    padding-bottom: 200px;
    & > pre {
      display: block;
      white-space: pre-wrap;
      word-wrap: break-word;
      visibility: hidden;
      margin: 0;
      font-family: inherit;
    }
    & > textarea {
      font-family: 'Consolas', 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
      position: absolute;
      top: 0;
      bottom: 0;
      padding: 8px 10px;
      font-family: inherit;
      display: block;
      height: 100%;
      width: 100%;
      overflow: hidden;
      resize: none;
      border: none;
      outline: none;
      font-size: inherit;
      color: rgba(0, 0, 0, 0.65);
      background: none;
      line-height: inherit;
    }
  }

  .linenum {
    list-style: none;
    background: #fafafa;
    padding: 8px 0 8px;
    min-width: 30px;
    text-align: center;
    border-right: 1px solid ${props => props.theme.primaryColor};
    margin: 0;
    li {
      list-style: none;
    }
  }
`;
