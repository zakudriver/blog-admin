import * as React from 'react';
import { Modal, Button, Select, Input } from 'antd';
import styled from '@/styles';
import { ComponentExtends } from '@/utils/extends';
import { Draggable } from '@/components/common';

const Option = Select.Option;

interface IClassificationModalProps extends IClassName {
  visible: boolean;
  onClassificationModal: () => void;
  classification: DataStore.IClassNames[];
  sortClassification: DataStore.ISortClassification;
}

class ClassificationModal extends ComponentExtends<IClassificationModalProps> {
  public state = {
    addClassName: '',
    isAddBtn: false
  };

  public onSelectedClassName = () => {};

  public onAddClassName = async () => {
    this.onBtnState(true);
    const res = await this.classificationApi$$.addClassification({ className: this.state.addClassName });
    this.onBtnState(false);
    if (res.code === 0) {
      this.setState({
        addClassName: ''
      });
      this.$message.success(res.msg);
    } else {
      this.$message.error(res.msg);
    }
  };

  public onChangeAddClassName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      addClassName: e.target.value
    });
  };

  public onBtnState = (state: boolean) => {
    this.setState({
      isAddBtn: state
    });
  };

  public onChangeSort = (value: DataStore.IClassNames[]) => {
    this.props.sortClassification(value);
  };

  public render() {
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.props.onClassificationModal}
        footer={[
          <Button key="submit" type="primary" onClick={this.props.onClassificationModal}>
            ok
          </Button>
        ]}
        title="Classification"
      >
        <div>
          <Select
            showSearch
            style={{ width: 120 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={this.onSelectedClassName}
          >
            {this.props.classification.map((i, idx) => (
              <Option key={idx} value={i._id}>
                {i.className}
              </Option>
            ))}
          </Select>

          <div>
            <Input value={this.state.addClassName} onChange={this.onChangeAddClassName} style={{ width: '120px', marginRight: '10px' }} />
            <Button onClick={this.onAddClassName} disabled={this.state.isAddBtn}>
              Add
            </Button>
          </div>

          <Draggable dataSource={this.props.classification} dataIndex="className" onChange={this.onChangeSort} />
        </div>
      </Modal>
    );
  }
}

export default styled(ClassificationModal)``;
