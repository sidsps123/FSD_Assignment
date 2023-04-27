import React, { useState, useEffect } from "react";
import "./Food.css";
import Header from "./Sub/Header";
import Recipes from "./Sub/Recipes";
import Axios from "axios";
import {message} from 'antd';
function Food() {
  const [search, setSerach] = useState("");
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    if(search===""){
      const res = await Axios.get(
        `http://localhost:8000/recipes`
      );
      setRecipes(res.data);
      return;
    }
    const res = await Axios.get(
      `http://localhost:8000/recipes/${search}`
    );
    setRecipes(res.data);
  };

  const onInputChange = e => {
    setSerach(e.target.value);
  };

  const onSearchClick = () => {
    getRecipes();
  };
  return (
    <div className="App">
      <Header
        search={search}
        onInputChange={onInputChange}
        onSearchClick={onSearchClick}
      />
      <div className="container">
        <Recipes recipes={recipes} />
      </div>
    </div>
  );
}

export default Food;
