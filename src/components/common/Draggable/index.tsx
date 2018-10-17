import * as React from 'react';
import { Button, Input } from 'antd';
import styled from '@/styles';
import { moveArrayItem } from '@/utils';
import { ActionGroup } from '@/components/common';

const ActionItem = ActionGroup.ActionItem;

interface IDraggableProps extends IClassName {
  dataSource: any[];
  dataIndex: string;
  onChange?: (value: any[], from: number, to: number) => void;
  onDrapEnd?: (index: number) => void;
  onRemove?: (value: any) => void;
  onEdit?: (newValue: any, oldValue: any) => void;
}

const Draggable = (props: IDraggableProps) => {
  function onChange(from: number, to: number) {
    if (from !== to) {
      const newValue = moveArrayItem(props.dataSource, from, to);
      if (typeof props.onChange === 'function') {
        props.onChange(newValue, from, to);
      }
    }
  }

  return (
    <div className={props.className}>
      <ul>
        {props.dataSource.map((i, idx) => (
          <DraggableItem
            key={idx}
            data={i}
            index={idx}
            onChange={onChange}
            dataIndex={props.dataIndex}
            onRemove={props.onRemove}
            onEdit={props.onEdit}
            className={`${idx === props.dataSource.length - 1 ? 'last__li' : undefined}`}
          />
        ))}
      </ul>
    </div>
  );
};

export default styled(Draggable)`
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  overflow: hidden;

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
    padding: 12px 24px;
    border-bottom: 1px solid #e8e8e8;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .last__li {
    border: none;
  }

  .current__li {
    border: 1px solid ${props => props.theme.primaryColor};
    border-radius: 4px;
  }
`;

interface IDraggableItemProps extends IClassName {
  data: { [i: string]: string };
  onChange: (currentIndex: number, index: number) => void;
  onDragEnd?: (index: number) => void;
  index: number;
  dataIndex: string;
  onRemove?: (value: any) => void;
  onEdit?: (newValue: any, oldValue: any) => void;
}

class DraggableItem extends React.Component<IDraggableItemProps> {
  public state = {
    isEdit: false,
    currentIndex: null,
    currentInput: ''
  };

  public onDragStart = (e: React.DragEvent) => {
    this.setState({
      currentIndex: this.props.index
    });
  };

  public onDragEnd = (e: React.DragEvent) => {
    this.setState({
      currentIndex: null
    });
    if (typeof this.props.onDragEnd === 'function') {
      this.props.onDragEnd(this.props.index);
    }
  };

  public onDragEnter = (e: React.DragEvent) => {
    this.props.onChange(this.state.currentIndex!, this.props.index);
    this.setState({
      currentIndex: this.props.index
    });
  };

  public onEditAndSave = () => {
    if (typeof this.props.onEdit === 'function') {
      this.setState({
        isEdit: !this.state.isEdit
      });
      if (this.state.isEdit) {
        const oldValue = { ...this.props.data };
        const newValue = Object.assign(this.props.data, { [this.props.dataIndex]: this.state.currentInput });
        this.props.onEdit(newValue, oldValue);
      } else {
        this.setState({
          currentInput: this.props.data[this.props.dataIndex]
        });
      }
    }
  };

  public onRemove = () => {
    if (typeof this.props.onRemove === 'function') {
      this.props.onRemove(this.props.data);
    }
  };

  public onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      currentInput: e.target.value
    });
  };

  public render() {
    return (
      <li
        draggable={true}
        onDragStart={this.onDragStart}
        onDragEnter={this.onDragEnter}
        onDragEnd={this.onDragEnd}
        className={`${this.props.className} ${this.state.currentIndex === this.props.index ? 'current__li' : undefined}`}
      >
        {this.state.isEdit ? (
          <Input value={this.state.currentInput} onChange={this.onChangeInput} size="small" style={{ width: '180px' }} />
        ) : (
          this.props.data[this.props.dataIndex]
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
      </li>
    );
  }
}
