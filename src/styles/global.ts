import { createGlobalStyle } from './index';
// import { lighten, darken } from '@/utils/color';

export default createGlobalStyle`
  /* ::selection{
    background: ${props => props.theme.primaryColor};
    color: ${props => props.theme.primaryColor};
  } */

  #app {
    height: 100vh;
    min-width: 1200px;
    
    
  }
`;

// button
//     .ant-btn:hover, .ant-btn:focus{
//       color: ${props => props.theme.primaryColor};
//       border-color: ${props => props.theme.primaryColor}
//     }

//     .ant-btn-danger{
//       color: #f5222d;
//       &:hover {
//         color: #fff;
//         background-color: #ff4d4f;
//         border-color: #ff4d4f;
//       }
//     }

//     .ant-btn-primary{
//       background-color: ${props => props.theme.primaryColor};
//       border-color: ${props => props.theme.primaryColor};

//       &:hover,&:focus{
//         color: #fff;
//         background-color: ${props => lighten(props.theme.primaryColor!, '4%')};
//       }
//     }

//     .ant-btn-background-ghost.ant-btn-primary{
//       color: ${props => props.theme.primaryColor};
//     }

//     .ant-radio-button-wrapper-checked{
//       border-color: ${props => props.theme.primaryColor};
//       color: ${props => props.theme.primaryColor};
//       box-shadow: -1px 0 0 0 ${props => props.theme.primaryColor};
//     }

//     .ant-radio-button-wrapper:hover, .ant-radio-button-wrapper-focused{
//       color: ${props => props.theme.primaryColor};
//     }

//     /* select */
//     .ant-select-selection:hover{
//       border-color: ${props => props.theme.primaryColor};
//     }
//     .ant-select-open.ant-select-selection{
//       border-color: ${props => props.theme.primaryColor};
//     }

//     /* menu */
//     .ant-menu-item-selected{
//       color: ${props => props.theme.primaryColor};
//     }

//     .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected{
//       /* background-color: ${props => darken(props.theme.primaryColor!, '80%')};       */
//     }

//     .ant-menu-vertical .ant-menu-item:after, .ant-menu-vertical-left .ant-menu-item:after, .ant-menu-vertical-right .ant-menu-item:after, .ant-menu-inline .ant-menu-item:after{
//       border-color: ${props => props.theme.primaryColor};
//     }

//     .ant-menu-item:hover, .ant-menu-item-active, .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open, .ant-menu-submenu-active, .ant-menu-submenu-title:hover{
//       color: ${props => props.theme.primaryColor};
//     }

//     .ant-menu-submenu-vertical > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow:after, .ant-menu-submenu-vertical-left > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow:after, .ant-menu-submenu-vertical-right > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow:after, .ant-menu-submenu-inline > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow:after, .ant-menu-submenu-vertical > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow:before, .ant-menu-submenu-vertical-left > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow:before, .ant-menu-submenu-vertical-right > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow:before, .ant-menu-submenu-inline > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow:before{
//       background: linear-gradient(to right, ${props => props.theme.primaryColor}, ${props => props.theme.primaryColor});
//     }

//     /* upload */
//     .ant-upload.ant-upload-select-picture-card:hover{
//       border-color: ${props => props.theme.primaryColor};
//     }

//     /* input */
//     .ant-input:hover{
//       border-color: ${props => props.theme.primaryColor};
//     }

//     .ant-input-number:hover, .ant-input-number:focus{
//       border-color: ${props => props.theme.primaryColor};
//     }

//     /* checkbox */
//     .ant-checkbox-wrapper:hover .ant-checkbox-inner, .ant-checkbox:hover .ant-checkbox-inner, .ant-checkbox-input:focus + .ant-checkbox-inner{
//       border-color: ${props => props.theme.primaryColor};
//     }

//     .ant-checkbox-checked .ant-checkbox-inner{
//       border-color: ${props => props.theme.primaryColor};
//       background-color: ${props => props.theme.primaryColor};
//     }