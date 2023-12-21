const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')

const app = express()

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mern1234',
    database: 'node'
})
