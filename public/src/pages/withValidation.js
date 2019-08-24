import React from "react";

export default function withValidation({
  validator,
  hookTo,
  component,
  ...rest
}) {
  return (
    <>
      <component {...rest} />
    </>
  );
}
