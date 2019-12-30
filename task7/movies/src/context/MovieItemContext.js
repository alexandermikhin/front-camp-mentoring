// @flow
import React from "react";

type Context = {
  filterByCategory(category: string): Promise<void>
}

export const MovieItemContext = React.createContext<Context>({
  filterByCategory: async (category: string) => {}
});
