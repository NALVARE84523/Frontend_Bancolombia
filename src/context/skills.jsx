import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const SkillsContext = createContext();

export function SkillsProvider({ children }) {
  const userName = sessionStorage.getItem("userName");
  const rol = sessionStorage.getItem("userRole");
  const [skillDoer, setSkillDoer] = useState([]);
  const [tareasRegistradasClient, setTareasRegistradasClient] = useState([]);

  return (
    <SkillsContext.Provider
      value={{
        rol,
        userName,
        skillDoer,
        setSkillDoer,
        tareasRegistradasClient,
        setTareasRegistradasClient
      }}
    >
      {children}
    </SkillsContext.Provider>
  );
}

SkillsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
