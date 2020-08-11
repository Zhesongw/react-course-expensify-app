import { createStore } from 'redux';

const incrementCount = ({ incrementBy=1 } = {}) => ({
    type:'INCREMENT',
    incrementBy
})

const contReducer = (state = { count:0}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count:state.count + action.incrementBy
            }
        case 'DECREMENT':
            const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return {
                count:state.count - decrementBy
            }
        case 'RESET':
            return {
                count: 0
            }
        case 'SET':
            const val = typeof action.setVal === "number" ? action.setVal : 0;
            return {
                count: val
            }
        default:
            return state;
    }
}


const store = createStore( (state={count:0},action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count:state.count + action.incrementBy
            }
        case 'DECREMENT':
            const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return {
                count:state.count - decrementBy
            }
        case 'RESET':
            return {
                count: 0
            }
        case 'SET':
            const val = typeof action.setVal === "number" ? action.setVal : 0;
            return {
                count: val
            }
        default:
            return state;
    }
})

store.subscribe( () => {
    console.log(store.getState())
})

store.dispatch(incrementCount({incrementBy:2}))
store.dispatch(incrementCount())
store.dispatch(incrementCount(10))
