import moment from 'moment';

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate}) =>{
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt)
        const startDateMatach =  startDate ? startDate.isSameOrBefore(createdAtMoment,'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrBefore(createdAtMoment,'day') : true;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatach && endDateMatch && textMatch;
    }).sort((a, b) =>{
        if(sortBy === 'date'){
            return a.createdAt - b.createdAt;
        }else if(sortBy === 'amount'){
            return a.amount - b.amount;
        }
    })
}

export default getVisibleExpenses;