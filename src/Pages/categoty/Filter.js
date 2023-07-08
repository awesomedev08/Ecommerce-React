import React, { useEffect, useRef, useState, useTransition } from "react";
// star-un-filled
import starFilled from "../../assets/icon/ant-design_star-filled.svg";

import starUnFilled from "../../assets/icon/ant-design_star-un-filled.svg";
// ==star-un-filled==
// Checkbox
import CheckboxIcon from "../../components/Icon/CheckboxIcon";
import CheckedboxIcon from "../../assets/icon/uil_check-un.svg";
import CheckboxIconStormyStraitGreen from "../../assets/icon/uil_check-StormyStraitGreen.svg";
import CheckedboxIconStormyStraitGreen from "../../assets/icon/uil_check-un-StormyStraitGreen.svg";
import CloseIcon from "@mui/icons-material/Close";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Input,
  InputBase,
} from "@mui/material";
// PriceFilter-Search-Vector
import PriceFilterSearchVector from "../../assets/icon/PriceFilter-Search-Vector.svg";
import { FParamsFilters } from "./CategotyPage";
import { memo } from "react";
let handleUseFilter;

function Filter({
  Mydata,
  SearchParams,
  setParamsToUrl,
  useFilter,
  SetUseFilter,
}) {
  // Product Brand

  const [dataBrand, SetDataBrand] = useState([]);
  let productsBrandsMAPAsync = [];
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

    if (!useFilter) {
      SetDataBrand(productsBrandsMAP);
    }
  }, [Mydata, useFilter]);

  // ==Product Brand==

  // PriceFilter-Search
  const [isPending, startTransition] = useTransition();

  // ==PriceFilter-Search==

  let inputRef = useRef(null);
  const handleInputToggle = () => {
    inputRef.current.focus();
  };

  handleUseFilter = function (set) {
    FParamsFilters();
    setParamsToUrl("");
    SetUseFilter(set);
    setChecked({
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
      checked5: false,
      checked6: false,
      checked7: false,
      checked8: false,
      checked9: false,
      checked10: false,
      checked11: "",
      checked12: false,
      checked13: false,
      checked14: false,
      checked15: false,
      checked16: false,
      checked17: false,
    });
  };

  const [checked, setChecked] = useState({
    checked1: false,
    checked2: false,
    checked3: false,
    checked4: false,
    checked5: false,
    checked6: false,
    checked7: false,
    checked8: false,
    checked9: false,
    checked10: false,
    checked11: "",
    checked12: false,
    checked13: false,
    checked14: false,
    checked15: false,
    checked16: false,
    checked17: false,
  });
  // ==PriceFilter-Search==
  return (
    <div className="CategotyPage-product-filter">
      <span
        className="filter-Mobile-Drawer-CloseIcon"
        onClick={() => {
          document.querySelector("body").classList.remove("overflowHidden");
          document
            .querySelector(".CategotyPage-product-filter-Mobile-Drawer")
            .classList.toggle("displayFlex");
          document
            .querySelector(".CategotyPage-product-filter-Mobile-Drawer")
            .classList.toggle("animationOutLeft");
        }}
      >
        <CloseIcon />
      </span>

      <span className="Product-filter-titel">Product Brand</span>
      <FormGroup>{dataBrand}</FormGroup>
      <span className="Product-filter-titel">Discount Offer</span>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked.checked1}
              onClick={(e) => {
                setChecked((v) => ({ ...v, checked1: e.target.checked }));

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
              checked={checked.checked2}
              onClick={(e) => {
                setChecked((v) => ({ ...v, checked2: e.target.checked }));

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
              checked={checked.checked3}
              onClick={(e) => {
                setChecked((v) => ({ ...v, checked3: e.target.checked }));

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
              checked={checked.checked4}
              icon={<img src={CheckboxIconStormyStraitGreen} alt="" />}
              checkedIcon={<img src={CheckedboxIconStormyStraitGreen} alt="" />}
              onClick={(e) => {
                setChecked((v) => ({ ...v, checked4: e.target.checked }));
              }}
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
              checked={checked.checked5}
              onClick={(e) => {
                setChecked((v) => ({ ...v, checked5: e.target.checked }));
              }}
              icon={<img src={CheckboxIconStormyStraitGreen} alt="" />}
              checkedIcon={<img src={CheckedboxIconStormyStraitGreen} alt="" />}
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
              checked={checked.checked6}
              onClick={(e) => {
                setChecked((v) => ({ ...v, checked6: e.target.checked }));
              }}
              icon={<img src={CheckboxIconStormyStraitGreen} alt="" />}
              checkedIcon={<img src={CheckedboxIconStormyStraitGreen} alt="" />}
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
              checked={checked.checked7}
              onClick={(e) => {
                setChecked((v) => ({ ...v, checked7: e.target.checked }));

                SetUseFilter(true);
                if (e.target.checked) {
                  SearchParams("price", "append", "filters[price][$lte]", 150);
                } else {
                  SearchParams("price", "delete", "filters[price][$lte]", 150);
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
              checked={checked.checked8}
              onClick={(e) => {
                setChecked((v) => ({ ...v, checked8: e.target.checked }));

                SetUseFilter(true);
                if (e.target.checked) {
                  SearchParams("price", "append", "filters[price][$gte]", 150);
                  SearchParams("price", "append", "filters[price][$lte]", 350);
                } else {
                  SearchParams("price", "delete", "filters[price][$gte]", 150);
                  SearchParams("price", "delete", "filters[price][$lte]", 350);
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
              checked={checked.checked9}
              onClick={(e) => {
                setChecked((v) => ({ ...v, checked9: e.target.checked }));

                SetUseFilter(true);
                if (e.target.checked) {
                  SearchParams("price", "append", "filters[price][$gte]", 150);
                  SearchParams("price", "append", "filters[price][$lte]", 504);
                } else {
                  SearchParams("price", "delete", "filters[price][$gte]", 150);
                  SearchParams("price", "delete", "filters[price][$lte]", 504);
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
              checked={checked.checked10}
              onClick={(e) => {
                setChecked((v) => ({ ...v, checked10: e.target.checked }));

                SetUseFilter(true);
                if (e.target.checked) {
                  SearchParams("price", "append", "filters[price][$gte]", 450);
                } else {
                  SearchParams("price", "delete", "filters[price][$gte]", 450);
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
          value={checked.checked11}
          sx={{ ml: 1, flex: 1 }}
          placeholder="$10.00 - 20000$"
          inputProps={{ "aria-label": "$10.00 - 20000$" }}
          inputRef={inputRef}
          onChange={(e) => {
            setChecked((v) => ({ ...v, checked11: e.target.value }));

            startTransition(() => {
              SearchParams(
                "price-search",
                "append",
                "filters[price][$lte]",
                e.target.value
              );
            });
          }}
          onFocus={(e) => {
            SearchParams(
              "price-search",
              "delete",
              "filters[price][$lte]",
              checked.checked11
            );
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
                  checked={checked.checked12}
                  onClick={(e) => {
                    setChecked((v) => ({ ...v, checked12: e.target.checked }));

                    SetUseFilter(true);
                    if (e.target.checked) {
                      SearchParams(
                        "Color",
                        "append",
                        "filters[Color][$containsi]",
                        "Blue"
                      );
                    } else {
                      SearchParams(
                        "Color",
                        "delete",
                        "filters[Color][$containsi]",
                        "Blue"
                      );
                    }
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
                  checked={checked.checked13}
                  onClick={(e) => {
                    setChecked((v) => ({ ...v, checked13: e.target.checked }));

                    SetUseFilter(true);
                    if (e.target.checked) {
                      SearchParams(
                        "Color",
                        "append",
                        "filters[Color][$containsi]",
                        "Orange"
                      );
                    } else {
                      SearchParams(
                        "Color",
                        "delete",
                        "filters[Color][$containsi]",
                        "Orange"
                      );
                    }
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
                  checked={checked.checked14}
                  onClick={(e) => {
                    setChecked((v) => ({ ...v, checked14: e.target.checked }));

                    SetUseFilter(true);
                    if (e.target.checked) {
                      SearchParams(
                        "Color",
                        "append",
                        "filters[Color][$containsi]",
                        "Brown"
                      );
                    } else {
                      SearchParams(
                        "Color",
                        "delete",
                        "filters[Color][$containsi]",
                        "Brown"
                      );
                    }
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
                  checked={checked.checked15}
                  onClick={(e) => {
                    setChecked((v) => ({ ...v, checked15: e.target.checked }));

                    SetUseFilter(true);
                    if (e.target.checked) {
                      SearchParams(
                        "Color",
                        "append",
                        "filters[Color][$containsi]",
                        "Green"
                      );
                    } else {
                      SearchParams(
                        "Color",
                        "delete",
                        "filters[Color][$containsi]",
                        "Green"
                      );
                    }
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
                  checked={checked.checked16}
                  onClick={(e) => {
                    setChecked((v) => ({ ...v, checked16: e.target.checked }));

                    SetUseFilter(true);
                    if (e.target.checked) {
                      SearchParams(
                        "Color",
                        "append",
                        "filters[Color][$containsi]",
                        "Purple"
                      );
                    } else {
                      SearchParams(
                        "Color",
                        "delete",
                        "filters[Color][$containsi]",
                        "Purple"
                      );
                    }
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
                  checked={checked.checked17}
                  onClick={(e) => {
                    setChecked((v) => ({ ...v, checked17: e.target.checked }));

                    SetUseFilter(true);
                    if (e.target.checked) {
                      SearchParams(
                        "Color",
                        "append",
                        "filters[Color][$containsi]",
                        "Sky"
                      );
                    } else {
                      SearchParams(
                        "Color",
                        "delete",
                        "filters[Color][$containsi]",
                        "Sky"
                      );
                    }
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
  );
}

export default memo(Filter);
export { handleUseFilter };
