import React, { Component } from "react";
import io from "socket.io-client";

export default class Room extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      input: ""
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage() {
    console.log(this.socket);
    this.socket.send(this.state.input);
    this.setState({ input: "" });
  }

  componentDidMount() {
    this.socket = io("localhost:3000");
    this.socket.on("message", message => {
      console.log(message);
      this.setState(prevState => ({
        messages: [].concat(prevState.messages, message)
      }));
      // console.log(message);
    });
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
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
        />
        <button onClick={this.sendMessage}>Send</button>
      </div>
    );
  }
}
