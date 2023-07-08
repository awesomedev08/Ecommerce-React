import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import { useSelector } from "react-redux";
import COMPLoading from "../../../components/loading/COMPLoading";

function createData(id, products, OrderStatus) {
  return {
    id,
    // {
    //     "id": 6,
    //     "img": "https://res.cloudinary.com/dfbvmsyv4/image/upload/v1687215827/image_54d84237f2.jpg",
    //     "name": "Suit",
    //     "price": 2344,
    //     "Quantity": 1
    //   },
    products: products,
    OrderStatus,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                products
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>name</TableCell>
                    <TableCell>price</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((historyRow) => (
                    <TableRow key={historyRow.name}>
                      <TableCell component="th" scope="row">
                        {historyRow.name}
                      </TableCell>
                      <TableCell align="right">${historyRow.price}</TableCell>
                      <TableCell align="right">{historyRow.Quantity}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.Quantity * historyRow.price)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <tr>
                    <TableCell align="right">
                      Total price of all: $
                      {row.products
                        .map((historyRow) => {
                          return [historyRow.Quantity * historyRow.price];
                        })
                        .reduce(
                          (accumulator, currentValue) =>
                            accumulator + +(+currentValue),
                          0
                        )}
                    </TableCell>
                  </tr>
                  <tr>
                    <TableCell align="right">
                      Order Status: {row.OrderStatus}
                    </TableCell>
                  </tr>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Order() {
  const UserInfo = useSelector((state) => state.user.User);

  React.useEffect(() => {
    // console.log(UserInfo.user.email);
  }, [UserInfo]);
  const [Mydata, setMydata] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_URL_API +
          `orders?filters[email][$eqi]=${UserInfo.user.email}`,
        { headers: { Authorization: `Bearer ${UserInfo.jwt}` } }
      )
      .then(function (response) {
        // console.log(response.data.data);
        setMydata(response.data.data);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, [UserInfo]);

  const rows = Mydata.map((data) => {
    // console.log(data);
    return createData(
      data.id,
      data.attributes.products,
      data.attributes.OrderStatus
    );
  });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>id</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
