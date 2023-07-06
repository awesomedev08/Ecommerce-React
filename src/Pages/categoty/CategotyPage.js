import { Fragment, useEffect, useRef, useState, useCallback } from "react";

import style from "./Categoty.css";
import { useParams } from "react-router-dom";
import Category from "../../components/Category/Category";
import SearchIcon from "@mui/icons-material/Search";

// ==Checkbox==

// ''
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import Product from "../../components/product/Product";

// PriceFilter-Search-Vector
import PriceFilterSearchVector from "../../assets/icon/PriceFilter-Search-Vector.svg";
import COMPLoading from "../../components/loading/COMPLoading";
import Filter from "./Filter";

// PriceFilter-Search-Vector==
// CategotyPage-product-filter-Mobile
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
// ==CategotyPage-product-filter-Mobile==

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
// '' ==
let FParamsFilters;
export default function CategotyPage() {
  // api
  let params = useParams();
  let paramsFilters = `filters[name][$containsi]=${params.filter}`;

  //console.log(params.filter);
  if (params.filter === null || params.filter === undefined) {
    paramsFilters = "";
  }
  // searchParams api
  const [ParamsapiToUrl, setParamsToUrl] = useState("");
  let url = new URL(
    ` ${process.env.REACT_APP_URL_API}prodects?filters[categoties][id][$eq]=${params.categotyId}&populate=*${ParamsapiToUrl}&${paramsFilters}`
  );

  const [Paramsapi, setParams] = useState(url.href);

  useEffect(() => {
    setParams(url.href);
  }, [params.categotyId, ParamsapiToUrl, params.filter]);

  // SearchParams("brands", "append" , "filters[brands][id][$eq]", src.id)
  const [ParamsapiFilters, setParamsFilters] = useState([]);

  FParamsFilters = function FParamsFilters() {
    setParamsFilters([]);
  };

  // SearchParams("brands", "delete" , "filters[brands][id][$eq]", src.id)
  const SearchParams = useCallback(function SearchParams(
    name,
    action,
    params,
    value
  ) {
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

    if (name === "price-search") {
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
            return filter.params !== params;
          });
          return newArray;
        });
      }
    }
  },
  []);

  useEffect(() => {
    //  console.log(ParamsapiFilters);
    let urlfilter = "";

    ParamsapiFilters.map((filter) => {
      urlfilter += `&${filter.params}=${filter.value}&`;
    });

    //console.log(urlfilter);
    setParamsToUrl(urlfilter);
  }, [ParamsapiFilters]);
  // ==searchParams api==

  // Loading
  const [loading, setloading] = useState(false);
  // ==Loading==

  const [Mydata, setMyData] = useState([]);

  useEffect(() => {
    setloading(false);
    // console.log(Paramsapi);

    axios
      .get(Paramsapi)
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

  // handleUseFilter
  const [useFilter, SetUseFilter] = useState(false);

  // ==handleUseFilter==
  // CategotyPage-product-filter-Mobile

  const filterMobile = useRef();
  //  ==CategotyPage-product-filter-Mobile==

  return (
    <>
      <div className="CategotyPage-top">
        {/* {console.log(dataBrand)} */}
        <div className="Categoty-Category">
          <Category />
        </div>
        {/* CategotyPage-product-filter-Mobile */}
        <div className="CategotyPage-product-filter-Mobile">
          <div>
            <div className="CategotyPage-product-filter-Mobile-btn">
              <button
                className="filter-Mobile-filterby"
                onClick={() => {
                 
                  document
                    .querySelector(".CategotyPage-product-filter-Mobile-Drawer")
                    .classList.remove("animationOutLeft");
                  document
                    .querySelector(".CategotyPage-product-filter-Mobile-Drawer")
                    .classList.toggle("displayFlex");
                  document
                    .querySelector("body")
                    .classList.add("overflowHidden");
                }}
              >
                filter by
              </button>
              <button
                className="filter-Mobile-btn-style"
                onClick={() => {
                
                  document
                    .querySelector(".CategotyPage-product-filter-Mobile-Drawer")
                    .classList.remove("animationOutLeft");
                  document
                    .querySelector(".CategotyPage-product-filter-Mobile-Drawer")
                    .classList.toggle("displayFlex");
                  document
                    .querySelector("body")
                    .classList.add("overflowHidden");
                }}
              >
                Product Brand
              </button>
              <button
                className="filter-Mobile-btn-style"
                onClick={() => {
              
                  document
                    .querySelector(".CategotyPage-product-filter-Mobile-Drawer")
                    .classList.remove("animationOutLeft");
                  document
                    .querySelector(".CategotyPage-product-filter-Mobile-Drawer")
                    .classList.toggle("displayFlex");
                  document
                    .querySelector("body")
                    .classList.add("overflowHidden");
                }}
              >
                Rating Item
              </button>
              <button
                className="filter-Mobile-btn-style"
                onClick={(e) => {
                  
                  document
                    .querySelector(".CategotyPage-product-filter-Mobile-Drawer")
                    .classList.remove("animationOutLeft");
                  document
                    .querySelector(".CategotyPage-product-filter-Mobile-Drawer")
                    .classList.toggle("displayFlex");
                  document
                    .querySelector("body")
                    .classList.add("overflowHidden");
                }}
              >
                Product Brand
              </button>
            </div>

            <Box
              role="presentation"
              onClick={(e) => {
                let target = e.target.classList.contains(
                  "CategotyPage-product-filter-Mobile-Drawer"
                );
                if (target) {
                  document
                    .querySelector("body")
                    .classList.remove("overflowHidden");
                  document
                    .querySelector(".CategotyPage-product-filter-Mobile-Drawer")
                    .classList.toggle("displayFlex");
                  document
                    .querySelector(".CategotyPage-product-filter-Mobile-Drawer")
                    .classList.toggle("animationOutLeft");
                }
              }}
              onKeyDown={() => {}}
              className="CategotyPage-product-filter-Mobile-Drawer"
            >
              <Filter
                Mydata={Mydata}
                SearchParams={SearchParams}
                setParamsToUrl={setParamsToUrl}
                useFilter={useFilter}
                SetUseFilter={SetUseFilter}
              />
            </Box>
          </div>
        </div>
        {/* ==CategotyPage-product-filter-Mobile== */}
        <div className="CategotyPage container">
          <Filter
            Mydata={Mydata}
            SearchParams={SearchParams}
            setParamsToUrl={setParamsToUrl}
            useFilter={useFilter}
            SetUseFilter={SetUseFilter}
          />
          <div className="CategotyPage-product">
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 1, md: 1 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {loading ? productsMAP : <COMPLoading />}
              </Grid>
            </Box>
          </div>
        </div>
        {params.categotyId}
      </div>
    </>
  );
}

export { FParamsFilters };
