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
    const {name} = req.body;

    const db = dbService.getDbServiceInstance();

    const result = db.insertNewName(name);

    result
    .then(data => res.json({data: data}))
    .catch(err => console.log(err))
});

//READ
app.get('/getAll',(req,res)=>{
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();

    result
    .then(data => res.json({data: data}))
    .catch(err => console.log(err));
});

//Delete
app.delete('/delete/:id',(req,res)=>{
    const {id} = req.params;
    
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);

    result
    .then(data => res.json({success: data}))
    .catch(err=> console.log(err));
})

//Edit
app.patch('/update', (req, res) => {
    const { id, name } = req.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameById(id, name);
    
    result
    .then(data => res.json({success : data}))
    .catch(err => console.log(err));
});


const port = 3000|| process.env.PORT;

app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`);
});
