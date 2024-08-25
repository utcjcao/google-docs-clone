import React from "react";
import Document from "./Document";

const Sidebar = (props) => {
  const { documentList } = props;

  return (
    <div className="sidebar-container">
      {documentList.map((document, index) => (
        <Document
          key={index}
          title={document.title}
          content={document.content}
        />
      ))}
    </div>
  );
};

export default Sidebar;
