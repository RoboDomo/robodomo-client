import React from "react";

const DisplayField = ({ label, value }) => {
  const html = { __html: value };
  return <div style={{ whiteSpace: "nowrap" }} dangerouslySetInnerHTML={html} />;
};

//
export default DisplayField;
