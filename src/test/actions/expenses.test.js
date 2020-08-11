import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('Test Remove Expense', () => {
    const action = removeExpense({id: '123abc'})
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        expense_id: '123abc'
    })
})

test('Test Add Expense', () => {
    const action = addExpense({description:'test', createdAt: 0, note:'note',amount:0})
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense:{
            id:expect.any(String),
            description:'test', 
            createdAt: 0, 
            note:'note',
            amount:0
        }      
    })
})

test('Test Edit Expense', () => {
    const action = editExpense({id:1 },{ amount:2})
    expect(action).toEqual({
        type:'EDIT_EXPENSE',
        id:1,
        updates:{amount:2}
    })
})