require('dotenv').config();
const express = require('express');
const app = express();

const dbService = require('./dbService');

const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//CREATE
app.post('/insert',(req,res)=>{

});

//READ
app.get('/getAll',(req,res)=>{
    console.log('test');
});


const port = 3000|| process.env.PORT;

app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`);
});
