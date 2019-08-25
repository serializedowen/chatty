import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import axios from "./config/axios";
import { CSSTransition as Transition } from "react-transition-group";

const defaultStyle = {
  transition: `opacity 300ms ease-in-out`,
  opacity: 0
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 }
};

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

  const [values, setValues] = React.useState({
    show: false,
    timer: undefined,
    error: ""
  });

  const clearError = () => {
    clearTimeout(values.timer);
    setValues({
      error: "",
      show: false,
      timer: undefined
    });
  };

  const showError = err => {
    setValues({
      error: err,
      show: true,
      timer: setTimeout(() => clearError(), 5000)
    });
  };

  React.useEffect(() => {
    axios.eventEmitter.on("network error", showError);
    return () => axios.eventEmitter.off("network error", showError);
  }, []);

  React.useEffect(() => {
    return () => clearTimeout(values.timer);
  }, []);

  return (
    <Transition appear unmountOnExit in={values.show} timeout={300}>
      {state => (
        <div
          className={classes.root}
          style={{ ...defaultStyle, ...transitionStyles[state] }}
        >
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
                {values.error}
              </Typography>
              <Button onClick={clearError} color="inherit">
                Dismiss
              </Button>
            </Toolbar>
          </AppBar>
        </div>
      )}
    </Transition>
  );
}
