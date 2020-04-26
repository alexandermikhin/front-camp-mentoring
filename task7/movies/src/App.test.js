import React from "react";
import { render } from "@testing-library/react";
import Search from "./components/search/Search";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from './App';

test("renders learn react link", () => {
  // const {queryByText } = render(
  //   <BrowserRouter>
  //     <Provider store={store}>
  //       <App />
  //     </Provider>
  //   </BrowserRouter>
  // );

  // const title = queryByText("netflix");
  // expect(title).toBeInTheDocument();
});
