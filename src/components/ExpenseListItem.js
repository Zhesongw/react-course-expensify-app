import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral'
import { removeExpense } from '../actions/expenses';

const ExpenseListItem = (props) => (
    <div>
        <h1>Description: {props.description} </h1>
        <p>Amount: {numeral(props.amount).format('$0,0.00')}</p>
        <p>Create Time: {moment(props.createdAt).format('MMMM Do, YYYY')}</p>
        <Link to={'./edit/' + props.id }>Edit</Link>
    </div>
)

export default connect()(ExpenseListItem);