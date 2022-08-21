const express = require('express');
const {dbQuery,add,getAll,getById,deleteById} = require('./utils')

const app = express();
app.use(express.json());

const cors=require("cors");
const { query } = require('express');
app.use(cors()) // Use this after the variable declaration

const dbAddress = './data.json';

app.get('/parkings',(req,res) => {
    const result = getAll();
    result.then((data) => {res.send(data.rows)})
})

app.get('/parkings/:id',(req,res) => {
    result = getById(req.params.id);
    result.then((data) => {res.send(data.rows[0])})
})

app.delete('/parkings/:id',(req,res) => {
    const result = deleteById(req.params.id);
    result.then((data) => {res.send(data.rows[0])});
})

app.post('/parkings',(req,res) => {
    let body = req.body;
    add(body).then((data) => {res.send(data.rows[0])})
})
const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`listening on port ${port}`));