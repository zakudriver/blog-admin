import * as React from 'react'
import styled from '@/styles'

interface ISettingBlogProps extends IClassName {}

class SettingBlog extends React.Component<ISettingBlogProps> {
  constructor(props: ISettingBlogProps) {
    super(props)
  }

  public render() {
    return (
      <div className={this.props.className}>SettingBlog</div>
    )
  }
}


export default styled(SettingBlog)``