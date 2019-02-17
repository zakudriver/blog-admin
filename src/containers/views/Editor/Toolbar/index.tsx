import * as React from 'react';
import { Select, Button, Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import styled from '@/styles';
import { ActionGroup } from '@/components/common';
import CategoryModal from './CategoryModal';

import { SelectValue } from 'antd/lib/select';

const Option = Select.Option;

const ActionItem = ActionGroup.ActionItem;
const ActionLine = ActionGroup.ActionLine;

interface IToolbarProps extends IClassName {
  config: GlobalStore.IConfig;
  display: string;
  changeDisplay: GlobalStore.IChangeDisplay;
  categories: ArticleStore.ICategories[];
  addCategory: ArticleStore.IAddCategory;
  sortCategory: ArticleStore.ISortCategory;
  updateCategory: ArticleStore.IUpdateCategory;
  removeCategory: ArticleStore.IRemoveCategory;
  article: ArticleStore.IArticle;
  changeArticle: ArticleStore.IChangeArticle;
  saveArticle: () => void;
  publishArticle: () => void;
  restore: () => void;
  editorLanguages: string[];
}

interface IToolbarState {
  visible: boolean;
}

@inject(
  (store: IStore): IToolbarProps => {
    const { config, display, changeDisplay, editorLanguages } = store.globalStore;
    const {
      categories,
      addCategory,
      sortCategory,
      updateCategory,
      removeCategory,
      article,
      changeArticle,
      saveArticle,
      publishArticle,
      restore
    } = store.articleStore;
    return {
      config,
      categories,
      addCategory,
      sortCategory,
      updateCategory,
      removeCategory,
      article,
      changeArticle,
      saveArticle,
      publishArticle,
      restore,
      display,
      changeDisplay,
      editorLanguages
    };
  }
)
@observer
class Toolbar extends React.Component<IToolbarProps, IToolbarState> {
  public state = {
    visible: false
  };

  public openCategoryModal = () => {
    this.setState({
      visible: !this.state.visible
    });
  };

  public onChangeCategory = (value: SelectValue) => {
    this.props.changeArticle({ category: value as string });
  };

  // public onChangeTime = (date: Moment, dateString: string) => {
  //   this.props.changeArticle({ time: dateString });
  // };

  public restore = () => {
    Modal.confirm({
      title: 'Warning',
      content: 'Bla bla ...',
      okText: 'ok',
      okType: 'danger',
      cancelText: 'no',
      onOk: async () => {
        this.props.restore();
      }
    });
  };

  public saveArticle = () => {
    Modal.confirm({
      title: 'Warning',
      content: 'Bla bla ...',
      okText: 'ok',
      cancelText: 'no',
      onOk: async () => {
        this.props.saveArticle();
      }
    });
  };

  public publishArticle = () => {
    Modal.confirm({
      title: 'Warning',
      content: 'Bla bla ...',
      okText: 'ok',
      cancelText: 'no',
      onOk: async () => {
        this.props.publishArticle();
      }
    });
  };

  public render() {
    const { className, article, categories, display, changeDisplay } = this.props;
    return (
      <div className={className}>
        <div className="article_action__grow">
          <ActionGroup direction="right">
            <ActionItem>
              <Select
                showSearch
                style={{ width: 130 }}
                placeholder="category"
                value={article.category}
                onChange={this.onChangeCategory}
              >
                {categories.map((i, idx) => (
                  <Option key={idx} value={i._id}>
                    {i.name}
                  </Option>
                ))}
              </Select>
            </ActionItem>
            <ActionItem>
              <Button type="primary" ghost onClick={this.openCategoryModal}>
                Edit
              </Button>
            </ActionItem>
          </ActionGroup>

          <ActionGroup direction="right">
            <ActionLine border="1px solid #eee" spacing="10" height="32" />
            <ActionItem>
              <Button
                type={display === 'Upload' ? 'danger' : 'primary'}
                icon="upload"
                ghost
                onClick={() => changeDisplay('Upload')}
              />
            </ActionItem>
            <ActionItem>
              <Button
                type={display === 'Cover' ? 'danger' : 'primary'}
                icon="picture"
                ghost
                onClick={() => changeDisplay('Cover')}
              />
            </ActionItem>
          </ActionGroup>
        </div>

        <ActionGroup direction="left">
          <ActionItem>
            <Button type="danger" icon="delete" onClick={this.restore} />
          </ActionItem>
          <ActionItem>
            <Button onClick={this.saveArticle} icon={this.props.article.isEdit ? 'edit' : ''}>
              Save
            </Button>
          </ActionItem>
          <ActionItem>
            <Button type="primary" onClick={this.publishArticle} icon={this.props.article.isEdit ? 'edit' : ''}>
              Publish
            </Button>
          </ActionItem>
        </ActionGroup>

        <CategoryModal
          visible={this.state.visible}
          categories={this.props.categories}
          onCategoryModal={this.openCategoryModal}
          sortCategory={this.props.sortCategory}
          addCategory={this.props.addCategory}
          updateCategory={this.props.updateCategory}
          removeCategory={this.props.removeCategory}
        />
      </div>
    );
  }
}

export default styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .article_action__grow {
    flex-grow: 1;
    display: flex;
  }
`;
