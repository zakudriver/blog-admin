import * as React from 'react'
import styled from '@/styles'
import ArticleTable from './Table'

interface IArticleProps extends IClassName {}

class Article extends React.Component<IArticleProps> {
  constructor(props: IArticleProps) {
    super(props)
  }

  public render() {
    return (
      <div className={this.props.className}>
        <ArticleTable />
      </div>
    )
  }
}

export default styled(Article)``
