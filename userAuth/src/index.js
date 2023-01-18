const express = require("express");
const app = express();


const mongoose = require('mongoose');

app.use(express.json())

app.use((req, res, next) => {
    console.log('HTTP methon - ' + req.method + ' ,URL - ' + req.url)
    next()

    // here we are just maintaing a log of every record 
})

const noteRouter = require("./routes/noteroutes");
const userRouter = require("./routes/userroutes");
const { error } = require("console");

app.use('/users', userRouter)
app.use('/notes', noteRouter)

app.get('/', (req, res) => {
    res.send("Hello")
})

mongoose.connect('mongodb+srv://paritosh142:Password1332@cluster0.yhy9hpo.mongodb.net/?retryWrites=true&w=majority').then(() => {
    app.listen(5000, () => {
        console.log("Server is started on port no. 5000");
    })
})
    .catch((error) => {
        console.log(error)
    })

