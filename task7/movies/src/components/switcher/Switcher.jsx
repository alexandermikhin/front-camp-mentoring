import React from "react";
import "./Switcher.css";

export default function Switcher(props) {
  return (
    <div className="search-by-selector">
      <span onClick={props.onChange.bind(this, props.prop1.value)}>
        {props.prop1.title}
      </span>
      <span onClick={props.onChange.bind(this, props.prop2.value)}>
        {props.prop2.title}
      </span>
    </div>
  );
}
