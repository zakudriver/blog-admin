import * as React from 'react';
import { List, Input, Button } from 'antd';
import { SortableContainer, SortableElement, SortEnd } from 'react-sortable-hoc';
import immer from 'immer';
import { moveArray } from '@/utils';
import { ActionGroup } from '@/components/common';
import styled from '@/styles';

const ActionItem = ActionGroup.ActionItem;

type ICategory = ArticleStore.ICategory;

interface ISortableListProps extends IClassName {
  dataSource: ICategory[];
  onChange?: (newValue: ICategory[], from: number, to: number) => void;
  onRemove?: (value: ICategory) => void;
  onEdit?: (newValue: ICategory, oldValue: ICategory) => void;
}

class SortableList extends React.Component<ISortableListProps, any> {
  public onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    if (this.props.onChange) {
      const newValue = moveArray(this.props.dataSource, oldIndex, newIndex);
      this.props.onChange(newValue, oldIndex, newIndex);
    }
  };
  public render() {
    return (
      <div className={this.props.className}>
        <SortableWrapper
          dataSource={this.props.dataSource}
          onSortEnd={this.onSortEnd}
          onRemove={this.props.onRemove}
          onEdit={this.props.onEdit}
        />
      </div>
    );
  }
}

interface ISortableProps {
  dataSource: ICategory[];
  onRemove?: (value: ICategory) => void;
  onEdit?: (newValue: ICategory, oldValue: ICategory) => void;
}

const SortableWrapper = SortableContainer<ISortableProps>(({ dataSource, onRemove, onEdit }) => {
  return (
    <List
      bordered
      dataSource={dataSource}
      renderItem={(i: ICategory, idx: number) => (
        <SortableItemWrapper value={i} index={idx} key={idx} onEdit={onEdit} onRemove={onRemove} />
      )}
    />
  );
});

interface ISortableElementProps {
  value: ICategory;
  onRemove?: (value: ICategory) => void;
  onEdit?: (newValue: ICategory, oldValue: ICategory) => void;
}
// interface ISortableItemProps extends ISortableElementProps{}

const SortableItemWrapper = SortableElement<ISortableElementProps>(props => (
  <List.Item>
    <SortableItem {...props} />
  </List.Item>
));

// class SortableItem extends React.Component<ISortableItemProps> {
//   public state = {
//     editState: false,
//     editInput:''
//   };
//   public render() {
//     return (
//       SortableElement<ISortableElementProps>(({ value }) => <List.Item>{this.state.editState?<Input></Input>:value}</List.Item>);
//     )
//   }
// }

interface ISortableItemProps extends ISortableElementProps {}

class SortableItem extends React.Component<ISortableItemProps> {
  public state = {
    isEdit: false,
    editInput: ''
  };

  public onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      editInput: e.target.value
    });
  };

  public onEditAndSave = () => {
    const { isEdit, editInput } = this.state;
    this.setState({
      isEdit: !isEdit
    });
    if (this.state.isEdit) {
      const oldValue = Object.assign({}, this.props.value);
      const newValue = immer(this.props.value, draft => {
        draft.name = editInput;
      });
      if (editInput) {
        this.props.onEdit!(newValue, oldValue);
      }
    } else {
      this.setState({
        editInput: ''
      });
    }
  };

  public onRemove = () => {
    if (this.props.onRemove) {
      this.props.onRemove(this.props.value);
    }
  };

  public render() {
    return (
      <>
        {this.state.isEdit ? (
          <Input defaultValue={this.props.value.name} onChange={this.onChangeInput} size="small" style={{ width: '180px' }} />
        ) : (
          <span>{this.props.value.name}</span>
        )}
        <ActionGroup direction="right">
          {[
            this.props.onEdit && (
              <ActionItem key="edit">
                <Button icon={this.state.isEdit ? 'save' : 'edit'} size="small" onClick={this.onEditAndSave} />
              </ActionItem>
            ),
            this.props.onRemove && (
              <ActionItem key="delete">
                <Button icon="delete" size="small" onClick={this.onRemove} />
              </ActionItem>
            )
          ]}
        </ActionGroup>
      </>
    );
  }
}

export default styled(SortableList)`
  .ant-list-item-content.ant-list-item-content-single {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
