import "./App.scss";
import React from "react";
import DocumentEditor from "./DocumentEditor";
import Sidebar from "./Sidebar";

const documentList = [
  {
    id: 1,
    title: "Introduction to React",
    content:
      "This document provides an overview of React, a popular JavaScript library for building user interfaces. It covers the basics of React components, props, and state.",
  },
  {
    id: 2,
    title: "Getting Started with JavaScript",
    content:
      "This document covers the fundamentals of JavaScript, including variables, data types, functions, and control flow. It is a great starting point for beginners.",
  },
  {
    id: 3,
    title: "Understanding CSS Flexbox",
    content:
      "This document explains how to use CSS Flexbox to create flexible and responsive layouts. It includes examples and best practices for using Flexbox in web design.",
  },
  {
    id: 4,
    title: "Advanced JavaScript Concepts",
    content:
      "This document delves into more advanced JavaScript topics such as closures, promises, and asynchronous programming. It is intended for developers with some experience in JavaScript.",
  },
  {
    id: 5,
    title: "Building RESTful APIs with Node.js",
    content:
      "This document provides a guide to building RESTful APIs using Node.js. It covers the basics of API design, as well as how to implement API endpoints and handle requests.",
  },
];

function App() {
  return (
    <div className="container">
      <Sidebar documentList={documentList}></Sidebar>
      <DocumentEditor></DocumentEditor>
    </div>
  );
}

export default App;
