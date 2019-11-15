import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Index from "../pages/Index";
import Room from "../pages/Room";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { BottomNavigation } from "@material-ui/core";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import SignUpIcon from "@material-ui/icons/PersonAddOutlined";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import ChatIcon from "@material-ui/icons/ForumOutlined";
import ErrorBanner from "../ErrorBanner";
import RoomContainer from "../pages/RoomContainer";
function AppRouter(props) {
  // console.log(props);

  return (
    <Router>
      <ErrorBanner />

      <Route path="/" exact component={Index} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/rooms" component={RoomContainer} />
      <BottomNavigation
        showLabels
        //   value={value}
        //   onChange={handleChange}
        //   className={classes.root}
      >
        <BottomNavigationAction
          label="主页"
          value="主页"
          icon={<HomeIcon />}
          component={Link}
          to="/"
        />

        <BottomNavigationAction
          label="房间"
          value="房间"
          icon={<ChatIcon />}
          component={Link}
          to="/rooms"
        />
        <BottomNavigationAction
          label="注册"
          value="Sign Up"
          icon={<SignUpIcon />}
          component={Link}
          to="/signup"
        />
        <BottomNavigationAction
          label="登陆"
          value="Log In"
          icon={<SignUpIcon />}
          component={Link}
          to="/login"
        />
      </BottomNavigation>
    </Router>
  );
}
export default AppRouter;
