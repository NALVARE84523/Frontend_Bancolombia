import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
/* import { toast } from "react-toastify"; */

export const SkillsContext = createContext();

export function SkillsProvider({ children }) {
  const userName = sessionStorage.getItem("userName");
  const rol = sessionStorage.getItem("userRole");
  const [skillDoer, setSkillDoer] = useState([]);
  const [tareasRegistradasClient, setTareasRegistradasClient] = useState([]);
  
/*   const getDataClient = () => {
    fetch("https://backend-bancolombia.onrender.com/tasks?userId=" + userName)
      .then((res) => res.json())
      .then((resp) => {
        setTareasRegistradasClient(resp);
      })
      .catch((err) => {
        toast.error("Failed service: " + err.message);
      });
  };
  const getDataDoer = () => {
    fetch("https://backend-bancolombia.onrender.com/users?id=" + userName)
      .then((res) => res.json())
      .then((skillsUser) => {
        const skillsArray = skillsUser[0]?.skills || [];
        const endpoint = "https://backend-bancolombia.onrender.com/tasks?" + skillsArray.map(skill => `requiredSkills=${encodeURIComponent(skill)}`).join('&') + "&active=true";
        if (rol === "doer") {
          fetch(endpoint)
            .then((res) => res.json())
            .then((resp) => {
              setTareasRegistradasClient(resp);
            })
            .catch((err) => {
              toast.error("Failed service: " + err.message);
            });
          return;
        }
      })
      .catch((err) => {
        toast.error("Failed service: " + err.message);
      });
  }; */

  return (
    <SkillsContext.Provider
      value={{
        rol,
        userName,
        skillDoer,
        setSkillDoer,
        tareasRegistradasClient,
        setTareasRegistradasClient,
        // getDataClient,
        // getDataDoer,
      }}
    >
      {children}
    </SkillsContext.Provider>
  );
}

SkillsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
