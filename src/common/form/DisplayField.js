import React from "react";

const DisplayField = ({ label, value }) => {
  const html = { __html: value };
  return (
    <div style={{ display: "flex", marginTop: 10 }}>
      <div style={{ flex: 1, whiteSpace: "nowrap" }}>{label}</div>
      <div style={{ whiteSpace: "nowrap" }} dangerouslySetInnerHTML={html} />
    </div>
  );
};

//
export default DisplayField;
