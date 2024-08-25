import React from "react";

const Document = ({ title, content }) => {
  return (
    <div className="document">
      <h2 className="document-title">{title}</h2>
      <p className="document-content">{content}</p>
    </div>
  );
};

export default Document;
