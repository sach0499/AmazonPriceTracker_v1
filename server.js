const express = require('express')
const mongoose = require('mongoose')

const productRouter = require('./routers/productRouter');

const app = express();

const DB = process.env.DB || 'mongodb://localhost:27017/AmazonPriceTracker'
const PORT = process.env.PORT || 4004;


mongoose
.connect(DB, {useNewUrlParser: true, 
    useUnifiedTopology: true
     })
.then(()=> console.log('DB Connected'));


app.route('/product', productRouter)



app.listen(PORT, ()=> console.log(`Server started on port no. ${PORT}`));