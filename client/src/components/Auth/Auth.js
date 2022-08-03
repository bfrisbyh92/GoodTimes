import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  /*TextField,*/
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import Icon from "./Icon";
import Input from "./Input";

const Auth = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const isSignup = true;

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    handleShowPassword(false);
  };

  const googleSuccess = () => {
    console.log("Working!");
  };

  const googleFailure = () => {
    console.error("Google Sign In was unsuccessful. Please try again.");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
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
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                // disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
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

//   return (
//     <Container element="main" maxWidth="xs">
//       <Paper className={classes.paper} elevation={3}>
//         <Avatar className={classes.avatar}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
//         <form className={classes.form} onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             {isSignup && (
//               <>
//                 <Input
//                   name="firstName"
//                   label="First Name"
//                   handleChange={handleChange}
//                   autoFocus={true}
//                   half
//                   gridColumn="2"
//                 />
//                 <Input
//                   name="lastName"
//                   label="Last Name"
//                   handleChange={handleChange}
//                   autoFocus={true}
//                   half
//                 />
//               </>
//             )}
//             <Input
//               name="email"
//               label="Email Address"
//               handleChange={handleChange}
//               autoFocus={true}
//               type="email"
//             />
//             <Input
//               name="password"
//               label="Password"
//               handleChange={handleChange}
//               type={showPassword ? "text" : "password"}
//               handleShowPassword={handleShowPassword}
//             />
//             {isSignup && (
//               <Input
//                 name="confirmPassword"
//                 label="Repeat Password"
//                 handleChange={handleChange}
//                 type="password"
//               />
//             )}
//           </Grid>
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//           >
//             {isSignup ? "Sign Up" : "Sign In"}
//           </Button>
//           <GoogleLogin
//             clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
//             render={(renderProps) => (
//               <Button
//                 className={classes.googleButton}
//                 color="primary"
//                 fullWidth
//                 onClick={renderProps.onClick}
//                 // disabled={renderProps.disabled}
//                 startIcon={<Icon />}
//                 variant="contained"
//               >
//                 Google Sign In
//               </Button>
//             )}
//             onSuccess={googleSuccess}
//             onFailure={googleFailure}
//             cookiePolicy="single_host_origin"
//           />
//           <Grid container justifyContent="flex-end">
//             <Grid item>
//               <Button onClick={switchMode}>
//                 {isSignup
//                   ? "Already have an account? Sign In"
//                   : "Don't have an account with us yet? Sign Up now"}
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Paper>
//     </Container>
//   );
// };

export default Auth;
