import * as React from 'react'
import styled from '@/styles'

interface ITableElementProps {
  value: string
}

export default class TableElement extends React.PureComponent<ITableElementProps> {
  render() {
    return (
      <pre>
        <table style={{ border: '1px solde #ccc' }}>{this.props.value}</table>
      </pre>
    )
  }
}
