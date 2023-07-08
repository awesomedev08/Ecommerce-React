import React, { useEffect, useState } from "react";

import style from "./ProductGroup.css";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Product from "../product/Product";
import COMPLoading from "../loading/COMPLoading";

function ProductGroup({ data, doneLoading }) {
  useEffect(() => {
    setMyData(data);
    if (doneLoading) {
      setloading(true);
    }
  }, [data]);
  // Loading
  const [loading, setloading] = useState(false);
  // ==Loading==

  const [Mydata, setMyData] = useState([]);

  // console.log(params.categotyId); // "hotspur"

  let productsMAP = Mydata?.map((product) => {
    let src = product.attributes;

    // ==api==
    // console.log(product);
    return (
      <Grid
        key={product.id}
        sx={{ display: "flex", justifyContent: "center" }}
        xs={2}
        sm={3}
        md={3}
      >
        <Product
          id={product.id}
          name={src.name}
          img={src.image.data[0].attributes.url}
          desc={product.desc}
          price={src.price}
          offerprice={src.offerprice}
          Discount={src.Discount}
        />
      </Grid>
    );
  });

  let [notFound, setnotFound] = useState("");
  useEffect(() => {
    if (Mydata?.length < 1) {
      setnotFound("not found");
    } else {
      setnotFound("");
    }
  }, [Mydata]);
  return (
    <div className="container ProductGroup-product-TOP">
      <div className="ProductGroup-product">
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 1, md: 1 }}
            columns={{ xs: 4, sm: 9, md: 12 }}
          >
            {loading ? productsMAP : <COMPLoading />}
            {loading ? notFound : ""}
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default ProductGroup;
