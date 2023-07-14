import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import UserLocal from "../../../hooks/UserLocal";

import style from "./SignIn.css";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../redux/UserReducer";

const baseUrl = `${process.env.REACT_APP_URL_API}auth/local/`;

const defaultTheme = createTheme({
  typography: {
    fontFamily: ["Cairo"].join(","),
  },
});

export default function SignIn() {
  const userInfo = useSelector((state)=> state.user.User)
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    // console.log({
    //   firstName: data.get("firstName"),
    //   lastName: data.get("lastName"),
    //   language: data.get("language"),
    //   address: data.get("address"),
    //   phone: data.get("phone"),
    //   username: data.get("username"),
    //   email: data.get("email"),
    //   password: data.get("password"),
    //   allowExtraEmails: data.get("allowExtraEmails"),
    // });

    // sand api request

    axios
      .post(baseUrl, data)
      .then((response) => {
        console.log(response.data);
        dispatch(addUser(response.data));
        //  localStorage.setItem("user", JSON.stringify(response.data));
        enqueueSnackbar("Logged in successfully", {
          variant: "success",
        });

        setTimeout(() => {
          window.location.pathname = "/";
        }, 100);
      })
      .catch((error) => {
        if (
          error.response?.data?.error.message ===
          "Invalid identifier or password"
        ) {
          setValidation((prevValidation) => ({
            ...prevValidation,
            identifier: {
              error: true,
              message: error.response?.data?.error.message,
            },
            password: {
              error: true,
              message: error.response?.data?.error.message,
            },
          }));
        } else {
          let errorMessage = error.response?.data?.error.details?.errors;

          errorMessage.forEach(async (error) => {
            console.log(error);
            // console.log(error.path[0]);
            let value = error.message;
            let nameError = await error.path[0];
            //console.log(nameError);
            setValidation((prevValidation) => ({
              ...prevValidation,
              [nameError]: {
                error: true,
                message: value,
              },
            }));
          });
        }
      });
  };

  let [Validation, setValidation] = React.useState({
    identifier: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  });

  //console.log(UserLocal());

  if (!userInfo.jwt) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs" className="DivSignUp">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email or username"
                    label="Email Address or Username"
                    name="identifier"
                    error={Validation.identifier.error}
                    helperText={Validation.identifier.message}
                    onChange={() => {
                      setValidation({
                        ...Validation,
                        identifier: {
                          error: false,
                          message: "",
                        },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={Validation.password.error}
                    helperText={Validation.password.message}
                    onChange={() => {
                      setValidation({
                        ...Validation,
                        password: {
                          error: false,
                          message: "",
                        },
                      });
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/SignUp" variant="body2">
                    Register a new account? Sign up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  } else {
    return (
      <>
        <h3>You already have an account!</h3>
        <p>If you want to create a new account, sign out of the account</p>
      </>
    );
  }
}
