import * as React from 'react';
import * as marked from 'marked';
import * as hljs from 'highlight.js';
import styled from '@/styles';
import 'highlight.js/styles/monokai-sublime.css';

interface IPreviewProps extends IClassName {
  value: string;
}

marked.setOptions({
  highlight(code) {
    return hljs.highlightAuto(code).value;
  },
  breaks: true
});

const Preview = ({ className, value }: IPreviewProps) => {
  return <div className={className} id="preview" dangerouslySetInnerHTML={{ __html: marked(value) }} />;
};

export default styled(Preview)`
  height: 100%;
  padding: 10px;
  overflow: auto;
  background-color: #fdf6e3;

  pre {
    border: 1px solid #ccc;
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
    background-color: #eee;
  }
`;
