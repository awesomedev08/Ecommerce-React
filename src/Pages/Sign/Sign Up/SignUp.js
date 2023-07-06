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

import styles from "./SignUp.css";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { addUser } from "../../../redux/UserReducer";

const baseUrl = "http://localhost:1337/api/auth/local/register";

const defaultTheme = createTheme({
  typography: {
    fontFamily: ["Cairo"].join(","),
  },
});

export default function SignUp() {
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
        enqueueSnackbar("New account registration succeeded", {
          variant: "success",
        });

        setTimeout(() => {
          window.location.pathname = "/";
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        let errorMessage = error.response?.data.error.details.errors;
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
      });
  };

  let [Validation, setValidation] = React.useState({
    firstName: {
      error: false,
      message: "",
    },
    lastName: {
      error: false,
      message: "",
    },
    username: {
      error: false,
      message: "",
    },
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  });

  //console.log(UserLocal());

  if (UserLocal() === null) {
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
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    error={Validation.firstName.error}
                    helperText={Validation.firstName.message}
                    onChange={() => {
                      setValidation({
                        ...Validation,
                        firstName: {
                          error: false,
                          message: "",
                        },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    error={Validation.lastName.error}
                    helperText={Validation.lastName.message}
                    onChange={() => {
                      setValidation({
                        ...Validation,
                        lastName: {
                          error: false,
                          message: "",
                        },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  {" "}
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      language
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="language"
                      name="language"
                      defaultValue={"En"}
                      sx={{ width: "100%" }}
                    >
                      <MenuItem value={"En"}>En</MenuItem>
                      <MenuItem value={"Fr"}>Fr</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="country"
                    label="country"
                    name="country"
                    autoComplete="country"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="address"
                    label="address"
                    name="address"
                    autoComplete="address"
                    multiline
                    minRows={2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="phone"
                    label="phone"
                    name="phone"
                    autoComplete="phone"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="username"
                    name="username"
                    autoComplete="username"
                    error={Validation.username.error}
                    helperText={Validation.username.message}
                    onChange={() => {
                      setValidation({
                        ...Validation,
                        username: {
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
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={Validation.email.error}
                    helperText={Validation.email.message}
                    onChange={() => {
                      setValidation({
                        ...Validation,
                        email: {
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
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="allowExtraEmails"
                        value={"true"}
                        color="primary"
                      />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
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
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
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
