import { render } from "@testing-library/react";
import React from "react";
import Switcher from "./Switcher";

test("Switcher should set correct title and active class", () => {
  const prop1 = { value: "prop1-val", title: "prop1-title" };
  const prop2 = { value: "prop2-val", title: "prop2-title" };
  const { container } = render(
    <Switcher
      prop1={prop1}
      prop2={prop2}
      active="prop2-val"
      onChange={() => {}}
    />
  );

  const buttons = container.querySelectorAll("button");

  expect(buttons[0]).toHaveTextContent("prop1-title");
  expect(buttons[1]).toHaveTextContent("prop2-title");
  expect(buttons[1]).toHaveClass("active");
});
