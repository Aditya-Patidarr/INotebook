if(process.env.NODE_ENV!=="production"){
    require("dotenv").config({ path: "./backend/config.env" });
}
const connectToMongo = require('./db');
const express = require('express');
const dburl = process.env.DB_URL ;
connectToMongo(dburl); 

const app = express(); 

app.use(express.json());
const cors = require('cors')
app.use(cors())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
