import * as React from 'react'
import * as ReactMarkdown from 'react-markdown'
import styled from '@/styles'
import CodeEle from './Code.ele'
import TableEle from './Table.ele'

interface IPreviewProps extends IClassName {
  value: string
}

const replaceComponents = {
  code: CodeEle,
  table: TableEle
}

const Preview = ({ className, value }: IPreviewProps) => (
  <div className={className}>
    <ReactMarkdown source={value} escapeHtml={false} renderers={replaceComponents} />
  </div>
)

export default styled(Preview)`
  height: 100%;
`
