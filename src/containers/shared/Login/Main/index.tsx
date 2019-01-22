import * as React from 'react';
import styled from '@/styles';

interface IStoreProps extends IClassName {
  onDrawer: () => void;
  isDrawer: boolean;
  closeDrawer: () => void;
  clientWidth: number;
  config: GlobalStore.IConfig;
}

class LoginMain extends React.Component<IStoreProps> {
  public render() {
    const { className, closeDrawer, isDrawer, config, onDrawer } = this.props;
    return (
      <div className={className} onClick={closeDrawer}>
        {isDrawer && <div className="login-mask" />}
        <main>
          <HeadPic>
            <img src={config.logo} alt="headpic" />
          </HeadPic>

          <h1>{config.title}</h1>

          <LinkGroup>
            <a href="https://zyhua.cn">
              <i className="fa fa-home fa-3x fa-fw" />
            </a>
            <a onClick={onDrawer}>
              <i className="fa fa-user-circle fa-3x fa-fw" />
            </a>
          </LinkGroup>
        </main>
      </div>
    );
  }
}

const HeadPic = styled.div`
  width: 230px;
  height: 230px;
  margin: 0 auto;
  & > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const LinkGroup = styled.div`
  display: flex;
  justify-content: space-around;
  a {
    color: #eee;
  }
`;

export default styled(LoginMain)`
  height: 100vh;
  background-color: ${props => props.theme.primaryColor};
  width: ${props => (props.clientWidth ? `${props.clientWidth}px` : '100%')};
  margin-left: ${props => props.isDrawer && `${props.config.drawerWidth}%`};
  transition: margin-left 0.8s;
  position: relative;

  & > main {
    width: 400px;
    margin: 0 auto;
    padding-top: 100px;

    h1 {
      color: #ddd;
      text-align: center;
      font-size: 30px;
      margin: 40px 0;
    }
  }
  & > .login-mask {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
`;
