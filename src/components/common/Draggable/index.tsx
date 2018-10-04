import * as React from 'react';
import { Icon } from 'antd';
import styled from '@/styles';
import { moveArrayItem } from '@/utils';

interface IDraggableProps extends IClassName {
  dataSource: any[];
  dataIndex: string;
  onChange?: (value: any[], from: number, to: number) => void;
  onDrapEnd?: (index: number) => void;
}

class Draggable extends React.Component<IDraggableProps> {
  public state = {
    currentIndex: null
  };

  public onDragStart = (index: number) => (e: React.DragEvent) => {
    this.setState({
      currentIndex: index
    });
  };

  public onDragEnd = (index: number) => (e: React.DragEvent) => {
    this.setState({
      currentIndex: null
    });
    if (typeof this.props.onDrapEnd === 'function') {
      this.props.onDrapEnd(index);
    }
  };

  public onDragEnter = (index: number) => (e: React.DragEvent) => {
    this.onChange(this.state.currentIndex!, index);
    this.setState({
      currentIndex: index
    });
  };

  public onChange = (from: number, to: number) => {
    if (from !== to) {
      const newValue = moveArrayItem(this.props.dataSource, from, to);
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(newValue, from, to);
      }
    }
  };

  public render() {
    return (
      <div className={this.props.className}>
        <ul>
          {this.props.dataSource.map((i, idx) => (
            <li
              key={idx}
              draggable={true}
              onDragStart={this.onDragStart(idx)}
              onDragEnter={this.onDragEnter(idx)}
              onDragEnd={this.onDragEnd(idx)}
              className={this.state.currentIndex === idx ? 'current__li' : undefined}
            >
              {i[this.props.dataIndex]}{' '}
              <div className="sort__bar">
                <Icon type="bars" theme="outlined" style={{ fontSize: '20px' }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default styled(Draggable)`
  border-radius: 4px;
  border: 1px solid #d9d9d9;

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
    padding: 12px 24px;
    border-bottom: 1px solid #e8e8e8;
    background-color: #fff;
  }

  .sort__bar {
    float: right;
  }

  .current__li {
    border: 1px solid ${props => props.theme.primaryColor};
  }
`;
