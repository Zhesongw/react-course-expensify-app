import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeExpense } from '../actions/expenses';

const ExpenseListItem = (props) => (
    <div>
        <h1>Description: {props.description} </h1>
        <p>Amount: {props.amount}</p>
        <p>Create Time: {props.createdAt}</p>
        <Link to={'./edit/' + props.id }>Edit</Link>
    </div>
)

export default connect()(ExpenseListItem);