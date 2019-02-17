import { createGlobalStyle } from './index';
// import { lighten, darken } from '@/utils/color';

export default createGlobalStyle`
  #app {
    height: 100vh;
    min-width: 1200px;
  }

  .pointer {
    cursor: pointer;
  }

    /*滚动条整体部分,必须要设置*/
  ::-webkit-scrollbar {
    width: 8px;
    height: 0;
    background-color: #7d7d7d;
  }
  /*滚动条的轨道*/
  ::-webkit-scrollbar-track {
    background-color: #f7f7f7;
  }
  /*滚动条的滑块按钮*/
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #7d7d7d;
  }
  /*滚动条的上下两端的按钮*/
  ::-webkit-scrollbar-button {
    height: 0;
    background-color: #f7f7f7;
  }
`;
