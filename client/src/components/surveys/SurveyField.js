import React from "react";

export default props => {
  return (
    <div>
        <label>{props.label}</label>
      <input id="in" {...props.input} />
    </div>
  );
};
