import Link from "antd/es/typography/Link";
import React from "react";
import {useNavigate} from "react-router-dom";
const RecipeItem = props => {
  const navigate=useNavigate();
  const { name, image} = props;
  function open(){
    navigate(`/food/${name}`);
  }
  return (
      <div class="card py-2 text-center" onClick={open}  style={{"cursor":"pointer"}}>
        <img src={image} className="img-fluid w-50 mx-auto rounded-circle" />
        <div class="card-body">
          <h5>{name}</h5>
        </div>
      </div>
  );
};

export default RecipeItem;
