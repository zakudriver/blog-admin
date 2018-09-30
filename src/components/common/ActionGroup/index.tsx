import * as React from 'react';
import styled from '@/styles';

interface IActionGroupProps extends IClassName {
  direction: string;
  ele: string;
  pixel?: string | number;
  border?: { style: string; direction: string };
  children: React.ReactNode;
}

// export default styled<IActionGroupProps, 'div'>('div')`
//   ${props => `padding-${props.border && props.border.direction}`}: ${props => props.border && `${props.pixel || 10}px`};

//   &::before{
//     content: '';
//     position: absolute;
//     height: 32px;
//     left: 0;
//     top: 0;
//     ${props => `border-${props.border && props.border.direction}`}: ${props => props.border && props.border.style};
//   }

//   & > ${props => props.ele} {
//     position:relative;
//     margin: ${props => (props.direction === 'right' ? `0 ${props.pixel || 10}px 0 0` : `0 0 0 ${props.pixel || 10}px`)};
//     /* ${props => `border-${props.border && props.border.direction}`}: ${props =>
//   props.border && props.border.style}; */
//     /* ${props => `padding-${props.border && props.border.direction}`}: ${props =>
//   props.border && `${props.pixel || 10}px`}; */
//   }
// `;

const Wrapper = (props: IActionGroupProps) => (
  <div className={props.className}>
    <div>{props.children}</div>
  </div>
);

export default styled(Wrapper)`
  ${props => `padding-${props.border && props.border.direction}`}: ${props => props.border && `${props.pixel || 10}px`};

  &::before{
    content: '';
    position: absolute;
    height: 32px;
    left: 0;
    top: 0;
    ${props => `border-${props.border && props.border.direction}`}: ${props => props.border && props.border.style};
  }

  & > ${props => props.ele} {
    position:relative;
    margin: ${props => (props.direction === 'right' ? `0 ${props.pixel || 10}px 0 0` : `0 0 0 ${props.pixel || 10}px`)};
    /* ${props => `border-${props.border && props.border.direction}`}: ${props =>
  props.border && props.border.style}; */
    /* ${props => `padding-${props.border && props.border.direction}`}: ${props =>
  props.border && `${props.pixel || 10}px`}; */
  }
`;
