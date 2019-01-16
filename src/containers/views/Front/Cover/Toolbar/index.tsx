import * as React from 'react';
import { Button } from 'antd';
import styled from '@/styles';
import { observer, inject } from 'mobx-react';

interface IToolbarProps extends IClassName {
  updateFrontCover: () => void;
  updateFrontDefaultThumb: () => void;
}

@inject((store: IStore) => {
  const { updateFrontCover, updateFrontDefaultThumb } = store.frontStore;
  return { updateFrontCover, updateFrontDefaultThumb };
})
@observer
class Toolbar extends React.Component<IToolbarProps> {
  constructor(props: IToolbarProps) {
    super(props);
  }

  public render() {
    const { className, updateFrontCover, updateFrontDefaultThumb } = this.props;
    return (
      <div className={className}>
        <Button type="primary" onClick={updateFrontCover}>
          Save
        </Button>
        <Button onClick={updateFrontDefaultThumb}>Save</Button>
      </div>
    );
  }
}

export default styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;
