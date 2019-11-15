import React, { useState, useEffect } from "react";
import CONFIG from "../config";
import io from "socket.io-client";
import cookie from "../utils/cookie";
import axios from "../config/axios";
import Badge from "@material-ui/core/Badge";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Room from "./Room";
import CreateRoomDialog from "./CreateRoomDialog";

export default function RoomContainer() {
  let [socket] = useState();
  let [rooms, setRooms] = useState([]);
  const [activeRoom, setactiveRoom] = useState({});

  useEffect(() => {
    axios.get("/api/room").then(res => {
      setRooms(res.data);
    });

    socket = io(
      `${CONFIG.HOST}:${CONFIG.PORT}?token=${cookie.getCookie("token")}`
    );

    socket.on("message", message => {
      console.log(message);
      // console.log(message);
    });
    return () => {
      socket.close();
    };
  }, []);
  return (
    <div>
      <Tabs value={activeRoom.id}>
        {rooms &&
          rooms.map(room => (
            <Tab
              label={room.name}
              value={room.id}
              key={room.id}
              onClick={() => setactiveRoom(room)}
              label={
                <Badge color="secondary" badgeContent={4}>
                  {room.name}
                </Badge>
              }
            />
          ))}
      </Tabs>
      <CreateRoomDialog></CreateRoomDialog>
      <Room></Room>
    </div>
  );
}
