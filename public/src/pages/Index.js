import React, { useState } from "react";
import { Button } from "@material-ui/core";

const f = () => {
  console.log("object");
  return "";
};

const g = () => {
  console.log("object");
  return 0;
};
export default function Index() {
  const [state, setstate] = React.useState(f());
  const [abc, setabc] = useState(g());

  console.log("render");
  return <Button onClick={() => setabc(abc + 1)}>a</Button>;
}
