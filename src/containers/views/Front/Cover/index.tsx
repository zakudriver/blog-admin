import * as React from 'react'
import styled from '@/styles'

interface ICoverProps extends IClassName {}

const Cover = (props: ICoverProps) => (
    <div className={props.className}>Cover</div>
  )

export default styled(Cover)``