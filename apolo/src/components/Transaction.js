import React, { Component } from 'react';
import Transactions from './Transactions';
class Transaction extends Component {
    render() {
        return <Transactions data={this.props.data} />
    }
}
export default Transaction;