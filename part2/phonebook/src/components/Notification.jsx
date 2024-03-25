import React from "react";

const Notification = ({ success, error }) => {
  const successStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return success !== null ? (
    <div style={successStyle}>{success}</div>
  ) : error !== null ? (
    <div style={errorStyle}>{error}</div>
  ) : null;
};

export default Notification;
