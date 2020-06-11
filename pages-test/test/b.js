// state hooks // useState useReducer
import React, { useState, useReducer, useContext, useEffect, useLayoutEffect, useRef, memo, useMemo, useCallback } from 'react'

import MyContext from '../../lib/my-context'


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
    const countRef = useRef() // {current: ''}
    countRef.current = count

    const config = useMemo(() => ({
        text: `Count is ${count}`,
        color: count > 3 ? 'red': 'blue',
    }), [count])

    //const hanldeButtonClick = useCallback(() => dispatchCount({type: 'add'}), [])
    const hanldeButtonClick = useMemo(
        () => () => dispatchCount({type: 'add'}),
        []
    )

    const handleAlterButtonClick = function(){
        setTimeout(() => {
            alert(countRef.current)
        }, 2000)
    }
    return (
        <div> 
            <input value={name} onChange={(e) => setName(e.target.value)} name="aaaaaaa" />
            <Child config={config} onButtonClick={hanldeButtonClick} />
            <br />
            <button onClick={handleAlterButtonClick}> Alert Count</button>
        </div>
    )
}

//function Child({ onButtonClick, config }) {
const Child = memo(function Child({ onButtonClick, config }) {
    console.log('Child Render')
    return (
        <button onClick={onButtonClick} style={{color: config.color}}>{config.text}</button>
    )
})

export default MyCountFun