import * as React from 'react'
import { Select } from 'antd'
import styled from '@/styles'
import { SelectValue } from 'antd/lib/select'

const Option = Select.Option

interface IToolbarProps extends IClassName {}

class Toolbar extends React.Component<IToolbarProps> {
  constructor(props: IToolbarProps) {
    super(props)
  }

  handleChange = (value: SelectValue) => {
    console.log(`selected ${value}`)
  }

  handleBlur = () => {
    console.log('blur')
  }

  handleFocus = () => {
    console.log('focus')
  }

  public render() {
    return (
      <div className={this.props.className}>
        <Select
          showSearch
          style={{ width: 120 }}
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
        </Select>
      </div>
    )
  }
}

export default styled(Toolbar)``
