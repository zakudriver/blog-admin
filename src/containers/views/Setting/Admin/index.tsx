import * as React from 'react'
import styled from '@/styles'

interface ISettingAdminProps extends IClassName {}

class SettingAdmin extends React.Component<ISettingAdminProps> {
  constructor(props: ISettingAdminProps) {
    super(props)
  }

  public render() {
    return (
      <div className={this.props.className}>SettingAdmin</div>
    )
  }
}


export default styled(SettingAdmin)``