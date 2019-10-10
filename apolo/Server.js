
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const PORT = 4328
const router = express.Router()
const request = require('request')
// import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

app.use(express.static(path.join(__dirname, 'components')))
// app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

mongoose.connect('mongodb://localhost/apolox', { useNewUrlParser: true })

const Schema = mongoose.Schema
const TxSchema = new Schema({
    amount: Number,
    category: String,
    vendor: String
})
const Tx = mongoose.model('txs', TxSchema)

app.get('/transactions', async function (req, res) {
    await Tx.find({}, function (err, result) {
        // console.log("getting route")
        res.send(result)
    })
})
app.post('/transaction', async function (req, res) {
    // console.log(req.body)
    let amount = req.body.data.amount
    let category = req.body.data.category
    let vendor = req.body.data.vendor
    // console.log(amount,category,vendor)
    let nTx = new Tx({amount, category, vendor})
    nTx.save(
        res.send()
    )
    // await Tx.find({}, function (err, result) {
    //     console.log("getting route")
    // })
})

app.listen(PORT, function () {
    console.log('run')
})

// class Server extends Component {
//     render() {
//         return <div>found 402</div>
//     }
// }

