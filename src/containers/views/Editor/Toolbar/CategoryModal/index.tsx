import * as React from 'react';
import { Modal, Button, Input } from 'antd';
import styled from '@/styles';
import SortableList from './SortableList';
// import { Draggable } from '@/components/common';

interface ICategoryModalProps extends IClassName {
  visible: boolean;
  onCategoryModal: () => void;
  categories: ArticleStore.ICategories[];
  sortCategory: ArticleStore.ISortCategory;
  addCategory: ArticleStore.IAddCategory;
  updateCategory: ArticleStore.IUpdateCategory;
  removeCategory: ArticleStore.IRemoveCategory;
}

class CategoryModal extends React.Component<ICategoryModalProps> {
  public state = {
    addCategory: '',
    isAddBtn: false
  };

  public onAddClassName = async () => {
    this.onBtnState(true);
    const res = await this.props.addCategory({ name: this.state.addCategory });
    this.onBtnState(false);
    if (res.code === 0) {
      this.setState({
        addCategory: ''
      });
    }
  };

  public onChangeAddClassName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      addCategory: e.target.value
    });
  };

  public onBtnState = (state: boolean) => {
    this.setState({
      isAddBtn: state
    });
  };

  public onChangeSort = (value: ArticleStore.ICategories[]) => {
    console.log(value);
    this.props.sortCategory(value);
  };

  public onEdit = async (newRow: ArticleStore.ICategories, oldRow: ArticleStore.ICategories) => {
    if (newRow.name !== oldRow.name) {
      await this.props.updateCategory(newRow);
    }
  };

  public onRemove = async (row: ArticleStore.ICategories) => {
    await this.props.removeCategory(row);
  };

  public onSaveCategoryModal = async () => {
    await this.props.updateCategory();
  };

  public render() {
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.props.onCategoryModal}
        footer={[
          <Button key="ok" type="primary" onClick={this.onSaveCategoryModal}>
            ok
          </Button>,
          <Button key="no" onClick={this.props.onCategoryModal}>
            no
          </Button>
        ]}
        title="Category"
        className={this.props.className}
      >
        <div>
          <div className="modal__inp">
            <Input
              value={this.state.addCategory}
              onChange={this.onChangeAddClassName}
              style={{ width: '200px', marginRight: '10px' }}
            />
            <Button onClick={this.onAddClassName} disabled={this.state.isAddBtn}>
              Add
            </Button>
          </div>

          {/* <Draggable
            dataSource={this.props.category}
            dataIndex="name"
            onChange={this.onChangeSort}
            onEdit={this.onEdit}
            onRemove={this.onRemove}
          /> */}
          <SortableList
            dataSource={this.props.categories}
            onChange={this.onChangeSort}
            onEdit={this.onEdit}
            onRemove={this.onRemove}
          />
        </div>
      </Modal>
    );
  }
}

export default styled(CategoryModal)`
  .modal__inp {
    margin-bottom: 20px;
  }
`;
