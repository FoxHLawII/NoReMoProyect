import React from "react";

export default props => {
  return (
    <div>
        <label htmlFor={props.id}>{props.label}</label>
      <input id={props.id} {...props.input} />
    </div>
  );
};
