import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  // IconButton,
  /*TextField,*/
} from "@material-ui/core";
import { GoogleLogin } from "@react-oauth/google";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import { signin, signup } from "../../actions/auth";
import { AUTH } from "../../constants/actionTypes";

const Auth = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
  
  const authIcon = "https://cdn-icons-png.flaticon.com/512/295/295128.png";

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <img
            width="50vw"
            height="50vh"
            src={authIcon}
            alt="authIcon"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          ></img>
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign up" : "Sign in"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            onSuccess={async (res) => {
              console.info(
                `Logged in as clientId = ${res?.clientId} and credentials = ${res?.credential}`
              );
              console.log(res);
              const token = res?.credential;
              try {
                dispatch({ type: AUTH, data: { token } });

                navigate("/");
              } catch (err) {
                console.error(err);
              }
            }}
            className={classes.googleButton}
            useOneTap
            fullWidth
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
