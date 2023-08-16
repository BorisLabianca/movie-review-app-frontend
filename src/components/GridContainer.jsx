import React from "react";

const GridContainer = ({ children, classname }) => {
  return (
    <div
      className={
        "grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-3 " + classname
      }
    >
      {children}
    </div>
  );
};

export default GridContainer;
