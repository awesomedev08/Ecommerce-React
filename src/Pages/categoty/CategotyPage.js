import { useEffect, useRef, useState } from "react";

import style from "./Categoty.css";
import { useParams } from "react-router-dom";
import Category from "../../components/Category/Category";
import SearchIcon from "@mui/icons-material/Search";

// Checkbox
import CheckboxIcon from "../../components/Icon/CheckboxIcon";
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

let handleUseFilter;
export default function CategotyPage() {
  // PriceFilter-Search

  let inputRef = useRef(null);
  const handleInputToggle = () => {
    inputRef.current.focus();
  };

  // ==PriceFilter-Search==

  // api
  let params = useParams();

  // searchParams api
  const [ParamsapiToUrl, setParamsToUrl] = useState("");
  let url = new URL(
    ` ${process.env.REACT_APP_URL_API}prodects?filters[categoties][id][$eq]=${params.categotyId}&populate=*${ParamsapiToUrl}`
  );

  const [Paramsapi, setParams] = useState(url.href);
  // SearchParams("brands", "append" , "filters[brands][id][$eq]", src.id)
  const [ParamsapiFilters, setParamsFilters] = useState([]);
  // SearchParams("brands", "delete" , "filters[brands][id][$eq]", src.id)
  function SearchParams(name, action, params, value) {
    if (name === "brands") {
      if (action === "append") {
        //   console.log("append");
        setParamsFilters((oldArray) => [
          ...oldArray,
          {
            params: params,
            value: value,
          },
        ]);
      }
      if (action === "delete") {
        // console.log("delete");
        setParamsFilters((oldArray) => {
          const newArray = oldArray.filter((filter) => {
            return filter.params !== params || filter.value !== value;
          });
          return newArray;
        });
      }
    }

    // Cashback
    if (
      name === "Cashback" ||
      name === "Discount" ||
      name === "Color" ||
      name === "price"
    ) {
      if (action === "append") {
        //   console.log("append");
        setParamsFilters((oldArray) => [
          ...oldArray,
          {
            params: params,
            value: value,
          },
        ]);
      }
      if (action === "delete") {
        setParamsFilters((oldArray) => {
          const newArray = oldArray.filter((filter) => {
            return filter.params !== params || filter.value !== value;
          });
          return newArray;
        });
      }
    }
    // ==Cashback==
  }

  useEffect(() => {
    console.log(ParamsapiFilters);
    let urlfilter = "";

    ParamsapiFilters.map((filter) => {
      urlfilter += `&${filter.params}=${filter.value}&`;
    });

    console.log(urlfilter);
    setParamsToUrl(urlfilter);
  }, [ParamsapiFilters]);
  // ==searchParams api==

  // handleUseFilter

  handleUseFilter = function (set) {
    SetUseFilter(set);
    setParamsToUrl("");
    console.log("handleUseFilter");
    console.log(set);
  };

  // ==handleUseFilter==

  const [Mydata, setMyData] = useState([]);

  useEffect(() => {
    setParams(url.href);
  }, [params.categotyId, ParamsapiToUrl]);

  useEffect(() => {
    console.log(Paramsapi);

    axios
      .get(Paramsapi)
      .then(function (response) {
        //  console.log(response.data.data);
        setMyData(response.data.data);
      })
      .then(() => {
        //    console.log(Mydata);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [Paramsapi]);
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

  // Product Brand

  const [useFilter, SetUseFilter] = useState(false);
  const [dataBrand, SetDataBrand] = useState([]);

  useEffect(() => {
    const ws = [];
    let productsBrandsFilter = Mydata?.filter((product) => {
      let src = product?.attributes.brands.data[0];
      //console.log(product);
      if (src) {
        if (!ws?.includes(src?.id)) {
          ws.push(src?.id);
          return true;
        } else {
          return false;
        }
      }
    });
    let productsBrandsMAP = productsBrandsFilter?.map((product) => {
      let src = product?.attributes.brands.data[0];
      //  console.log(src);
      return (
        <div key={src.id} className="productsBrandsMAP">
          <FormControlLabel
            control={
              <Checkbox
                onClick={(e) => {
                  // console.log("===");
                  // console.log(src.id);
                  // console.log(e.target.checked);
                  SetUseFilter(true);
                  if (e.target.checked) {
                    SearchParams(
                      "brands",
                      "append",
                      "filters[brands][id][$eq]",
                      src.id
                    );
                  } else {
                    SearchParams(
                      "brands",
                      "delete",
                      "filters[brands][id][$eq]",
                      src.id
                    );
                  }
                }}
                icon={<img src={CheckedboxIcon} alt="" />}
                checkedIcon={<CheckboxIcon />}
                inputProps={{ "aria-label": "Checkbox" }}
              />
            }
            label={src.attributes?.Brand}
          />
        </div>
      );
    });
    //console.log(productsBrandsFilter);
    if (!useFilter) {
      SetDataBrand(productsBrandsMAP);
    }
  }, [Mydata]);

  // ==Product Brand==
  return (
    <div className="CategotyPage-top">
      {/* {console.log(dataBrand)} */}
      <div className="Categoty-Category">
        <Category />
      </div>

      <div className="CategotyPage-product-filter-Mobile"></div>
      <div className="CategotyPage container">
        <div className="CategotyPage-product-filter">
          <span className="Product-filter-titel">Product Brand</span>
          <FormGroup>{dataBrand}</FormGroup>

          <span className="Product-filter-titel">Discount Offer</span>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onClick={(e) => {
                    console.log("===");
                    console.log("20% Cashback");
                    console.log(e.target.checked);

                    SetUseFilter(true);
                    if (e.target.checked) {
                      SearchParams(
                        "Cashback",
                        "append",
                        "filters[Cashback][$lte]",
                        20
                      );
                    } else {
                      SearchParams(
                        "Cashback",
                        "delete",
                        "filters[Cashback][$lte]",
                        20
                      );
                    }
                  }}
                  icon={<img src={CheckedboxIcon} alt="" />}
                  checkedIcon={<CheckboxIcon />}
                />
              }
              label="20% Cashback"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onClick={(e) => {
                    console.log("===");
                    console.log("5% Cashback Offer");
                    console.log(e.target.checked);
                    SetUseFilter(true);
                    if (e.target.checked) {
                      SearchParams(
                        "Cashback",
                        "append",
                        "filters[Cashback][$lte]",
                        5
                      );
                    } else {
                      SearchParams(
                        "Cashback",
                        "delete",
                        "filters[Cashback][$lte]",
                        5
                      );
                    }
                  }}
                  icon={<img src={CheckedboxIcon} alt="" />}
                  checkedIcon={<CheckboxIcon />}
                />
              }
              label="5% Cashback Offer"
              icon={<img src={CheckedboxIcon} alt="" />}
              checkedIcon={<CheckboxIcon />}
            />
            <FormControlLabel
              control={
                <Checkbox
                  onClick={(e) => {
                    console.log("===");
                    console.log("25% Discount Offer");
                    console.log(e.target.checked);
                    SetUseFilter(true);
                    if (e.target.checked) {
                      SearchParams(
                        "Discount",
                        "append",
                        "filters[Discount][$lte]",
                        25
                      );
                    } else {
                      SearchParams(
                        "Discount",
                        "delete",
                        "filters[Discount][$lte]",
                        25
                      );
                    }
                  }}
                  icon={<img src={CheckedboxIcon} alt="" />}
                  checkedIcon={<CheckboxIcon />}
                />
              }
              label="25% Discount Offer"
              icon={<img src={CheckedboxIcon} alt="" />}
              checkedIcon={<CheckboxIcon />}
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

          <span className="Product-filter-titel">Price Filter</span>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onClick={(e) => {
                    console.log("===");
                    console.log("$0.00 - $150.00");
                    console.log(e.target.checked);

                    SetUseFilter(true);
                    if (e.target.checked) {
                      SearchParams(
                        "price",
                        "append",
                        "filters[price][$lte]",
                        150
                      );
                    } else {
                      SearchParams(
                        "price",
                        "delete",
                        "filters[price][$lte]",
                        150
                      );
                    }
                  }}
                  icon={<img src={CheckedboxIcon} alt="" />}
                  checkedIcon={<CheckboxIcon />}
                />
              }
              label="$0.00 - $150.00"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onClick={(e) => {
                    console.log("===");
                    console.log("$150.00 - $350.00");
                    console.log(e.target.checked);
                    SetUseFilter(true);
                    if (e.target.checked) {
                      SearchParams(
                        "price",
                        "append",
                        "filters[price][$gte]",
                        150
                      );
                      SearchParams(
                        "price",
                        "append",
                        "filters[price][$lte]",
                        350
                      );
                    } else {
                      SearchParams(
                        "price",
                        "delete",
                        "filters[price][$gte]",
                        150
                      );
                      SearchParams(
                        "price",
                        "delete",
                        "filters[price][$lte]",
                        350
                      );
                    }
                  }}
                  icon={<img src={CheckedboxIcon} alt="" />}
                  checkedIcon={<CheckboxIcon />}
                />
              }
              label="$150.00 - $350.00"
              icon={<img src={CheckedboxIcon} alt="" />}
              checkedIcon={<CheckboxIcon />}
            />
            <FormControlLabel
              control={
                <Checkbox
                  onClick={(e) => {
                    console.log("===");
                    console.log("$150.00 - $504.00");
                    console.log(e.target.checked);
                    SetUseFilter(true);
                    if (e.target.checked) {
                      SearchParams(
                        "price",
                        "append",
                        "filters[price][$gte]",
                        150
                      );
                      SearchParams(
                        "price",
                        "append",
                        "filters[price][$lte]",
                        504
                      );
                    } else {
                      SearchParams(
                        "price",
                        "delete",
                        "filters[price][$gte]",
                        150
                      );
                      SearchParams(
                        "price",
                        "delete",
                        "filters[price][$lte]",
                        504
                      );
                    }
                  }}
                  icon={<img src={CheckedboxIcon} alt="" />}
                  checkedIcon={<CheckboxIcon />}
                />
              }
              label="$150.00 - $504.00"
              icon={<img src={CheckedboxIcon} alt="" />}
              checkedIcon={<CheckboxIcon />}
            />

            <FormControlLabel
              control={
                <Checkbox
                  onClick={(e) => {
                    console.log("===");
                    console.log("$450.00 +");
                    console.log(e.target.checked);
                    SetUseFilter(true);
                    if (e.target.checked) {
                      SearchParams(
                        "price",
                        "append",
                        "filters[price][$gte]",
                        450
                      );
                    } else {
                      SearchParams(
                        "price",
                        "delete",
                        "filters[price][$gte]",
                        450
                      );
                    }
                  }}
                  icon={<img src={CheckedboxIcon} alt="" />}
                  checkedIcon={<CheckboxIcon />}
                />
              }
              label="$450.00 +"
              icon={<img src={CheckedboxIcon} alt="" />}
              checkedIcon={<CheckboxIcon />}
            />
          </FormGroup>

          <div className="PriceFilter-Search">
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="$10.00 - 20000$"
              inputProps={{ "aria-label": "$10.00 - 20000$" }}
              inputRef={inputRef}
              onChange={(e) => {
                console.log(e.target.value);
              }}
              type="number"
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
                      onClick={() => {
                        console.log("Blue");
                      }}
                      icon={<span className="CheckboxBlue"> </span>}
                      checkedIcon={<span className="CheckedboxBlue"> </span>}
                    />
                  }
                  label="Blue"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onClick={() => {
                        console.log("Orange");
                      }}
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
                      onClick={() => {
                        console.log("Brown");
                      }}
                      icon={<span className="CheckboxBrown"></span>}
                      checkedIcon={<span className="CheckedboxBrown"></span>}
                    />
                  }
                  label="Brown"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onClick={() => {
                        console.log("Green");
                      }}
                      icon={<span className="CheckboxGreen"></span>}
                      checkedIcon={<span className="CheckedboxGreen"></span>}
                    />
                  }
                  label="Green"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onClick={() => {
                        console.log("Purple");
                      }}
                      icon={<span className="CheckboxPurple"></span>}
                      checkedIcon={<span className="CheckedboxPurple"></span>}
                    />
                  }
                  label="Purple"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onClick={() => {
                        console.log("Sky");
                      }}
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

export { handleUseFilter };
