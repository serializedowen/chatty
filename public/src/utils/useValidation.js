import { useState, useEffect, useRef } from "react";
import EventEmitter from "./eventEmitter";

const useValidation = validator => {
  const [value, setvalue] = useState("");
  const [errMsg, seterrMsg] = useState("");
  const [validate, setvalidate] = useState(false);
  const [err, seterr] = useState(false);
  const [emitter, setemitter] = useState(null);

  useEffect(() => {
    setemitter(new EventEmitter());
  }, []);

  useEffect(() => {
    if (validate) {
      console.log("validating!!!");
      try {
        validator(value);
        seterr(false);
        seterrMsg("");
        emitter.emit("finish", true);
      } catch (e) {
        seterrMsg(e.message);
        seterr(true);
        emitter.emit("finish", false);
      }
      setvalidate(false);
    }
  }, [validate]);

  const validateTrigger = () => {
    return new Promise((resolve, reject) => {
      emitter.once("finish", val => resolve(val));
      setvalidate(true);
    });
  };

  return [value, setvalue, err, errMsg, validateTrigger];
};

export default useValidation;
