
import {createStore, combineReducers} from 'redux';
import { v4 as uuidv4 } from 'uuid';


//ADD_EXPENSE
const addExpense = ( {
    description = '',
    note = '',
    amount = 0,
    createAt = 0
} = {} ) => ({
    type:'ADD_EXPENSE',
    expense: {
        id: uuidv4(),
        description,
        note,
        amount,
        createAt
    }
})


//REMOVE_EXPENSE
const removeExpense = (
    { id }
) => ({
    type:'REMOVE_EXPENSE',
    expense_id:id
})

//EDIT_EXPENSE
const editExpense = ( {id}, updates) => ({
    type:'EDIT_EXPENSE',
    id,
    updates
})

//SET_TEXT_FILTER
const setTextFilter = ( text = '') => ({
    type:'SET_TEXT_FILTER',
    text
})

//SORT_BY_AMOUNT
const sortByAmount = () => ({
    type:'SORT_BY_AMOUNT'
})
//SORT_BY_DATE
const sortByDate = () => ({
    type:'SORT_BY_DATE'
})
//SET_START_DATE
const setStartDate = (date) => ({
    type:'SET_START_DATE',
    date
})
//SET_END_DATE
const setEndDate = (date) => ({
    type:'SET_END_DATE',
    date
})

//SET_SORT_BY

const setSortBy = (sortby) => ({
    type:'SET_SORT_BY',
    sortby
})


const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type){
        case 'ADD_EXPENSE':
            return [...state, action.expense]
        case 'REMOVE_EXPENSE':
            return state.filter( ({id}) => id !== action.expense_id )
        case 'EDIT_EXPENSE':
            return state.map( (expense) => {
                if(expense.id === action.id){
                    return {
                        ...expense,
                        ...action.updates
                    };
                }else{
                    return expense;
                }
            })
        default:
            return state
    }
}

const filtersReducerDefaultState = {
    text: '',
    sortBy:'date',
    startDate: undefined,
    endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text:action.text
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate:action.date
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate:action.date
            }
        case 'SET_SORT_BY'  :
            return {
                ...state,
                sortBy:action.sortby
            }
        default:
            return state
    }
}

//timestamp: which we use in our time system, is the milliseconds after Jan 1st 1970
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate}) =>{
    return expenses.filter((expense) => {
        const startDateMatach =  typeof startDate !== 'number' || expense.createAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createAt <= endDate;;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatach && endDateMatch && textMatch;
    }).sort((a, b) =>{
        if(sortBy === 'date'){
            return a.createAt - b.createAt;
        }else if(sortBy === 'amount'){
            return a.amount - b.amount;
        }
    })
}


const store = createStore(combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
}));

store.subscribe(() => {
    const state = store.getState();
    console.log( getVisibleExpenses(state.expenses, state.filters));
})

store.dispatch(addExpense({description: 'COFFEE', note:'hot coffee', amount: 700, createAt:0}))
store.dispatch(addExpense({description: 'TEA', note:'hot tea', amount: 650, createAt:100}))
store.dispatch(setSortBy('amount'))
store.dispatch(setSortBy('date'))

const demoState = {
    expenses:[{
        id:'Anonymas',
        description:'Jam',
        note:'A text',
        amount:54500,
        createAt: 0
    }],
    filters:{
        text: 'rent',
        sortBy:'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
}
