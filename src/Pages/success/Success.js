import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { restCart } from "../../redux/CartReducer";
import { enqueueSnackbar } from "notistack";

import style from "./Success.css"
function Success() {
  const { success } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (success === "true") {
      dispatch(restCart());
      enqueueSnackbar("The purchase was completed successfully", {
        variant: "success",
      });
    }
    if (success !== "true") {
      enqueueSnackbar("Purchase failed, you can try again", {
        variant: "error",
      });
    }
  }, []);
  return (
    <div
      className={success === "true" ? "Success-true" : ""}
      style={{
      
      }}
    >
      {success === "true"
        ? "The purchase was completed successfully"
        : "Purchase failed, you can try again"}
    </div>
  );
}

export default Success;
