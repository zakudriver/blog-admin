import * as React from 'react';
import styled from '@/styles';

interface IStoreProps {
  className?: string;
  onDrawer: () => void;
  isDrawer: boolean;
  closeDrawer: () => void;
  clientWidth: number;
  webConfig: IGlobalStore.webConfig;
}

class Main extends React.Component<IStoreProps> {
  public render() {
    return (
      <div className={this.props.className} onClick={this.props.closeDrawer}>
        {this.props.isDrawer && <div className="login-mask" />}
        <main>
          <HeadPic>
            <img src={require('@/assets/img/J0003_m.97851d87.png')} alt="headpic" />
          </HeadPic>

          <h1>{this.props.webConfig.title}</h1>

          <LinkGroup>
            <li>
              <a href="https://zyhua.cn">
                <i className="fa fa-home fa-3x fa-fw" />
              </a>
            </li>
            <li>
              <a onClick={this.props.onDrawer}>
                <i className="fa fa-user-circle fa-3x fa-fw" />
              </a>
            </li>
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
  }
`;

const LinkGroup = styled.ul`
  display: flex;
  justify-content: space-around;
`;

export default styled(Main)`
  height: 100vh;
  background-color: ${props => props.theme.primaryColor};
  width: ${props => `${props.clientWidth}px`};
  margin-left: ${props => props.isDrawer && `${props.webConfig.drawerWidth}%`};
  transition: margin-left 0.8s;
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
  }
`;
