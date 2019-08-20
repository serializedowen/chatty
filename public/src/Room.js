import React, { Component } from "react";
import io from "socket.io-client";
import CONFIG from "./config";
import axios from "./config/axios";

export default class Room extends Component {
  constructor(props) {
    super(props);
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
    console.log(this.socket);
    this.socket.send(this.state.input);
    this.setState({ input: "" });
  }

  login = () => {
    console.log(axios);
    axios.get("/signup").catch(console.log);
  };

  componentDidMount() {
    this.socket = io(`${CONFIG.HOST}:${CONFIG.PORT}`);
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
        <ul>
          {this.state.messages.map((message, i) => (
            <li key={i}>{message}</li>
          ))}
        </ul>

        <input
          name="input"
          value={this.state.input}
          onKeyDown={e => {
            if (13 == e.keyCode) {
              this.sendMessage();
            }
          }}
          onChange={e => {
            this.setState({ [e.target.name]: e.target.value });
          }}
        />
        <button onClick={this.sendMessage}>Send</button>
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}
