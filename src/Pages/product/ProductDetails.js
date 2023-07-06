import React, { useEffect, useRef, useState } from "react";

import style from "./ProductDetails.css";

import img1 from "../../assets/image/ProductDetails/Rectangle 134.png";
import img2 from "../../assets/image/ProductDetails/Rectangle 136.png";
import img3 from "../../assets/image/ProductDetails/Rectangle 137.png";
import img4 from "../../assets/image/ProductDetails/Rectangle 138.png";
import minus from "../../assets/icon/Vector-minus.svg";
import increased from "../../assets/icon/increased-Vector.png";
import increased2 from "../../assets/icon/increased2-Vector.svg";

import Star from "../../components/star/Star";

import Facebook from "../../assets/icon/Media/Facebook-logo.svg";
import Instagram from "../../assets/icon/Media/Instagram.svg";
import github from "../../assets/icon/Media/github.svg";
import Linkedin from "../../assets/icon/Media/Linkedin.svg";
import Youtube from "../../assets/icon/Media/Youtube.svg";
import { Link, useParams } from "react-router-dom";
import ProductDetailsTabs from "./tabs/ProductDetailsTabs";
import ProductGroup from "../../components/productGroup/ProductGroup";
import axios from "axios";
import ProductGroupScroallLeft from "../../components/productGroupScroallLeft/ProductGroupScroallLeft";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/CartReducer";
import { enqueueSnackbar } from "notistack";

