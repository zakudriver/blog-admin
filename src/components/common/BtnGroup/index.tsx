// import * as React from 'react'
import styled from '@/styles'

interface IBtnGroupProps {
  direction: string
  ele: string
  pixel?: string | number
}

export default styled<IBtnGroupProps, 'div'>('div')`
  & > ${props => props.ele} {
    margin: ${props => (props.direction === 'right' ? `0 ${props.pixel || 10}px 0 0` : `0 0 0 ${props.pixel || 10}px`)};
  }
`
