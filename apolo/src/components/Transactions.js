import React, { Component } from 'react';
class Transactions extends Component {
   render() {
      let expenses = this.props.data
      // console.log(expenses)
      // return null
      return expenses.map(e => {
         return <div className={e.category}>
            <span> {e.amount} </span>
            <span> {e.vendor} </span>
            <span> {e.category} </span></div>
      })
   }
}
export default Transactions;