import React, { useEffect, useState } from "react";

import style from "./Search.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductGroup from "../../components/productGroup/ProductGroup";
function Search() {
  const { keyword } = useParams();
  const [Mydata, setMyData] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(false);
    // console.log(Paramsapi);
    axios
      .get(
        `${process.env.REACT_APP_URL_API}prodects?populate=*&filters[$or][0][desc][$containsi]=${keyword}&filters[$or][1][name][$containsi]=${keyword}`
      )
      .then(function (response) {
        //  console.log(response.data.data);
        setMyData(response.data.data);
      })
      .then(() => {
        setloading(true);
        //    console.log(Mydata);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [keyword]);
  return (
    <div className="Search container">
      <div className="SearchText">
        Search : <span>{keyword}</span>
      </div>

      <ProductGroup data={Mydata} doneLoading={loading} />
    </div>
  );
}

export default Search;
