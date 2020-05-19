import { withRouter } from 'next/router'
//import '../public/css/test.scss'
import dynamic from 'next/dynamic'

import HelloWorld from '../components/hello-world'
import { Button } from "antd"

//import moment from 'moment'

import styled from 'styled-components'

const Title = styled.h1`
    color: #ffff00;
    font-size: 30px;
`
//import Comp from '../components/comp'
const Comp = dynamic(import('../components/comp'))

const A = ({ router, name, time }) => {
    //console.log(router)
    return (<div className="app test">

    <Title>This is title {time}</Title>
    <HelloWorld />
    <Button>TEst </Button>
    <Comp> afaa </Comp>
    <br />
    <h3>get id {router.query.id}<br /></h3>
test page
<br />
<h2>get props {name}</h2>

<style jsx>{`
    h3 {
        color: #ff0000
    }
`}</style>
</div>)
}

A.getInitialProps = async () => {
    const moment = await import('moment')
    const promise = new Promise((resolve)=>{
        setTimeout(()=>{
            resolve({
                name: 'joker',
                time: moment.default(Date.now() - 60*1000).fromNow()
            })
        }, 3000)
    })

    return await promise
    /* return {
        name: 'joker'
    } */
}

export default withRouter(A)