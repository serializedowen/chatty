import React, { Component } from "react";
import CONFIG from "../config";
import io from "socket.io-client";
import cookie from "../utils/cookie";
import axios from "../config/axios";
import Badge from "@material-ui/core/Badge";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Room from "./Room";
import CreateRoomDialog from "./CreateRoomDialog";
import MessageCache from "./hoc/MessageCache";

export class RoomContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: {},
      rooms: [],
      inRooms: []
    };
  }

  componentDidMount() {
    this.socket = io(
      `${CONFIG.HOST}:${CONFIG.PORT}?token=${cookie.getCookie("token")}`
    );
    this.socket.on("create", room => {
      return this.setState({ rooms: this.state.rooms.concat(room) });
    });

    axios.get("/api/room").then(res => {
      this.setState({ rooms: res.data });
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    let { activeRoom, rooms } = this.state;
    return (
      <div>
        <Tabs value={activeRoom.id}>
          {rooms &&
            rooms.map(room => (
              <Tab
                label={room.name}
                value={room.id}
                key={room.id}
                onClick={() => this.setState({ activeRoom: room })}
                label={
                  <Badge color="secondary" badgeContent={4}>
                    {room.name}
                  </Badge>
                }
              />
            ))}
        </Tabs>

        <Tabs value={activeRoom.id}>
          {rooms &&
            rooms.map(room => (
              <Tab
                label={room.name}
                value={room.id}
                key={room.id}
                onClick={() =>
                  axios.post("/api/my/join-room", { name: room.name })
                }
                label={
                  <Badge color="secondary" badgeContent={4}>
                    Leave {room.name} ?
                  </Badge>
                }
              />
            ))}
        </Tabs>
        <Tabs value={activeRoom.id}>
          {rooms &&
            rooms.map(room => (
              <Tab
                label={room.name}
                value={room.id}
                key={room.id}
                onClick={() =>
                  axios.post("/api/my/leave-room", { name: room.name })
                }
                label={
                  <Badge color="secondary" badgeContent={4}>
                    Join {room.name} ?
                  </Badge>
                }
              />
            ))}
        </Tabs>
        <CreateRoomDialog></CreateRoomDialog>

        <MessageCache
          roomId={activeRoom.hashId}
          component={cachedMessage => (
            <Room
              key={activeRoom.hashId}
              cache={cachedMessage}
              activeRoom={activeRoom}
            />
          )}
        ></MessageCache>
      </div>
    );
  }
}

export default RoomContainer;
