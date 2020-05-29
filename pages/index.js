import Head from 'next/head'
import { connect } from 'react-redux'
import store from '../redux/store'

const HomeIndex =  ({ counter, username, rename, add }) => {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
        {counter} Welcome to <a href="https://nextjs.org">Next.js!</a> {username}
        </h1>

        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
        <input value={username} onChange={(e) => rename(e.target.value)} />
        <button onClick={() => add(counter)}>Button</button>
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>

      </main>
    </div>
  )
}

export default connect(function mapStateToProps(state) {
    return {
      counter: state.count.count,
      username: state.user.username,
    }
  },
  function mapDispatchToProps (dispatch) {
    return {
        add: (num) => dispatch({type: 'ADD', num}),
        rename: (name) => dispatch({type: 'UPDATE_USERNAME', name })
    }
})(HomeIndex)