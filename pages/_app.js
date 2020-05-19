import React from 'react'
import App from 'next/app'

import Layout from '../components/Layout'

import '../public/css/global.scss'
import 'antd/dist/antd.css'

class MyApp extends App {
  static async getInitialProps({ Component }){
      let pageProps
      if(Component.getInitialProps) {
          pageProps = await Component.getInitialProps()
      }
      return {
        pageProps
      }
  }
  render() {
    const { Component, pageProps } = this.props
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  }
}
export default MyApp


/* class MyApp extends App {

  render () {
    const { Component } = this.props
    console.log(Component)
    return (
      <div>
        <Component />
      </div>
    )
  }
} */
/* export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
} */