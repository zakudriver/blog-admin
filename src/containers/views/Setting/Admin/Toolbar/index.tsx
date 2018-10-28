import * as React from 'react';
import { Button } from 'antd';
import { ActionGroup } from '@/components/common';
import styled from '@/styles';
import { ComponentExtends } from '@/utils/extends';

const ActionItem = ActionGroup.ActionItem;

interface IToolbarProps extends IClassName {}

class Toolbar extends ComponentExtends<IToolbarProps> {
  public render() {
    return (
      <div className={this.props.className}>
        <ActionGroup direction="right">
          <ActionItem>
            <Button type="primary">Save</Button>
          </ActionItem>
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
