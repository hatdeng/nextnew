import React from 'react'
import App from 'next/app'
import { Provider } from 'react-redux'

import Layout from '../components/Layout'

import MyContext from '../lib/my-context'

import '../public/css/global.scss'
import 'antd/dist/antd.css'

//import store from '../redux/store'

import withRedux from '../lib/with-redux'

class MyApp extends App {
  state = {
    context: 'value'
  }
  static async getInitialProps(ctx){
    const { Component } = ctx
      let pageProps
      if(Component.getInitialProps) {
          pageProps = await Component.getInitialProps(ctx)
      }
      return {
        pageProps
      }
  }
  render() {
    const { Component, pageProps, reduxStore } = this.props


    return (
      <Layout>
        <Provider store={reduxStore}>
          <MyContext.Provider value={this.state.context}>
            <Component {...pageProps} />
          </MyContext.Provider>
        </Provider>
      </Layout>
    )
  }
}
export default withRedux(MyApp)


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