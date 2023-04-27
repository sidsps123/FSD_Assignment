const model=require("../model/db.js");
const bcrypt = require("bcrypt")
const mysql = require("mysql")

async function recipe(req,res){
    model.db.getConnection( async (err, connection) => {
        if (err) throw (err)
        const search_query = "SELECT * FROM recipe_info"
        await connection.query (search_query, async (err, result) => {
         if (err) throw (err)
         if (result.length === 0) {
          connection.release()
          res.sendStatus(409) 
         } 
         res.status(200).json(result);
       }) 
       })
}
async function recipeitem(req,res){
  const food=req.params.id;
  model.db.getConnection( async (err, connection) => {
    if (err) throw (err)
    const sqlSearch = "SELECT * FROM recipe_info where food_name=?"
    const search_query = mysql.format(sqlSearch,[food])
    await connection.query (search_query, async (err, result) => {
     if (err) throw (err)
     res.status(200).json(result);
   }) 
   })
}
async function steps(req,res){
  const food=req.params.id;
  model.db.getConnection( async (err, connection) => {
    if (err) throw (err)
    const sqlSearch = "SELECT * FROM steps where food_name=?"
    const search_query = mysql.format(sqlSearch,[food])
    await connection.query (search_query, async (err, result) => {
     if (err) throw (err)
     res.status(200).json(result);
   }) 
   })
}

async function ingredients(req,res){
  const food=req.params.id;
  model.db.getConnection( async (err, connection) => {
    if (err) throw (err)
    const sqlSearch = "SELECT * FROM ingredients where food_name=?"
    const search_query = mysql.format(sqlSearch,[food])
    await connection.query (search_query, async (err, result) => {
     if (err) throw (err)
     res.status(200).json(result);
   }) 
   })
}
async function addRecipe(req,res){
  const food_name = req.body.food_name;
  const description=req.body.description;
  const image=req.body.image;
    model.db.getConnection( async (err, connection) => {
     if (err) throw (err)
     const sqlSearch = "SELECT * FROM recipe_info WHERE food_name = ?"
     const search_query = mysql.format(sqlSearch,[food_name])
     const sqlInsert = "INSERT INTO recipe_info VALUES (0,?,?,?)"
     const insert_query = mysql.format(sqlInsert,[food_name,description,image])
     // ? will be replaced by values
     // ?? will be replaced by string
     await connection.query (search_query, async (err, result) => {
      if (err) throw (err)
      console.log("------> Search Results")
      if (result.length != 0) {
       connection.release()
       console.log("------> Recipe already exists")
       res.sendStatus(409) 
      } 
      else {
       await connection.query (insert_query, (err, result)=> {
       connection.release()
       if (err) throw (err)
       console.log ("--------> Added new Recipe")
       console.log(result.insertId)
       res.sendStatus(201)
      })
     }
    }) 
    })
}

async function addSteps(req,res){
  const food_name = req.body.food_name;
  const steps=req.body.steps;
  const data=[];
  steps.map((item)=>{
    data.push([food_name,item]);
  })
    model.db.getConnection( async (err, connection) => {
     if (err) throw (err)
     const sqlSearch = "SELECT * FROM steps WHERE food_name = ?"
     const search_query = mysql.format(sqlSearch,[food_name])
     // ? will be replaced by values
     // ?? will be replaced by string
     await connection.query (search_query, async (err, result) => {
      if (err) throw (err)
      console.log("------> Search Results")
      if (result.length != 0) {
       connection.release()
       console.log("------> Recipe already exists")
       res.sendStatus(409) 
      } 
      else {
        const sqlInsert = "INSERT INTO steps(food_name,step) VALUES ?"
        const insert_query = mysql.format(sqlInsert,[data])
        await connection.query (insert_query,(err, result)=> {
          connection.release()
          if (err) throw (err)
          console.log ("--------> Added steps")
          console.log(result.insertId)
          res.sendStatus(201)
         })
     }
    }) 
    })
}

async function addIngredients(req,res){
  const food_name = req.body.food_name;
  const ingredients=req.body.ingredients;
  const data=[];
  ingredients.map((item)=>{
    data.push([food_name,item]);
  })
  console.log(ingredients);
    model.db.getConnection( async (err, connection) => {
     if (err) throw (err)
     const sqlSearch = "SELECT * FROM ingredients WHERE food_name = ?"
     const search_query = mysql.format(sqlSearch,[food_name])
     // ? will be replaced by values
     // ?? will be replaced by string
     await connection.query (search_query, async (err, result) => {
      if (err) throw (err)
      console.log("------> Search Results")
      if (result.length != 0) {
       connection.release()
       console.log("------> Recipe already exists")
       res.sendStatus(409) 
      } 
      else {
        const sqlInsert = "INSERT INTO ingredients(food_name,name) VALUES ?"
        const insert_query = mysql.format(sqlInsert,[data])
        await connection.query (insert_query,(err, result)=> {
          connection.release()
          if (err) throw (err)
          console.log ("--------> Added ingredients")
          console.log(result.insertId)
          res.sendStatus(201)
         })
     }
    }) 
    })
}
module.exports={recipe,recipeitem,steps,ingredients,addRecipe,addSteps,addIngredients};