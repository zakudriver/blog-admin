import * as React from 'react';
import { Button } from 'antd';
import styled from '@/styles';
import { observer, inject } from 'mobx-react';

interface IToolbarProps extends IClassName {
  updateFrontCover: () => void;
  updateFrontArticleCover: () => void;
}

@inject((store: IStore) => {
  const { updateFrontCover, updateFrontArticleCover } = store.frontStore;
  return { updateFrontCover, updateFrontArticleCover };
})
@observer
class Toolbar extends React.Component<IToolbarProps> {
  public render() {
    const { className, updateFrontCover, updateFrontArticleCover } = this.props;
    return (
      <div className={className}>
        <Button type="primary" onClick={updateFrontCover}>
          Save
        </Button>
        <Button onClick={updateFrontArticleCover}>Save</Button>
      </div>
    );
  }
}

export default styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;
