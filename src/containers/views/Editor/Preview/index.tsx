import * as React from 'react'
import * as ReactMarkdown from 'react-markdown'
import styled from '@/styles'

interface IPreviewProps extends IClassName {}

class Preview extends React.Component<IPreviewProps> {
  constructor(props: IPreviewProps) {
    super(props)
  }

  public render() {
    const input = '# This is a header\n\nAnd this is a paragraph'

    return (
      <div className={this.props.className}>
        <ReactMarkdown source={input} />
      </div>
    )
  }
}

export default styled(Preview)`
  height: 100%;
`