function ProductDetails({ Mydata }) {
  const dispatch = useDispatch();
  const params = useParams();
  const [MydataCategoties, setMyDataCategoties] = useState([]);
  const [loadingCategoties, setloadingCategoties] = useState(false);
  const [MydataProduct, setMyDataProduct] = useState([]);
  useEffect(() => {
    setMyDataProduct(Mydata);
  }, [Mydata]);

  useEffect(() => {
    setloadingCategoties(false);
    // console.log(params.itemId);
    if (MydataProduct.attributes?.categoties?.data[0].id !== undefined) {
      axios
        .get(
          `${process.env.REACT_APP_URL_API}categoties/${MydataProduct.attributes?.categoties?.data[0].id}/?populate=prodects.image`
        )
        .then(function (response) {
          //  console.log(response.data.data);
          setMyDataCategoties(response.data);
        })
        .then(() => {
          setloadingCategoties(true);
          //    console.log(Mydata);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    //  console.log(Mydata);
  }, [MydataProduct]);

  let PremierImg = useRef();
  useEffect(() => {
    document.querySelectorAll(".ProductDetailsImg img").forEach((img) => {
      img.addEventListener("click", (event) => {
        PremierImg.current.src = event.target.src;

        document.querySelectorAll(".ProductDetailsImg img").forEach((img) => {
          img.classList.remove("ProductDetailsImgBorder");
        });
        event.target.classList.add("ProductDetailsImgBorder");
      });
    });
  });

  const [Quantity, setQuantity] = useState(1);

  //console.log(MydataProduct);

  //  mapImg
  let mapImgNum = 0;
  let mapImgFilter = MydataProduct?.attributes?.image?.data.filter((img) => {
    // console.log(MydataProduct?.attributes?.image?.data.length > 1);
    if (MydataProduct?.attributes?.image?.data.length > 1) {
      if (mapImgNum > 0) {
        return img;
      }
    }
    mapImgNum++;
  });
  // console.log(mapImgFilter);

  let mapImg = mapImgFilter?.map((img) => {
    return <img key={img.id} src={img.attributes.url} alt=""></img>;
  });
  //  ==mapImg==

  return (
    <>
      <div className="container ProductDetails">
        <h3 className="ProductDetails-title-mobile">
          {MydataProduct.attributes?.name}

          <div className="priceDiv">
            {MydataProduct.attributes?.offerprice ? (
              <span className="offerPrice">
                {MydataProduct.attributes?.offerprice}$
              </span>
            ) : (
              ""
            )}
            <span
              className={
                MydataProduct.attributes?.offerprice ? "price" : "offerPrice"
              }
            >
              {MydataProduct.attributes?.price}$
            </span>
          </div>
        </h3>
        {MydataProduct?.attributes?.image?.data.length > 1 ? (
          <div className="ProductDetailsImg">
            <img
              className="ProductDetailsImgBorder"
              src={MydataProduct.attributes?.image.data[0].attributes.url}
              alt=""
            ></img>

            {mapImg}
          </div>
        ) : (
          ""
        )}
        <div className="ProductDetailsImgPremier">
          <img
            ref={PremierImg}
            src={MydataProduct.attributes?.image.data[0].attributes.url}
            alt=""
          ></img>
        </div>
        <div className="ProductDetailsAction">
          <h1>
            {" "}
            {MydataProduct.attributes?.name}
            <div className="priceDiv">
              {MydataProduct.attributes?.offerprice ? (
                <span className="offerPrice">
                  {MydataProduct.attributes?.offerprice}$
                </span>
              ) : (
                ""
              )}
              <span
                className={
                  MydataProduct.attributes?.offerprice ? "price" : "offerPrice"
                }
              >
                {MydataProduct.attributes?.price}$
              </span>
            </div>{" "}
          </h1>

          <div className="ProductDetails-Rating">
            <span className="product-Rating">{<Star number={5} />}</span>
            <span className="product-Rating-star">(4.5)</span>
          </div>

          <div className="ProductDetails-Categories">
            Categories:{" "}
            <span>
              {" "}
              <Link
                to={`/categoty/${MydataProduct.attributes?.categoties?.data[0].id}`}
              >
                {MydataProduct.attributes?.categoties?.data[0].attributes.title}
              </Link>{" "}
            </span>
          </div>

          <div className="ProductDetails-Quantity">
            <span
              className="ProductDetails-Quantity-increased"
              onClick={() => {
                if (Quantity > 1) {
                  setQuantity((unm) => (unm -= 1));
                }
              }}
            >
              <img
                src={increased}
                onClick={(event) => {
                  event.preventDefault();
                }}
                alt=""
              ></img>
            </span>
            <input
              onChange={(event) => {
                //
                setQuantity(parseFloat(event.target.value));
              }}
              type="number"
              placeholder="1"
              value={Quantity}
            ></input>{" "}
            <span
              className="ProductDetails-Quantity-decreased"
              onClick={(event) => {
                setQuantity((unm) => (unm += 1));
                console.log(Quantity);
              }}
            >
              <img
                src={increased}
                onClick={(event) => {
                  event.preventDefault();
                }}
                alt=""
              ></img>
              <img
                src={increased2}
                alt=""
                onClick={(event) => {
                  event.preventDefault();
                }}
              ></img>
            </span>
          </div>

          <div className="ProductDetails-Share">
            <span>Share</span>
            <div className="ProductDetails-Share-imgs">
              <Link to="">
                <img src={Facebook} alt="Facebook"></img>
              </Link>
              <Link to="">
                <img src={Instagram} alt="Instagram"></img>
              </Link>
              <Link to="">
                <img src={github} alt="github"></img>
              </Link>
              <Link to="">
                <img src={Linkedin} alt="Linkedin"></img>
              </Link>
              <Link to="">
                <img src={Youtube} alt="Youtube"></img>
              </Link>
            </div>

            {/* ProductDetails-Quantity mobile */}
            <div className="ProductDetails-Quantity-mobile">
              <span
                className="ProductDetails-Quantity-increased-mobile"
                onClick={() => {
                  if (Quantity > 1) {
                    setQuantity((unm) => (unm -= 1));
                  }
                }}
              >
                <img
                  src={increased}
                  onClick={(event) => {
                    event.preventDefault();
                  }}
                  alt=""
                ></img>
              </span>
              <input
                onChange={(e) => setQuantity(parseFloat(e.target.value))}
                type="number"
                placeholder="1"
                value={Quantity}
              ></input>{" "}
              <span
                className="ProductDetails-Quantity-decreased-mobile"
                onClick={(event) => {
                  setQuantity((unm) => (unm += 1));
                  console.log(Quantity);
                }}
              >
                <img
                  src={increased}
                  onClick={(event) => {
                    event.preventDefault();
                  }}
                  alt=""
                ></img>
                <img
                  src={increased2}
                  alt=""
                  onClick={(event) => {
                    event.preventDefault();
                  }}
                ></img>
              </span>
            </div>

            {/* ==ProductDetails-Quantity mobile== */}
          </div>

          <div className="ProductDetails-Add">
            <button
              className="ProductDetails-AddCart"
              onClick={() => {
                dispatch(
                  addToCart({
                    id: MydataProduct.id,
                    name: MydataProduct.attributes.name,
                    dec: MydataProduct.attributes.desc,
                    img: MydataProduct.attributes?.image.data[0].attributes.url,
                    price:
                      MydataProduct.attributes?.offerprice ||
                      MydataProduct.attributes?.price,
                    Quantity,
                  })
                );

                enqueueSnackbar(`Product added to cart. ${Quantity} items.`, {
                  variant: "success",
                });
              }}
            >
              Add To cart
            </button>
            <button className="ProductDetails-AddWish">Add To wish</button>
          </div>
        </div>
      </div>
      {/* ProductDetailsInstTow */}
      <div className="ProductDetailsInstTowTop">
        <div className="container ProductDetailsInstTow">
          <ProductDetailsTabs Mydata={MydataProduct} />
        </div>
      </div>
      {/* ==ProductDetailsInstTow== */}

      <div className=" ProductDetails-RelatedProducts">
        <div className="container">
          <h3>Related Products</h3>
        </div>
        <ProductGroupScroallLeft
          data={MydataCategoties}
          doneLoading={loadingCategoties}
        />
      </div>
    </>
  );
}

export default ProductDetails;
