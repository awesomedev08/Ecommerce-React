import React, { useEffect, useState } from "react";

import style from "./Category.css";
import axios from "axios";
import { Link } from "react-router-dom";
function Category() {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_URL_API +
          "home/?populate=ShopByCategory.image&populate=*"
      )
      .then(function (response) {
        // console.log(response.data.data.attributes.ShopByCategory.data);
        setCategory(response.data.data.attributes.ShopByCategory.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  let categoryMAP = category.map((category) => {
    // console.log(category.attributes);
    // console.log(category.attributes.title);
    // console.log(category.attributes.image.data.attributes.url);
    // console.log(category.attributes.image.data.attributes.alternativeText);
    let data = category.attributes;
    return (
        <div key={category.id}>
            <Link to={data.title}>
          <span>
            <img
              src={data.image.data.attributes.url}
              alt={data.image.data.attributes.alternativeText}
            ></img>
          </span>
          <h4>{data.title}</h4>
      </Link>
        </div>
    );
  });
  return (
    <div className="CategoryTop container">
      <h2>Shop by Category</h2>
      <div className="Category">{categoryMAP}</div>
    </div>
  );
}

export default Category;
