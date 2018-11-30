import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Select, Checkbox } from 'antd';
import { ActionGroup } from '@/components/common';
import styled from '@/styles';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { SelectValue } from 'antd/lib/select';

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const ActionItem = ActionGroup.ActionItem;
const ActionLine = ActionGroup.ActionLine;

interface IToolbarProps extends IClassName {
  category: ArticleStore.ICategory[];
  changeFilterCondition: ArticleStore.IChangeFilterCondition;
  changeClassNameCondition: ArticleStore.IChangeClassNameCondition;
}

interface IToolbarState {
  category: ArticleStore.ICategory[];
  checkboxOptions: string[];
}

@inject((store: IStore) => {
  const { category, changeFilterCondition, changeClassNameCondition } = store.articleStore;
  return {
    category,
    changeFilterCondition,
    changeClassNameCondition
  };
})
@observer
class Toolbar extends React.Component<IToolbarProps, IToolbarState> {
  constructor(props: IToolbarProps) {
    super(props);
    this.state = {
      category: [{ name: 'All', _id: '' } as any].concat(props.category),
      checkboxOptions: ['prod', 'dev']
    };
  }

  // public static getDerivedStateFromProps(nextProps: any) {
  //   return {
  //     category: nextProps.category.concat([{ name: '全部', _id: 'all' }])
  //   };
  // }

  public onChangeCategory = (value: SelectValue) => {
    this.props.changeClassNameCondition(value as string);
  };

  public onChangeFilter = (checkedValue: CheckboxValueType[]) => {
    console.log(checkedValue);
    if (checkedValue.length === 1) {
      this.props.changeFilterCondition(checkedValue[0] === 'prod' ? 1 : 2);
    } else {
      this.props.changeFilterCondition(0);
    }
  };

  public render() {
    console.log(this.state.category);
    return (
      <div className={this.props.className}>
        <ActionGroup direction="right">
          <ActionItem>
            <Select
              showSearch
              style={{ width: 130 }}
              placeholder="category"
              defaultValue={'all'}
              onChange={this.onChangeCategory}
            >
              {this.state.category.map((i, idx) => (
                <Option key={idx} value={i._id}>
                  {i.name}
                </Option>
              ))}
            </Select>
          </ActionItem>
        </ActionGroup>
        <ActionLine border="1px solid #eee" spacing="14" height="32" />
        <ActionGroup direction="right">
          <ActionItem>
            <CheckboxGroup options={this.state.checkboxOptions} onChange={this.onChangeFilter} />
          </ActionItem>
        </ActionGroup>
      </div>
    );
  }
}

export default styled(Toolbar)`
  display: flex;
`;
