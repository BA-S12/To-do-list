const express =require('express')
const mysql =require('mysql')
require("dotenv").config()
const cors =require('cors')




const app = express()

const PORT =  3001;

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'toDoList'
}
)

app.post('/addTesk', async(req,res)=>{
    const {label,addDate} =req.body
    const  query = `INSERT INTO toDoList (label,addDate) VALUES('${label}','${addDate}')`

    db.query(query, (err,data)=>{
        if(err)
            console.log(err)
        else
            res.send("OK the data is added")
        }) 
}) 
app.get('/getTesk', async(req,res)=>{

    const  query = `SELECT * FROM toDoList `

    db.query(query, (err,data)=>{
        if(err)
            console.log(err)
        else
            res.send(data)
        }) 
}) 

app.post(`/deletetask/:id`, (req,res)=>{
    let id= req.params.id
    console.log(id)
    const  query = `DELETE FROM toDoList WHERE id=${id} `

    db.query(query, (err,data)=>{
        if(err)
            console.log(err)
        else
            res.send('The task is delete')
        }) 
})
app.post(`/editTask/:id`, (req,res)=>{
    let id= req.params.id
    const {label} =req.body
    const  query = `UPDATE toDoList SET label ='${label}' WHERE id=${id} `

    db.query(query, (err,data)=>{
        if(err)
            console.log(err)
        else
            res.send('The task is UPDATE')
        }) 
})












app.listen(PORT, ()=>{
    console.log("server is running at "+PORT)
})


