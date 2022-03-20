import React, { createContext, useState } from "react";

export const UiContext = createContext();

export const UiProvider = ({ children }) => {
  const [hidden, setHidden] = useState(false);

  const showMenu = () => {
    setHidden(false);
  };

  const hideMenu = () => {
    setHidden(true);
  };

  return (
    <UiContext.Provider value={{ hidden, showMenu, hideMenu }}>
      {children}
    </UiContext.Provider>
  );
};
