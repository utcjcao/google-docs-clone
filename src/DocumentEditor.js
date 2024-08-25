import React, { useState, useEffect, useCallback } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import io from "socket.io-client";

function DocumentEditor() {
  const [quill, setQuill] = useState();
  const [socket, setSocket] = useState();

  // run socket initialization at start
  useEffect(() => {
    const socket = io("http://localhost:5000");
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, []);

  // initialize the quill ref at start
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
    });
    setQuill(q);
  }, []);

  // if my socket recieves an update, then i recieve the change and update
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };

    socket.on("recieve-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket]);

  // if i make a change to my quill (content), then i emit the change
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  return <div className="container" ref={wrapperRef}></div>;
}

export default DocumentEditor;
