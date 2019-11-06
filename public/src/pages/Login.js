import React from "react";
import axios from "../config/axios";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import Cookie from "../utils/cookie";

// Input.prototype.Validate = () => console.log("validate");

export default function Login() {
  const login = () => {
    axios
      .post("/user/login", {
        username: values.username,
        password: values.password
      })
      .then(res => Cookie.setCookie("token", res.data))
      // Intercepted in config/axios
      .catch(err => console.log(err));
  };

  const [values, setValues] = React.useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    showPassword: false
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  //   const validator =

  return (
    <form>
      <FormControl required>
        <InputLabel htmlFor="username">Username</InputLabel>

        <Input
          id="username"
          type="text"
          value={values.username}
          onChange={handleChange("username")}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="adornment-password">Password</InputLabel>
        {/* <WithValidation component={Input} /> */}
        <Input
          id="adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          required
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button variant="contained" color="primary" onClick={login}>
        登陆
      </Button>
    </form>
  );
}
