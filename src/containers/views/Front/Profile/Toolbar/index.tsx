import * as React from 'react';
import { inject } from 'mobx-react';
import { Button } from 'antd';

import styled from '@/styles';

interface IToolbarProps extends IClassName {
  updateFrontConfig: FrontStore.IUpdateFrontConfig;
}

@inject((store: IStore) => {
  const { updateFrontConfig } = store.frontStore;
  return { updateFrontConfig };
})
class Toolbar extends React.Component<IToolbarProps> {
  constructor(props: IToolbarProps) {
    super(props);
  }

  public render() {
    const { className, updateFrontConfig } = this.props;
    return (
      <div className={className}>
        <Button type="primary" onClick={updateFrontConfig}>
          Save
        </Button>
      </div>
    );
  }
}

export default styled(Toolbar)``;
