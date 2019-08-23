import React, { Component } from "react";
import io from "socket.io-client";
import CONFIG from "./config";
import axios from "./config/axios";
import Button from "@material-ui/core/Button";
import cookie from "./utils/cookie";
import Chip from "@material-ui/core/Chip";

// import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

// const styles = makeStyles(theme => ({
//   container: {
//     display: "flex",
//     flexWrap: "wrap"
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: 200
//   },
//   dense: {
//     marginTop: 19
//   },
//   menu: {
//     width: 200
//   }
// }))();

export default class Room extends Component {
  constructor(props) {
    super(props);
    // this.styles = useStyles();
    this.state = {
      messages: [],
      input: "",
      typing: false
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  setTyping() {
    this.setState({ typing: true });
  }

  sendMessage() {
    this.socket.send(this.state.input);
    this.setState({ input: "" });
  }

  login2 = () => {
    axios.post("/test", { a: 123 });
  };

  login = () => {
    console.log(axios);
    axios
      .get("/signup")
      .then(res => {
        console.log(res);
        cookie.setCookie("token", res.data.token);
      })
      .catch(console.log);
  };

  componentDidMount() {
    this.socket = io(
      `${CONFIG.HOST}:${CONFIG.PORT}?token=${cookie.getCookie("token")}`
    );
    this.socket.on("message", message => {
      console.log(message);
      this.setState(prevState => ({
        messages: [].concat(prevState.messages, message)
      }));
      // console.log(message);
    });
    this.socket.on("disconnect", () => console.log("disconnected"));
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    return (
      <div>
        {/* <ul> */}
        {this.state.messages.map((message, i) => (
          <Chip clickable label={message} key={i}>
            {message}
          </Chip>
        ))}
        {/* </ul> */}

        <TextField
          id="standard-name"
          placeholder="Placeholder"
          name="input"
          label="With placeholder"
          // className={styles.textField}
          value={this.state.input}
          onKeyDown={e => {
            if (13 == e.keyCode) {
              this.sendMessage();
            }
          }}
          onChange={e => {
            this.setState({ [e.target.name]: e.target.value });
          }}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={this.sendMessage}>
          发送
        </Button>
        <Button variant="contained" color="primary" onClick={this.login}>
          登陆
        </Button>
        <Button variant="contained" color="primary" onClick={this.login2}>
          登陆2
        </Button>
      </div>
    );
  }
}
