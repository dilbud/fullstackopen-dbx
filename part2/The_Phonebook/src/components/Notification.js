import { useState, useEffect } from "react";

export const Notification = ({ message }) => {
  console.log(message);
  const [msgLocal, SetMsgLocal] = useState({ type: null, msg: null });

  useEffect(() => {
    SetMsgLocal({ ...message });
    let timer = setTimeout(() => {
      SetMsgLocal({ type: null, msg: null });
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  if (!!!msgLocal?.type || !!!msgLocal?.msg) {
    return null;
  }
  if (msgLocal?.type === "info") {
    return <div className="info">{msgLocal.msg}</div>;
  }

  return <div className="error">{msgLocal.msg}</div>;
};
