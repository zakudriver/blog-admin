import * as React from 'react';
import { Select, Radio, Button, DatePicker } from 'antd';
import { inject, observer } from 'mobx-react';
import styled from '@/styles';
import { ActionModel } from '@/components/common';
import { SelectValue } from 'antd/lib/select';
import { RadioChangeEvent } from 'antd/lib/radio';

const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const ActionGroup = ActionModel.ActionGroup;
const ActionItem = ActionModel.ActionItem;
const ActionLine = ActionModel.ActionLine;

interface IToolbarProps extends IClassName {
  onChangeEdit?: GlobalStore.IOnChangeEdit;
  selectionEdit?: string;
  webConfig?: GlobalStore.IWebConfig;
  onChangeLanguages?: GlobalStore.IOnChangeLanguages;
  selectionLanguage?: string;
}

@inject(
  (store: IStore): IToolbarProps => {
    const { onChangeEdit, selectionEdit, webConfig, onChangeLanguages, selectionLanguage } = store.globalStore;
    return { onChangeEdit, selectionEdit, webConfig, onChangeLanguages, selectionLanguage };
  }
)
@observer
class Toolbar extends React.Component<IToolbarProps> {
  constructor(props: IToolbarProps) {
    super(props);
  }

  public onChangeLanguages = (value: SelectValue) => {
    this.props.onChangeLanguages!(value as string);
  };

  public onChange = (e: RadioChangeEvent) => {
    this.props.onChangeEdit!(e.target.value);
  };

  public render() {
    return (
      <div className={this.props.className}>
        <ActionGroup direction="right">
          <ActionItem>
            <RadioGroup onChange={this.onChange} defaultValue={this.props.selectionEdit}>
              <RadioButton value="Monaco">Monaco</RadioButton>
              <RadioButton value="CodeMirror">CodeMirror</RadioButton>
            </RadioGroup>
          </ActionItem>

          <ActionItem>
            <Select
              showSearch
              defaultValue={this.props.selectionLanguage}
              style={{ width: 120 }}
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={this.onChangeLanguages}
            >
              {this.props.webConfig!.editorLanguages.map((i, idx) => (
                <Option key={idx} value={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </ActionItem>
        </ActionGroup>

        <ActionGroup direction="right" className="classNmae__grow">
          <ActionLine border="1px solid #eee" height="40" />
          <ActionItem>
            <Select
              showSearch
              defaultValue={this.props.selectionLanguage}
              style={{ width: 120 }}
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={this.onChangeLanguages}
            >
              {this.props.webConfig!.editorLanguages.map((i, idx) => (
                <Option key={idx} value={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </ActionItem>
          <ActionItem>
            <Button type="primary" ghost>
              Edit
            </Button>
          </ActionItem>
        </ActionGroup>

        <ActionGroup direction="right" className="time__grow">
          <ActionLine border="1px solid #eee" width="10" height="32" />
          <ActionItem>
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="Time" />
          </ActionItem>
        </ActionGroup>

        <ActionGroup direction="left">
          <ActionItem>
            <Button>Save</Button>
          </ActionItem>
          <ActionItem>
            <Button type="primary">Publish</Button>
          </ActionItem>
        </ActionGroup>
      </div>
    );
  }
}

export default styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .classNmae__grow {
    margin-left: 10px;
  }

  .time__grow {
    flex-grow: 1;
  }
`;
