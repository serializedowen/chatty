import { Dialog, DialogActions, DialogContent } from "@material-ui/core";
import React, { useRef } from "react";
import Login from "../Login";
import { withRouter } from "react-router-dom";

let isAuthenticated = true;

function AuthenticationRequired({ children, ...rest }) {
  const ref = useRef(undefined);
  console.log(rest);
  return isAuthenticated ? (
    children
  ) : (
    <Dialog open={true}>
      <DialogContent>
        <Login
          portal={ref}
          callback={() => {
            isAuthenticated = true;
            rest.history.push("/rooms");
          }}
        ></Login>
      </DialogContent>
      <DialogActions>
        <div ref={ref}></div>
      </DialogActions>
    </Dialog>
  );
}

export default withRouter(AuthenticationRequired);
