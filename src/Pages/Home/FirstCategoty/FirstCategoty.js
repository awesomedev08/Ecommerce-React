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
          "home/?populate=firstcategoty.prodects&populate=*&limit=5"
      )
      .then(function (response) {
        console.log(
          response.data.data.attributes.firstcategoty.data.attributes.title
        );
        setMyData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="container FirstCategoty">
      <div className="FirstCategotyOne">
        <h2>
          {Mydata.attributes !== undefined
            ? Mydata.attributes.firstcategoty.data.attributes.title
            : ""}
        </h2>
        <Link to={""}>see more</Link>
      </div>
      <div className="FirstCategoty-products" ref={products}>
        <Product id="1" />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </div>
  );
}

export default FirstCategoty;
