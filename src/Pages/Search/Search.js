import React, { useEffect, useState } from "react";

import style from "./Search.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductGroup from "../../components/productGroup/ProductGroup";
import PaginationControlled from "../../components/PaginationControlled/PaginationControlled";
function Search() {
  const { keyword } = useParams();
  const [Mydata, setMyData] = useState([]);
  const [loading, setloading] = useState(false);
  // Pagination
  const [Pagination, setPagination] = useState(1);
  // ==Pagination==
  useEffect(() => {
    setloading(false);
    // console.log(Paramsapi);
    axios
      .get(
        `${process.env.REACT_APP_URL_API}prodects?populate=*&filters[$or][0][desc][$containsi]=${keyword}&filters[$or][1][name][$containsi]=${keyword}&pagination[page]=${Pagination}`
      )
      .then(function (response) {
        //  console.log(response.data.data);
        setMyData(response.data);
      })
      .then(() => {
        setloading(true);
        //    console.log(Mydata);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [keyword, Pagination]);
  return (
    <div className="Search container">
      <div className="SearchText">
        Search : <span>{keyword}</span>
      </div>

      <ProductGroup data={Mydata.data} doneLoading={loading} />
      <PaginationControlled Mydata={Mydata} setPagination={setPagination} />
    </div>
  );
}

export default Search;
