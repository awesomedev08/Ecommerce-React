import React, { useEffect, useState } from "react";

import style from "./Pagecustom.css";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import Product from "../../components/product/Product";
import COMPLoading from "../../components/loading/COMPLoading";
import ProductGroup from "../../components/productGroup/ProductGroup";
import { useParams } from "react-router-dom";

function Pagecustom() {
  const params = useParams();
  const [Mydata, setMyData] = useState([]);
  const [h1, seth1] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(false);
    // console.log(Paramsapi);
    axios
      .get(
        `${process.env.REACT_APP_URL_API}prodects?populate=*&filters[${params.key}][$notNull]=null`
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
  }, [params.key]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL_API}menu-seconds/${params.id}`)

      .then(function (response) {
        //  console.log(response.data.data);
        seth1(response.data.data.attributes);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [params.id]);
  return (
    <>
      <h1 style={{ color: h1.color }}>{h1.name}</h1>
      <ProductGroup data={Mydata} doneLoading={loading} />
    </>
  );
}

export default Pagecustom;
