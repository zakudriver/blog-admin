import * as React from 'react'
import { Select, Radio, Button } from 'antd'
import { inject, observer } from 'mobx-react'
import styled from '@/styles'
import { BtnGroup } from '@/components/common'
import { SelectValue } from 'antd/lib/select'
import { RadioChangeEvent } from 'antd/lib/radio'

const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

interface IToolbarProps extends IClassName {
  onChangeEdit?: GlobalStore.IOnChangeEdit
  selectionEdit?: string
  webConfig?: GlobalStore.IWebConfig
  onChangeLanguages?: GlobalStore.IOnChangeLanguages
  selectionLanguage?: string
}

@inject(
  (store: IStore): IToolbarProps => {
    const { onChangeEdit, selectionEdit, webConfig, onChangeLanguages, selectionLanguage } = store.globalStore
    return { onChangeEdit, selectionEdit, webConfig, onChangeLanguages, selectionLanguage }
  }
)
@observer
class Toolbar extends React.Component<IToolbarProps> {
  constructor(props: IToolbarProps) {
    super(props)
  }

  public onChangeLanguages = (value: SelectValue) => {
    this.props.onChangeLanguages!(value as string)
  }

  public onChange = (e: RadioChangeEvent) => {
    this.props.onChangeEdit!(e.target.value)
  }

  public render() {
    return (
      <div className={this.props.className}>
        <BtnGroup direction="right" ele="div">
          <RadioGroup onChange={this.onChange} defaultValue={this.props.selectionEdit}>
            <RadioButton value="Monaco">Monaco</RadioButton>
            <RadioButton value="CodeMirror">CodeMirror</RadioButton>
          </RadioGroup>

          <Select
            showSearch
            defaultValue={this.props.selectionLanguage}
            style={{ width: 120 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={this.onChangeLanguages}
          >
            {this.props.webConfig!.editorLanguages.map(i => (
              <Option value={i}>{i}</Option>
            ))}
          </Select>
        </BtnGroup>

        <BtnGroup direction="left" ele="button">
          <Button>Save</Button>
          <Button type="primary">Publish</Button>
        </BtnGroup>
      </div>
    )
  }
}

export default styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .radio__group {
    margin-right: 20px;
  }
`
