import * as React from 'react'
import * as hljs from 'highlight.js'
import styled from '@/styles'
import 'highlight.js/styles/monokai-sublime.css'

interface ICodeElementProps {
  value: string
}

export default class CodeElement extends React.PureComponent<ICodeElementProps> {
  setRef: HTMLElement | null
  constructor(props: ICodeElementProps) {
    super(props)
    this.setRef = null
  }

  public highlightCode = () => {
    hljs.highlightBlock(this.setRef!)
  }

  componentDidMount() {
    this.highlightCode()
  }

  componentDidUpdate() {
    this.highlightCode()
  }

  public render() {
    console.log(this.props.value)
    return (
      <CodeContainer>
        <code ref={ref => (this.setRef = ref)}>{this.props.value}</code>
      </CodeContainer>
    )
  }
}

const CodeContainer = styled.pre``
