// @flow
import React from "react";
import "./Switcher.css";

type Props = {
  prop1: Object,
  prop2: Object,
  active: string,
  onChange: Function
}

export default function Switcher(props: Props) {
  return (
    <div className="switcher-selector">
      <button
        type="button"
        className={`switcher-button ${
          props.prop1.value === props.active ? "active" : ""
        }`}
        onClick={props.onChange.bind(this, props.prop1.value)}
      >
        {props.prop1.title}
      </button>
      <button
        type="button"
        className={`switcher-button ${
          props.prop2.value === props.active ? "active" : ""
        }`}
        onClick={props.onChange.bind(this, props.prop2.value)}
      >
        {props.prop2.title}
      </button>
    </div>
  );
}
