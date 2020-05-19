// state hooks // useState useReducer
import React, { useState, useReducer, useContext, useEffect, useLayoutEffect, useRef } from 'react'

import MyContext from '../../lib/my-context'

class MyCount extends React.Component {
    constructor() {
        super()
        this.ref = React.createRef()
    }
    state = {
        count: 0
    }

    componentDidMount () {
        console.log(this.ref.current)
        this.interval = setInterval(() => {
            this.setState({count: this.state.count + 1})
        }, 1000)
    }
    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval)
        }
    }

    handleButtonClick() {
        setTimeout()
    }

    render() { 
        return (
            <span ref={this.ref}>{this.state.count}</span>
         );
    }
}


function countReducer(state, action) {
    switch (action.type) {
        case 'add':
            return state + 1
            break;
        case 'minus':
            return state -1
            break;
        default:
            return state 
            break;
    }
}

function MyCountFun () {
    //const [count, setCount] = useState(10)  // 
    const [count, dispatchCount] = useReducer(countReducer, 0)
    const [name, setName] = useState('jokcy')

    const getMyContext = useContext(MyContext)

    const inputRef =  useRef()
    
    //setCount(c => c + 1)
    /* useEffect(()=>{
        const interval = setInterval(() => {
            //setCount({count: count + 1})
            //setCount(c => c + 1)
            dispatchCount({ type: 'add' })
        }, 1000)

        return () => clearInterval(interval)
    }, []) */
    // 更新dom之前
    useLayoutEffect(() => {
        console.log('effect layout invoked')
        console.log(inputRef)
        return () => console.log('effect layout deteched')
    }, [count])
    
    // 更新dom之后
    useEffect(() => {
        console.log('effect invoked')
        return () => console.log('effect deteched')
    }, [count])

    return (
        <div>
        <input ref={inputRef} value={name} onChange={(e) => setName(e.target.value)} name="aaaaaaa" />
        

        <button onClick={() => dispatchCount({type: 'add'})}>{count}</button>


        </div>
    );
}

export default MyCountFun


/* function MyCountFun () {
    const [count, setCount] = useState(0)  // 

    useEffect(()=>{
        const interval = setInterval(() => {
            //setCount({count: count + 1})
            setCount(c => c + 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <span>{count}</span>
     );
}

export default MyCountFun */
/* class MyCount extends React.Component {
    state = {
        count: 0
    }

    componentDidMount () {
        this.interval = setInterval(() => {
            this.setState({count: this.state.count + 1})
        }, 1000)
    }
    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval)
        }
    }
    render() { 
        return (
            <span>{this.state.count}</span>
         );
    }
}
 
export default MyCount; */