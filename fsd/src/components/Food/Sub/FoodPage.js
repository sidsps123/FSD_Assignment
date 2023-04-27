import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
function FoodPage(){
const {id}=useParams();
const[steps,setSteps]=useState([]);
const[ingredients,setIngredients]=useState([]);
const[desc,setDesc]=useState("");
const[img,setImg]=useState("/");
var count=0;
useEffect(() => {
    getData();
  }, []);
const getData=async()=>{
    const res= await Axios.get(`http://localhost:8000/recipes/${id}`);
    const res1 = await Axios.get(`http://localhost:8000/recipes/steps/${id}`);
    const res2 = await Axios.get(`http://localhost:8000/recipes/ingredients/${id}`);
    setDesc(res.data[0].description);
    setImg(res.data[0].image);
    setSteps(res1.data);
    setIngredients(res2.data);
}
return(
    <div class="card py-2 text-center ">
     <h1>Welcome to {id} Page</h1>
    <div>
        <img src={img} style={{"height":"200px","width":"200px"}}className="rounded-circle"  alt=""/>
    </div>
    <div class="card-body">
      <h5>{id}</h5>
        {desc}
    </div>
    <div class="card-body">
        <div>Ingredients used are:-</div>
        <ul style={{"listStyleType":"none"}}>
            {ingredients.map(item=>(
                <li>{item.name}</li>
            ))}
        </ul>
    </div>
    <div>
        <div>Steps to make {id} are:-</div>
        <ul style={{"listStyleType":"none","marginLeft":"530px","textAlign":"left"}}>
            {steps.map(item=>(
                <li>Step {++count}:- {item.step}</li>
            ))}
        </ul>
    </div>
  </div>
)
}
export default FoodPage;