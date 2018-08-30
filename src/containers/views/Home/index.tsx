import * as React from 'react'
import { Layout } from 'antd'
import styled from '@/styles'

// export default class Home extends React.Component {
//   public render() {
//     return <div>home</div>
//   }
// }

interface IHomeProps {
  className?: string
}

const Home = (props: IHomeProps) => (
  <Layout className={props.className}>
    <Layout.Sider>Sider</Layout.Sider>
    <Layout>
      <Layout.Header>Header</Layout.Header>
      <Layout.Content>Content</Layout.Content>
    </Layout>
  </Layout>
)

export default styled(Home)`
  height: 100%;
`
