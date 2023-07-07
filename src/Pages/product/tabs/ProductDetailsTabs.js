import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import style from "./ProductDetailsTabs.css";
import { withStyles } from "@mui/material";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ProductDetailsTabs({ Mydata }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [MydataProduct, setMyDataProduct] = React.useState([]);

  React.useEffect(() => {
    setMyDataProduct(Mydata);
  }, [Mydata]);

  //console.log(MydataProduct.attributes);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          component="div"
        >
          <Tab
            className="ProductDetailsTabs-Title"
            label="Description"
            {...a11yProps(0)}
            component="div"
          />
          <Tab
            className="ProductDetailsTabs-Title"
            label="Additional Info"
            {...a11yProps(1)}
          />
          <Tab
            className="ProductDetailsTabs-Title"
            label="Reviews"
            {...a11yProps(2)}
          />
          <Tab
            className="ProductDetailsTabs-Title"
            label="Video"
            {...a11yProps(3)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} component="div">
        <div className="ProductDetailsTabs-desc">
          <h3>{MydataProduct.attributes?.name}</h3>
          <ReactMarkdown>{MydataProduct.attributes?.desc}</ReactMarkdown>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
          Additional Info:
          <p>
            Color:
            {MydataProduct?.attributes?.Color}
          </p>
          <p>
            brands:
            {MydataProduct?.attributes?.brands.data[0]?.attributes?.Brand}
          </p>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        {" "}
        <p>Reviews </p>
      </TabPanel>
      <TabPanel className="ProductDetailsTabs-Video" value={value} index={3}>
        <div className="ProductDetailsTabs-Video-player">
        
          {MydataProduct.attributes?.embedVideoYoutube ? (
            <iframe
              width={window.screen.availWidth - 48}
              height="315"
              src={`https://www.youtube.com/embed/${MydataProduct.attributes?.embedVideoYoutube}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            ""
          )}
        </div>
      </TabPanel>
    </Box>
  );
}

export default ProductDetailsTabs;
