import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const applyDelta = (prevContent, delta) => {
  let newContent = prevContent;
  let position = 0;

  delta.ops.forEach((op) => {
    if (op.insert) {
      newContent =
        newContent.slice(0, position) + op.insert + newContent.slice(position);
      position += op.insert.length;
    } else if (op.delete) {
      newContent =
        newContent.slice(0, position) + newContent.slice(position + op.delete);
    } else if (op.retain) {
      position += op.retain;
    }
  });

  return newContent;
};

function DocumentEditor() {
  const [content, setContent] = useState("");

  useEffect(() => {
    socket.on("recieve-changes", (delta) => {
      setContent((prevContent) => applyDelta(prevContent, delta));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleChange = (value, delta, source) => {
    if (source === "user") {
      socket.emit("send-changes", delta);
    }
    setContent(value);
  };

  return (
    <div>
      <ReactQuill value={content} onChange={handleChange} theme="snow" />
    </div>
  );
}

export default DocumentEditor;
