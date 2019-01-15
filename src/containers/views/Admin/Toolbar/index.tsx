import * as React from 'react';
import { Button } from 'antd';
import { observer, inject } from 'mobx-react';
// import { ActionGroup } from '@/components/common';
import styled from '@/styles';
import { ComponentExtends } from '@/utils/extends';

// const ActionItem = ActionGroup.ActionItem;

interface IToolbarProps extends IClassName {
  updateUserInfo: () => void;
  updateConfig: () => void;
}

@inject(
  (store: IStore): IToolbarProps => {
    const { updateUserInfo } = store.userStore;
    const { updateConfig } = store.globalStore;
    return { updateUserInfo, updateConfig };
  }
)
@observer
class Toolbar extends ComponentExtends<IToolbarProps> {
  public render() {
    const { className, updateUserInfo, updateConfig } = this.props;
    return (
      <div className={className}>
        <Button type="primary" onClick={updateUserInfo}>
          Save
        </Button>
        <Button onClick={updateConfig}>Save</Button>
      </div>
    );
  }
}

export default styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;
