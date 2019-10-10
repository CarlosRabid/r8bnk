import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import Transaction from './components/Transaction';
import Operations from './components/Operations';
// import express from 'express';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      // data: [
      //   { amount: 3200, vendor: "Elevation", category: "Salary" },
      //   { amount: -7, vendor: "Runescape", category: "Entertainment" },
      //   { amount: -20, vendor: "Subway", category: "Food" },
      //   { amount: -98, vendor: "La Baguetterie", category: "Food" }
      // ],
      balance: this.getBalance
    }
  }
  async getDatafromDB() {
    let data = await axios.get('http://localhost:4328/transactions')
    // console.log(data.data)
    return this.setState({ data: data.data })
  }

  async componentDidMount() {
    await this.getDatafromDB();
    // debugger
    // let data = await this.getDatafromDB()
    let balance = this.getBalance()
    // console.log(data)
    // this.setState({data})
    return this.setState({ balance })
  }


  getBalance = () => {
    let state = [...this.state.data]
    let prop = 'amount'
    return state.reduce(function (a, b) {
      // console.log(b)
      return a + b[prop]
    }, 0);
  }
  banking = async (type, val, vendor, category) => {
    let amount = parseInt(val)
    let data = [...this.state.data]
    let balance = 0
    // let balance = this.getBalance()
    let expense = { amount, vendor, category }
    // console.log(expense)
    if (type == "Deposit") {
      await axios.post('http://localhost:4328/transaction', {
        data: {
          amount: expense.amount,
          vendor: expense.vendor,
          category: expense.category
        }
      })
      data.push(expense)
      balance = this.state.balance + amount
      // this.setState({ data })
      this.setState({ balance })
      // this.setState({ data }, function(){
      //   this.getBalance()
      // })
    } else {
      amount = -amount
      balance = this.state.balance + amount
      expense = { amount, vendor, category }
      await axios.post('http://localhost:4328/transaction', {
        data: {
          amount: expense.amount,
          vendor: expense.vendor,
          category: expense.category
        }
      })
      data.push(expense)
      // this.setState({ data })
      this.setState({ balance })
      // this.setState({ data }, function(){
      //   this.getBalance()
      // })
    }
    this.getDatafromDB()
    // await this.getBalance()
  }


  render() {
    return <div>
      {this.state.balance}

      <Transaction data={this.state.data} />
      <Operations banking={this.banking} balance={this.getBalance} />
    </div>
  }
}
export default App;
