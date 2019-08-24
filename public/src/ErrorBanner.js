import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import axios from "./config/axios";
import { Transition } from "react-transition-group";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    textAlign: "left"
  }
}));

export default function ErrorBanner() {
  const classes = useStyles();
  const [show, setShow] = React.useState(false);
  let timer;

  const [error, setError] = React.useState("");

  const clearError = () => {
    setError("");
    setShow(false);
    console.log(timer);
    clearTimeout(timer);
  };

  const showError = err => {
    setError(err);
    setShow(true);
    timer = setTimeout(() => clearError(), 5000);
    console.log(timer);
  };

  React.useEffect(() => {
    const listener = err => {
      //   console.log(err);
      showError(err);
    };
    axios.eventEmitter.on("network error", listener);
    return () => axios.eventEmitter.off("network error", listener);
  });

  React.useEffect(() => {
    // timer = setTimeout(() => setShow(false), 500);
    console.log("effect", timer);
    return clearTimeout(timer);
  });

  return show ? (
    <Transition in={show} timeout={500}>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {error}
            </Typography>
            <Button onClick={clearError} color="inherit">
              Dismiss
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    </Transition>
  ) : null;
}
