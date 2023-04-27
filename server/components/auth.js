const model=require("../model/db.js");
const bcrypt = require("bcrypt")
const mysql = require("mysql")

async function Signup(req,res){
    const user = req.body.username;
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    model.db.getConnection( async (err, connection) => {
     if (err) throw (err)
     const sqlSearch = "SELECT * FROM user WHERE username = ?"
     const search_query = mysql.format(sqlSearch,[user])
     const sqlInsert = "INSERT INTO user VALUES (0,?,?)"
     const insert_query = mysql.format(sqlInsert,[user, hashedPassword])
     // ? will be replaced by values
     // ?? will be replaced by string
     await connection.query (search_query, async (err, result) => {
      if (err) throw (err)
      console.log("------> Search Results")
      console.log(result.length)
      if (result.length != 0) {
       connection.release()
       console.log("------> User already exists")
       res.sendStatus(409) 
      } 
      else {
       await connection.query (insert_query, (err, result)=> {
       connection.release()
       if (err) throw (err)
       console.log ("--------> Created new User")
       console.log(result.insertId)
       res.sendStatus(201)
      })
     }
    }) 
    })  
}

async function Login(req,res){
    const user = req.body.username
    const password = req.body.password
    model.db.getConnection ( async (err, connection)=> {
     if (err) throw (err)
     const sqlSearch = "Select * from user where username = ?"
     const search_query = mysql.format(sqlSearch,[user])
     await connection.query (search_query, async (err, result) => {
      connection.release()      
      if (err) throw (err)
      if (result.length == 0) {
       console.log("--------> User does not exist")
       res.sendStatus(404);
      } 
      else {
         const hashedPassword = result[0].password
         //get the hashedPassword from result
        if (await bcrypt.compare(password, hashedPassword)) {
        console.log("---------> Login Successful")
        res.send(`${user} is logged in!`)
        } 
        else {
        console.log("---------> Password Incorrect")
        res.sendStatus(400)
        } 
      }
     }) 
    })
}

module.exports={Signup,Login};