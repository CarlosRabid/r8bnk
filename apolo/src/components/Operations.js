 import React, { Component } from 'react';
    class Operations extends Component {
      constructor(){
         super()
         this.state = {
            type: "Deposit",
            amount: 0,
            vendor: "",
            category: ""
         }
      }
      getBalance (){
         return this.props.balance()
         // console.log(this.props)
      }
      update = (event) => {
         let state = {...this.state}
         let type = event.target.name
         let value = event.target.value
         this.setState({
            [type]: value
         })
         // console.log(state)
       }

      banking = (e) => {
         let type = e.target.id
         let amount = this.state.amount
         let vendor = this.state.vendor
         let category = this.state.category
         this.props.banking(type, amount,vendor,category)
         // console.log(type,amount,vendor,category)

      }

    render() {
    return <div id="u-input">
       <input type="text" placeholder="Amount" name="amount" value={this.state.amount} onChange={this.update}/>
       <input type="text" placeholder="Vendor" name="vendor" value={this.state.vendor} onChange={this.update}/>
       <input type="text" placeholder="Category" name="category" value={this.state.category} onChange={this.update}/>
      <span><button id="Deposit" onClick={this.banking}>Deposit</button><button id="Withdraw" onClick={this.banking}>Withdraw</button></span>
    </div>
    }
    }
    export default Operations;