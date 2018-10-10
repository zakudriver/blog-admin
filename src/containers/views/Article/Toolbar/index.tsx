import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Select } from 'antd';
import { ActionModel } from '@/components/common';
import styled from '@/styles';

const Option = Select.Option;
const ActionGroup = ActionModel.ActionGroup;
const ActionItem = ActionModel.ActionItem;

interface IToolbarProps extends IClassName {
  classification: DataStore.IClassNames[];
}

interface IToolbarState {
  classification: DataStore.IClassNames[];
}

@inject((store: IStore) => {
  const { classification } = store.dataStore;
  return {
    classification
  };
})
@observer
class Toolbar extends React.Component<IToolbarProps, IToolbarState> {
  constructor(props: IToolbarProps) {
    super(props);
    this.state = {
      classification: [{ name: '全部', _id: 'all' } as any].concat(props.classification)
    };
  }

  // public static getDerivedStateFromProps(nextProps: any) {
  //   return {
  //     classification: nextProps.classification.concat([{ name: '全部', _id: 'all' }])
  //   };
  // }

  public onChangeClassification = () => {};

  public render() {
    console.log(this.state.classification);
    return (
      <div className={this.props.className}>
        <ActionGroup direction="right">
          <ActionItem>
            <Select
              showSearch
              style={{ width: 130 }}
              placeholder="classification"
              defaultValue={'all'}
              onChange={this.onChangeClassification}
            >
              {this.state.classification.map((i, idx) => (
                <Option key={idx} value={i._id}>
                  {i.name}
                </Option>
              ))}
            </Select>
          </ActionItem>
        </ActionGroup>
      </div>
    );
  }
}

export default styled(Toolbar)``;
