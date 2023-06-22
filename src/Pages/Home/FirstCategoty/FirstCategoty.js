import React, { useEffect, useRef, useState } from "react";

import style from "./FirstCategoty.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Product from "../../../components/product/Product";
function FirstCategoty() {
  let products = useRef();

  let isDragStart = useRef(false);
  let prevPageX = useRef(0);
  let prevScroallLeft = useRef(0);

  useEffect(() => {
    products.current.addEventListener("mousedown", (e) => {
      e.preventDefault();
      prevPageX.current = e.pageX;
      prevScroallLeft.current = products.current.scrollLeft;
      isDragStart.current = true;
    });
    products.current.addEventListener("mouseup", (e) => {
      e.preventDefault();
      isDragStart.current = false;
    });
    products.current.addEventListener("mouseleave", (e) => {
      e.preventDefault();
      isDragStart.current = false;
    });
  });
  const dragging = (e) => {
    if (!isDragStart.current) return;

    e.preventDefault();
    let postitionDiff = e.pageX - prevPageX.current;
    //console.log(postitionDiff);
    products.current.scrollLeft = prevScroallLeft.current - postitionDiff;
  };

  useEffect(() => {
    //    products.current.addEventListener("mousedown", dragStart);
    products.current.addEventListener("mousemove", dragging);
  }, []);

  const [Mydata, setMyData] = useState([]);
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_URL_API +
          "home/?populate=firstcategoty.prodects.image&populate=*"
      )
      .then(function (response) {
        // console.log(
        //   response.data.data.attributes.firstcategoty.data.attributes.prodects.data
        // );
       //! setMyData(response.data.data.attributes.firstcategoty);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  //console.log(Mydata?.data?.attributes?.prodects?.data);

  let i = 0;

  let productsMAP = Mydata?.data?.attributes?.prodects?.data.map((product) => {
    if (i >= 5) {
      return false;
    }
    i++;
    let src = product.attributes;
 
//console.log(src.offerprice);
    return (
      <Product
        id={product.id}
        key={product.id}
        name={src.name}
        img={src.image.data[0].attributes.url}
        desc={product.desc}
        price={src.price}
        offerprice={src.offerprice}
      />
    );
  });
  return (
    <div className="container FirstCategoty">
      <div className="FirstCategotyOne">
        <h2>{Mydata?.data?.attributes.title}</h2>
        <Link to={"/categoty/" + Mydata?.data?.id}>see more</Link>
      </div>
      <div className="FirstCategoty-products" ref={products}>
        {productsMAP}
      </div>
    </div>
  );
}

export default FirstCategoty;
