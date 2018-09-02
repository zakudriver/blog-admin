import * as React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import styled from '@/styles'

import {menu,loadableComponents} from './menu'

import Sidber from './Sider'
import Header from './Header'

interface IHomeProps extends IClassName {}

const Main = (props: IHomeProps) => (
  <Layout className={props.className}>
    <Sidber />
    <Layout>
      <Header />
      <Layout.Content>
        <BrowserRouter>
          <Switch>
            {
              menu.map(i=>{
                if(!i.children){
                  return <Route key={i.key} path={i.path} component={loadableComponents[i.component!]}></Route>
                }else{
                  
                }
              })
            }
          </Switch>
        </BrowserRouter>
      </Layout.Content>
    </Layout>
  </Layout>
)

export default styled(Main)`
  height: 100%;
`
