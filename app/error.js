"use client";
import React from "react";

const Error = ({ error, reset }) => {
  return (
    <div>
      <h1>{error.message}</h1>

      <button onClick={reset}>Tente novamente</button>
    </div>
  );
};

export default Error;
