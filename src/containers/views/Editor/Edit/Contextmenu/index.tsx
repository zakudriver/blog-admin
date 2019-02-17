import * as React from 'react';
import styled from '@/styles';
import { Icon } from 'antd';

interface IContextmenuProps extends IClassName {
  parentRef?: React.RefObject<HTMLDivElement>;
  onShort: (value: string) => void;
}

interface IContextmenuState {
  visible: boolean;
}

const menus = [
  {
    icon: 'code',
    name: 'code',
    text: '```\r\r```'
  },
  {
    icon: 'picture',
    name: 'image',
    text: '![ ]()'
  }
];

class Contextmenu extends React.Component<IContextmenuProps, IContextmenuState> {
  menuRef: React.RefObject<HTMLDivElement>;
  constructor(props: IContextmenuProps) {
    super(props);
    this.menuRef = React.createRef();

    this.state = {
      visible: false
    };
  }

  public onContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    this.setState({ visible: true });

    const clickX = e.clientX;
    const clickY = e.clientY;
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    const ref = this.menuRef.current!;
    const refW = ref.offsetWidth;
    const refH = ref.offsetHeight;

    const right = screenW - clickX > refW;
    const left = !right;
    const bottom = screenH - clickY > refH;
    const top = !bottom;

    if (right) {
      ref.style.left = `${clickX}px`;
    }

    if (left) {
      ref.style.left = `${clickX - refW}px`;
    }

    if (bottom) {
      ref.style.top = `${clickY}px`;
    }
    if (top) {
      ref.style.top = `${clickY - refH}px`;
    }
  };

  public onClose = () => {
    this.setState({ visible: false });
  };

  public componentDidMount() {
    const { parentRef } = this.props;
    if (parentRef && parentRef.current) {
      parentRef.current.addEventListener('contextmenu', this.onContextMenu, false);
    }
    document.addEventListener('click', this.onClose);
  }

  public componentWillUnmount() {
    const { parentRef } = this.props;
    if (parentRef && parentRef.current) {
      parentRef.current.removeEventListener('contextmenu', this.onContextMenu);
    }
    document.removeEventListener('click', this.onClose);
  }

  public render() {
    const { className, onShort } = this.props;
    const { visible } = this.state;
    return (
      <>
        {visible && (
          <div className={className} ref={this.menuRef}>
            <ul>
              {menus.map((i, idx) => (
                <li
                  className="pointer"
                  key={idx}
                  onClick={() => {
                    onShort(i.text);
                  }}
                >
                  <Icon type={i.icon} />
                  <span>{i.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    );
  }
}

export default styled(Contextmenu)`
  z-index: 100;
  position: fixed;
  background-color: #f1f1f1;
  border-radius: 3px;
  padding: 4px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 2px;
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
    padding: 4px 10px;
    min-width: 40px;
    & > span {
      color: ${props => props.theme.primaryColor};
      margin-left: 10px;
    }
    &:not(:last-child) {
      border-bottom: 1px solid #fff;
    }
  }
`;
