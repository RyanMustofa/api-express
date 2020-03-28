const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1973",
    database: "datadiri"
});

app.get('/',(req,res) => {
    return res.send({error: false,message: "welcome in nodejs by ryan mustofa"})
})

app.get('/user',(req,res) => {
    con.query("SELECT * FROM person",(error,result,fields) => {
        if(error) throw error
        return res.send({error: false, data: result,message : "list person"})
    })  
})

app.get('/user/:id',(req,res) => {
    const id = req.params.id
    con.query("SELECT * FROM person WHERE id=?",[id],(error,result,fields) => {
        return res.send({error: false,data: result,mesage: "data where id is "+id})
    })
})

app.post('/user',(req,res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    
    if(!firstname){
        return res.status(400).send({error: true, message : "check your first name "})
    }
    if(!lastname){
        return res.status(400).send({error: true, message : "check your last name "})
    }

    con.query("INSERT INTO person SET ?",{first_name: firstname,last_name: lastname},(error,result,fields) => {
        if(error) throw error
        return res.send({error: false,data:result[0],message:"success add data"})
    })
})

app.put('/user/:id',(req,res) => {
    const id = req.params.id;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    
    if(!firstname){
        return res.status(400).send({error: true, message : "check your first name "})
    }
    if(!lastname){
        return res.status(400).send({error: true, message : "check your last name "})
    }
    
    con.query("UPDATE person SET first_name = ? , last_name = ? WHERE id = ?",[firstname,lastname,id],(error,result,fields) => {
        if(error) throw error
        return res.send({error: false,message:"success update"})
    })
})

app.delete('/user/:id',(req,res) => {
    const id = req.params.id;
    con.query("DELETE FROM person WHERE id=?",[id],(error,result,fields) => {
        if(error) throw error
        return res.send({error: false,message: "success fully delete"})
    })
})

app.listen(8000,() => console.log('server running in port 8000'))
