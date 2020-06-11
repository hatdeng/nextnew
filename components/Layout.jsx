import Link from  'next/link'
import { Buttion, Layout } from 'antd';

const { Header, Content, Footer } = Layout

export default ({ children }) => (
    <Layout>
        <header>
           <span>This is header</span>
        </header>
        <Content>    {children}</Content>
        <Footer>
            Develop by Harry
        </Footer>
    </Layout>
)