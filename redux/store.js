import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {
    count: 0
}

const userInitialState = {
    username: 'jokcy',
    age: '22'
}

const ADD = 'ADD'

function countReducer (state = initialState, action) {
    console.log(state, action)
    switch (action.type) {
        case ADD:
            return {count: state.count + (action.num || 1) }
            break;
    
        default:
            return state
            break;
    }
}

const UPDATE_USERNAME = 'UPDATE_USERNAME'



function userReducer (state = userInitialState, action) {
    switch (action.type) {
        case UPDATE_USERNAME:
            return {
                ...state,
                username: action.name
            }
            break;    
        default:
            return state
            break;
    }
}

const allReducers = combineReducers({
    count: countReducer,
    user: userReducer
})

const store = createStore(
    allReducers, {
        count: initialState,
        user: userInitialState
    },
    composeWithDevTools(applyMiddleware(ReduxThunk))
)

// action creatore
function add(num) {
    return {
        type: ADD,
        num,
    }
}

function addAsync (num) {
    return (dispatch) => {
        setTimeout(()=>{
            dispatch(add(num))
        }, 1000)
    }
}
//console.log(store)

store.dispatch(add(3))

//console.log(store.getState())

store.subscribe(() => {
    console.log('changeed', store.getState())
})
store.dispatch(addAsync(5))

store.dispatch({type: UPDATE_USERNAME, name: 'Harry'})

export default store