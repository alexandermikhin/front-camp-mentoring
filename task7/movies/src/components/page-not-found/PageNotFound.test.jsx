import { render } from "@testing-library/react";
import React from "react";
import { PageNotFound } from "./PageNotFound";

test("PageNotFound should show message", () => {
  const { queryByText } = render(<PageNotFound />);
  const title = queryByText("404. Page not found");
  expect(title).toBeInTheDocument();
});
