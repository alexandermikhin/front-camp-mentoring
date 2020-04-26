import React from "react";

export const MovieItemContext = React.createContext({
  openMovieDetails: () => {},
  filterByCategory: () => {}
});
