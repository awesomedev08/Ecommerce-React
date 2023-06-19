import React from 'react'

import style from "./product.css"
import { useParams } from 'react-router-dom';
function Product() {
    let params = useParams();
    console.log(params.itemId); // "hotspur"
  return (
    <div>
        
    </div>
  )
}

export default Product