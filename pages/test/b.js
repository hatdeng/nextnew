// state hooks // useState useReducer
import React, { useState, useEffect } from 'react'


function MyCountFun () {
    const [count, setCount] = useState(10)  // 
    //setCount(c => c + 1)
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