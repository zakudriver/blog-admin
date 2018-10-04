import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import styled from '@/styles';
import CodeEle from './Code.ele';

interface IPreviewProps extends IClassName {
  value: string;
}

const replaceComponents = {
  code: CodeEle
};

const Preview = ({ className, value }: IPreviewProps) => (
  <div className={className} id="preview">
    <ReactMarkdown source={value} escapeHtml={false} renderers={replaceComponents} />
  </div>
);

export default styled(Preview)`
  height: 100%;
  padding: 10px;
  overflow: auto;
  background-color: #fdf6e3;

  /*滚动条整体部分,必须要设置*/
  ::-webkit-scrollbar {
    width: 4px;
    height: 0;
    background-color: #f7f7f7;
  }
  /*滚动条的轨道*/
  ::-webkit-scrollbar-track {
    background-color: #f7f7f7;
  }
  /*滚动条的滑块按钮*/
  ::-webkit-scrollbar-thumb {
    background-color: rgba(215, 215, 215, 1);
  }
  /*滚动条的上下两端的按钮*/
  ::-webkit-scrollbar-button {
    height: 0;
    background-color: #f7f7f7;
  }

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
`;
