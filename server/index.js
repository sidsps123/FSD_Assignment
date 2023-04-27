const  Auth =require("./components/auth.js");
const Food=require("./components/recipe.js");
const express = require("express")
const app = express()
const cors = require('cors')

require("dotenv").config()

app.use(cors())

app.use(express.json())

const port = process.env.PORT
app.listen(port,()=> console.log(`Server Started on port ${port}...`))

//signup code
app.post("/signup",Auth.Signup); 
//login code 
app.post("/login",Auth.Login);  
//retrieving all recipes data
app.get("/recipes",Food.recipe);
//retrieving searched data
app.get("/recipes/:id",Food.recipeitem);
//retrieving steps
app.get("/recipes/steps/:id",Food.steps);
//retrieving ingredients
app.get("/recipes/ingredients/:id",Food.ingredients);
//adding recipe data
app.post("/recipes",Food.addRecipe);
//adding steps
app.post("/recipes/steps",Food.addSteps);
//adding ingredients
app.post("/recipes/ingredients",Food.addIngredients);
