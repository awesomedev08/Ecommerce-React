import { useEffect, useRef, useState } from "react";

import style from "./Categoty.css";
import { useParams } from "react-router-dom";
import Category from "../../components/Category/Category";
import SearchIcon from "@mui/icons-material/Search";

// Checkbox
import CheckboxIcon from "../../assets/icon/uil_check.svg";
import CheckedboxIcon from "../../assets/icon/uil_check-un.svg";
import CheckboxIconStormyStraitGreen from "../../assets/icon/uil_check-StormyStraitGreen.svg";
import CheckedboxIconStormyStraitGreen from "../../assets/icon/uil_check-un-StormyStraitGreen.svg";

// star-un-filled
import starFilled from "../../assets/icon/ant-design_star-filled.svg";

import starUnFilled from "../../assets/icon/ant-design_star-un-filled.svg";
// ==star-un-filled==
// ==Checkbox==

// ''
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import Product from "../../components/product/Product";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputBase,
} from "@mui/material";

// PriceFilter-Search-Vector
import PriceFilterSearchVector from "../../assets/icon/PriceFilter-Search-Vector.svg";

// PriceFilter-Search-Vector==

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
// '' ==

export default function CategotyPage() {
  // PriceFilter-Search

  let inputRef = useRef(null);
  const handleInputToggle = () => {
    inputRef.current.focus();
  };

  // ==PriceFilter-Search==

  // api
  let params = useParams();
  const [categotyId, setcategotyId] = useState(params.categotyId);

  const [Mydata, setMyData] = useState([]);

  useEffect(() => {
    setcategotyId(params.categotyId);
  }, [params.categotyId]);

  useEffect(() => {
    axios
      .get(
        ` ${process.env.REACT_APP_URL_API}prodects?filters[categoties][id][$eq]=${categotyId}&populate=*`
      )
      .then(function (response) {
        //  console.log(response.data.data);
        setMyData(response.data.data);
      })
      .then(() => {
        console.log(Mydata);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [categotyId]);
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
        sm={4}
        md={3}
      >
        <Product
          id={product.id}
          name={src.name}
          img={src.image.data[0].attributes.url}
          desc={product.desc}
          price={src.price}
          offerprice={src.offerprice}
        />
      </Grid>
    );
  });
  return (
    <div className="CategotyPage-top">
      <div className="Categoty-Category">
        <Category />
      </div>

      <div className="CategotyPage-product-filter-Mobile"></div>
      <div className="CategotyPage container">
        <div className="CategotyPage-product-filter">
          <span className="Product-filter-titel">Product Brand</span>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  icon={<img src={CheckedboxIcon} alt="" />}
                  checkedIcon={<img src={CheckboxIcon} alt="" />}
                />
              }
              label="Coaster Furniture"
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<img src={CheckedboxIcon} alt="" />}
                  checkedIcon={<img src={CheckboxIcon} alt="" />}
                />
              }
              label="Fusion Dot High Fashion"
              icon={<img src={CheckedboxIcon} alt="" />}
              checkedIcon={<img src={CheckboxIcon} alt="" />}
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<img src={CheckedboxIcon} alt="" />}
                  checkedIcon={<img src={CheckboxIcon} alt="" />}
                />
              }
              label="Unique Furnitture Restor"
              icon={<img src={CheckedboxIcon} alt="" />}
              checkedIcon={<img src={CheckboxIcon} alt="" />}
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<img src={CheckedboxIcon} alt="" />}
                  checkedIcon={<img src={CheckboxIcon} alt="" />}
                />
              }
              label="Dream Furnitture Flipping"
              icon={<img src={CheckedboxIcon} alt="" />}
              checkedIcon={<img src={CheckboxIcon} alt="" />}
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<img src={CheckedboxIcon} alt="" />}
                  checkedIcon={<img src={CheckboxIcon} alt="" />}
                />
              }
              label="Young Repurposed"
              icon={<img src={CheckedboxIcon} alt="" />}
              checkedIcon={<img src={CheckboxIcon} alt="" />}
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<img src={CheckedboxIcon} alt="" />}
                  checkedIcon={<img src={CheckboxIcon} alt="" />}
                />
              }
              label="Green DIY furniture"
              icon={<img src={CheckedboxIcon} alt="" />}
              checkedIcon={<img src={CheckboxIcon} alt="" />}
            />
          </FormGroup>

          <span className="Product-filter-titel">Discount Offer</span>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<img src={CheckedboxIcon} alt="" />}
                  checkedIcon={<img src={CheckboxIcon} alt="" />}
                />
              }
              label="20% Cashback"
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<img src={CheckedboxIcon} alt="" />}
                  checkedIcon={<img src={CheckboxIcon} alt="" />}
                />
              }
              label="5% Cashback Offer"
              icon={<img src={CheckedboxIcon} alt="" />}
              checkedIcon={<img src={CheckboxIcon} alt="" />}
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<img src={CheckedboxIcon} alt="" />}
                  checkedIcon={<img src={CheckboxIcon} alt="" />}
                />
              }
              label="25% Discount Offer"
              icon={<img src={CheckedboxIcon} alt="" />}
              checkedIcon={<img src={CheckboxIcon} alt="" />}
            />
          </FormGroup>

          <span className="Product-filter-titel">Rating Item</span>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<img src={CheckboxIconStormyStraitGreen} alt="" />}
                  checkedIcon={
                    <img src={CheckedboxIconStormyStraitGreen} alt="" />
                  }
                />
              }
              label={
                <div className="starDiv">
                  <div>
                    <img src={starFilled}></img>
                    <img src={starFilled}></img>
                    <img src={starFilled}></img>
                    <img src={starFilled}></img>
                    <img src={starUnFilled}></img>
                  </div>

                  <span>(3243)</span>
                </div>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<img src={CheckboxIconStormyStraitGreen} alt="" />}
                  checkedIcon={
                    <img src={CheckedboxIconStormyStraitGreen} alt="" />
                  }
                />
              }
              label={
                <div className="starDiv">
                  <div>
                    <img src={starFilled}></img>
                    <img src={starFilled}></img>
                    <img src={starFilled}></img>

                    <img src={starUnFilled}></img>
                    <img src={starUnFilled}></img>
                  </div>

                  <span>(2006)</span>
                </div>
              }
              icon={<img src={CheckboxIconStormyStraitGreen} alt="" />}
              checkedIcon={<img src={CheckedboxIconStormyStraitGreen} alt="" />}
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<img src={CheckboxIconStormyStraitGreen} alt="" />}
                  checkedIcon={
                    <img src={CheckedboxIconStormyStraitGreen} alt="" />
                  }
                />
              }
              label={
                <div className="starDiv">
                  <div>
                    <img src={starFilled}></img>
                    <img src={starFilled}></img>

                    <img src={starUnFilled}></img>
                    <img src={starUnFilled}></img>
                    <img src={starUnFilled}></img>
                  </div>

                  <span>(243)</span>
                </div>
              }
              icon={<img src={CheckboxIconStormyStraitGreen} alt="" />}
              checkedIcon={<img src={CheckedboxIconStormyStraitGreen} alt="" />}
            />
          </FormGroup>

          <span className="Product-filter-titel">Discount Offer</span>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<img src={CheckedboxIcon} alt="" />}
                  checkedIcon={<img src={CheckboxIcon} alt="" />}
                />
              }
              label="20% Cashback"
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<img src={CheckedboxIcon} alt="" />}
                  checkedIcon={<img src={CheckboxIcon} alt="" />}
                />
              }
              label="5% Cashback Offer"
              icon={<img src={CheckedboxIcon} alt="" />}
              checkedIcon={<img src={CheckboxIcon} alt="" />}
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<img src={CheckedboxIcon} alt="" />}
                  checkedIcon={<img src={CheckboxIcon} alt="" />}
                />
              }
              label="25% Discount Offer"
              icon={<img src={CheckedboxIcon} alt="" />}
              checkedIcon={<img src={CheckboxIcon} alt="" />}
            />
          </FormGroup>

          <span className="Product-filter-titel">Price Filter</span>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<img src={CheckedboxIcon} alt="" />}
                  checkedIcon={<img src={CheckboxIcon} alt="" />}
                />
              }
              label={<div className="PriceFilter">$0.00 - $150.00</div>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<img src={CheckedboxIcon} alt="" />}
                  checkedIcon={<img src={CheckboxIcon} alt="" />}
                />
              }
              label={<div className="PriceFilter">$150.00 - $350.00</div>}
              icon={<img src={CheckedboxIcon} alt="" />}
              checkedIcon={<img src={CheckboxIcon} alt="" />}
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<img src={CheckedboxIcon} alt="" />}
                  checkedIcon={<img src={CheckboxIcon} alt="" />}
                />
              }
              label={<div className="PriceFilter">$150.00 - $504.00</div>}
              icon={<img src={CheckedboxIcon} alt="" />}
              checkedIcon={<img src={CheckboxIcon} alt="" />}
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<img src={CheckedboxIcon} alt="" />}
                  checkedIcon={<img src={CheckboxIcon} alt="" />}
                />
              }
              label={<div className="PriceFilter">$450.00 +</div>}
              icon={<img src={CheckedboxIcon} alt="" />}
              checkedIcon={<img src={CheckboxIcon} alt="" />}
            />
          </FormGroup>

          <div className="PriceFilter-Search">
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="$10.00 - 20000$"
              inputProps={{ "aria-label": "$10.00 - 20000$" }}
              inputRef={inputRef}
            ></InputBase>
            <div onClick={handleInputToggle}>
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <img src={PriceFilterSearchVector} alt="" />
              </IconButton>
            </div>
          </div>

          <div className="Product-filter-Color">
            <span className="Product-filter-titel ">Filter By Color</span>
            <div>
              <FormGroup className="Product-filter-Color-Form">
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<span className="CheckboxBlue"> </span>}
                      checkedIcon={<span className="CheckedboxBlue"> </span>}
                    />
                  }
                  label="Blue"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<span className="CheckboxOrange"></span>}
                      checkedIcon={<span className="CheckedboxOrange"></span>}
                    />
                  }
                  label="Orange"
                  icon={<img src={CheckedboxIcon} alt="" />}
                  checkedIcon={<img src={CheckboxIcon} alt="" />}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<span className="CheckboxBrown"></span>}
                      checkedIcon={<span className="CheckedboxBrown"></span>}
                    />
                  }
                  label="Brown"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<span className="CheckboxGreen"></span>}
                      checkedIcon={<span className="CheckedboxGreen"></span>}
                    />
                  }
                  label="Green"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<span className="CheckboxPurple"></span>}
                      checkedIcon={<span className="CheckedboxPurple"></span>}
                    />
                  }
                  label="Purple"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<span className="CheckboxSky"></span>}
                      checkedIcon={<span className="CheckedboxSky"></span>}
                    />
                  }
                  label="Sky"
                />
              </FormGroup>
            </div>
          </div>
        </div>

        <div className="CategotyPage-product">
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 1, md: 1 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {productsMAP}
            </Grid>
          </Box>
        </div>
      </div>
      {params.categotyId}
    </div>
  );
}
