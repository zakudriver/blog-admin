import * as React from 'react'
import styled from '@/styles'

interface ICodeElementProps {
  value: string
}

export default class CodeElement extends React.PureComponent<ICodeElementProps> {
  render() {
    return (
      <pre>
        <code style={{ color: 'red' }}>{this.props.value}</code>
      </pre>
    )
  }
}
