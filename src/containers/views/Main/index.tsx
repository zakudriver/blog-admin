import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import styled from '@/styles'

import { menu, loadableComponents } from './menu'

import Sidber from './Sider'
import Header from './Header'

interface IMainProps extends IClassName {}

const Main = (props: IMainProps) => {
  console.log('Main——render')
  return (
    <Layout className={props.className}>
      <Sidber />
      <Layout>
        <Header />
        <Layout.Content className="layout__content">
          <Switch>
            {menu.map(i => {
              if (i.path) {
                return <Route key={i.key} exact={i.exact} path={i.path} component={loadableComponents[i.component!]} />
              } else {
                return null
              }
            })}
          </Switch>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default styled(Main)`
  height: 100%;
  .layout__content {
    padding: 24px;
    height: 100%;
    background-color: #f0f2f5;
  }
`
