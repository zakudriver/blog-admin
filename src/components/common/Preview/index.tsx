import * as React from 'react';
import * as marked from 'marked';
import styled from '@/styles';

interface IPreviewProps extends IClassName {
  value: string;
}

class Preview extends React.Component<IPreviewProps> {
  private _marked: typeof marked;
  constructor(props: IPreviewProps) {
    super(props);
    this._marked = marked.setOptions({
      breaks: true
    });
  }

  public componentDidUpdate() {
    window.Prism.highlightAll();
  }

  public render() {
    const { className, value } = this.props;
    return (
      <pre className={className} id="preview">
        <div dangerouslySetInnerHTML={{ __html: this._marked(value) }} />
      </pre>
    );
  }
}

export default styled(Preview)`
  height: 100%;
  padding: 10px;
  overflow: auto;
  background-color: #fdf6e3;
  white-space: pre-wrap;
  word-wrap: break-word;
  img {
    max-width: 100%;
  }

  blockquote {
    color: #666;
    margin: 0;
    padding-left: 3em;
    border-left: 0.5em #eee solid;
  }

  tr {
    border-top: 1px solid #c6cbd1;
    background: #fff;
  }

  th,
  td {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
  }

  table tr:nth-child(2n) {
    background: #f6f8fa;
  }

  code {
    display: block;
    padding: 0 8px;
    background-color: #f1f1f1 !important;
  }
`;
