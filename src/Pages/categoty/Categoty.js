import React from "react";

import style from "./Categoty.css";
import { useParams } from "react-router-dom";
export default function Category() {
  let params = useParams();
  console.log(params.categotyId); // "hotspur"

  return <div>{params.categotyId}</div>;
}
