import * as React from 'react';
import styled from '@/styles';
import Page from './Page';
import Article from './Article';
import { inject, observer } from 'mobx-react';

interface ICoverProps extends IClassName {
  token: string;
  frontConfig: FrontStore.IFrontConfig;
  changeCover: FrontStore.IChangeCover;
  changeArticleCover: FrontStore.IChangeArticleCover;
}

const Cover = ({ className, token, frontConfig, changeCover, changeArticleCover }: ICoverProps) => (
  <div className={className}>
    <Page token={token} cover={frontConfig.cover} changeCover={changeCover} />
    <Article token={token} articleCover={frontConfig.articleCover} changeArticleCover={changeArticleCover} />
  </div>
);

const InjectCover = inject((store: IStore) => {
  const { token } = store.userStore.tokenStore;
  const { frontConfig, changeCover, changeArticleCover } = store.frontStore;
  return { token, frontConfig, changeCover, changeArticleCover };
})(observer(Cover));

export default styled(InjectCover)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  & > div {
    /* width: calc((100% - 20px) / 2); */
    height: calc((100% - 20px) / 2);
    padding: 20px 40px;
    background-color: #fff;

    h6 {
      font-size: 24px;
      margin-bottom: 20px;
      color: ${props => props.theme.primaryColor};
    }
  }

  .page form {
    display: flex;
    justify-content: center;
  }

  .form__item {
    width: 40%;
  }

  .article {
    text-align: center;
    h6 {
      text-align: left;
    }
    &__upload {
      display: inline-block;
      margin: 40px auto;
      text-align: left;
    }
  }
`;
