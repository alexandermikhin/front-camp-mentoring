import React from "react";
import "./Switcher.css";

export default function Switcher(props) {
  return (
    <div className="switcher-selector">
      <button
        className={`switcher-button ${props.prop1.value === props.active ?
          "active" : ''}`}
        onClick={props.onChange.bind(this, props.prop1.value)}
      >
        {props.prop1.title}
      </button>
      <button
        className={`switcher-button ${props.prop2.value === props.active ?
          "active" : ''}`}
        onClick={props.onChange.bind(this, props.prop2.value)}
      >
        {props.prop2.title}
      </button>
    </div>
  );
}
