import { Box, Button, Paper, Rating } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";

import style from "./RatingReviews.css";
import HoverRating from "./HoverRating/HoverRating";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import COMPLoading from "../../../components/loading/COMPLoading";
function RatingReviews() {
  const [valueRating, setValueRating] = React.useState(2.5);
  const [valueReviews, setValueReviews] = React.useState("");
  const [AllReviews, setAllReviews] = React.useState([]);
  const UserInfo = useSelector((state) => state.user.User);
  const [Send, setSend] = React.useState(false);
  const { itemId } = useParams();

  const [loading, setloadining] = useState(false);
  const handleSend = (event) => {
    axios
      .post(
        process.env.REACT_APP_URL_API + "rating-and-reviews",
        {
          data: {
            Reviews: valueReviews,
            Rating: valueRating,
            userId: UserInfo.user.id,
            prodect: itemId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${UserInfo.jwt}`,
          },
        }
      )
      .then((response) => {
        enqueueSnackbar("The review has been added", {
          variant: "success",
        });
        setValueReviews("");
        setValueRating(2.5);
        setSend(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    setloadining(false);
    axios
      .get(
        process.env.REACT_APP_URL_API +
          "rating-and-reviews/?populate=prodect,userId&filters[prodect][id][$eq]=" +
          itemId
      )
      .then((response) => {
        setAllReviews(response.data);
        setloadining(true);
      });
  }, [itemId, Send]);

  useEffect(() => {
    //  console.log(AllReviews);
  }, [AllReviews]);
  let reviewsMap = AllReviews?.data?.map((review) => {
    return (
      <Paper elevation={3} key={review.id}>
        <b>{review.attributes.userId.data.attributes.firstName}</b>
        <p>{review.attributes.Reviews} </p>{" "}
        <Rating name="read-only" value={review.attributes.Rating} readOnly />
      </Paper>
    );
  });
  return (
    <div className="RatingReviews">
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <TextField
          fullWidth
          label={
            UserInfo.jwt
              ? "Reviews"
              : "You must be logged in to place an Reviews"
          }
          id="fullWidth"
          multiline
          minRows={5}
          onChange={(e) => setValueReviews(e.target.value)}
          value={valueReviews}
          disabled={UserInfo.jwt ? false : true}
        />
      </Box>
      <div className="HoverRating-btn">
        <HoverRating setValueRating={setValueRating} />
        <Button
          sx={{ marginTop: 3 }}
          variant="outlined"
          onClick={handleSend}
          disabled={UserInfo.jwt ? false : true}
        >
          Add Reviews
        </Button>
      </div>

      <div className="AllReviews">{loading ? reviewsMap : <COMPLoading />}</div>
    </div>
  );
}

export default RatingReviews;
