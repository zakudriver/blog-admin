import * as React from 'react';
import { Button, Input } from 'antd';
import { ActionGroup } from '@/components/common';
import styled from '@/styles';
import { ComponentExtends } from '@/utils/extends';

const ActionItem = ActionGroup.ActionItem;

interface IToolbarProps extends IClassName {}

class Toolbar extends ComponentExtends<IToolbarProps> {
  public state = {
    isAddDisplay: false,
    isBtnLoading: false,
    add: ''
  };

  public onAddAndSave = (isAddDisplay: boolean) => async () => {
    if (!isAddDisplay) {
      this.setState({
        isAddDisplay: !isAddDisplay
      });
    } else {
      if (this.state.add) {
        this.onSaveRoot();
      } else {
        this.$message.error('not be empty');
      }
    }
  };

  public onChangeAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ add: e.target.value });
  };

  public onLoadingState = (isLoading: boolean) => {
    this.setState({
      isBtnLoading: isLoading
    });
  };

  public onSaveRoot = async () => {
    this.onLoadingState(true);
    const res = await this.rootApi$$.addRoot({ username: this.state.add });
    if (res.code === 0) {
      this.$message.success(res.msg);
    } else {
      this.$message.error(res.msg);
    }
    this.onLoadingState(false);
    this.setState({
      isAddDisplay: false,
      add: ''
    });
  };

  public onCancelAdd = () => {
    this.setState({
      isAddDisplay: false
    });
  };

  public render() {
    const { isAddDisplay, isBtnLoading, add } = this.state;
    return (
      <div className={this.props.className}>
        <ActionGroup direction="right">
          <ActionItem>
            <Button type="primary">Save</Button>
          </ActionItem>

          {isAddDisplay && (
            <ActionItem>
              <Input placeholder="add root user" value={add} onChange={this.onChangeAdd} />
            </ActionItem>
          )}

          <ActionItem>
            <Button onClick={this.onAddAndSave(isAddDisplay)} icon={isAddDisplay ? 'user-add' : ''} loading={isBtnLoading}>
              {isAddDisplay || 'Add Root'}
            </Button>
          </ActionItem>

          {isAddDisplay && (
            <ActionItem>
              <Button onClick={this.onCancelAdd}>cancel</Button>
            </ActionItem>
          )}
        </ActionGroup>
        <Button>Save</Button>
      </div>
    );
  }
}

export default styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;
