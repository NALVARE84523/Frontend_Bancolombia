import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Tasks from "../components/Tasks";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SkillsContext } from "../context/skills";
import { toast } from "react-toastify";

const Home = () => {
  const userName = sessionStorage.getItem("userName");
  const rol = sessionStorage.getItem("userRole");
  const skills = useContext(SkillsContext);
  const {setTareasRegistradasClient = [] } = skills;
  const navigate = useNavigate();
  const validationUser = (skillsUser) => {
    console.log("userName: ", userName);
    if (userName === "" || userName === null || userName === undefined || skillsUser.length === 0) {
      navigate("/login");
      return;
    }
    if(rol === "doer") {
      getDataDoer();
    }
    if(rol === "client") {
      getDataClient();
    }
  }
  const getDataClient = () => {
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
        const endpoint = "https://backend-bancolombia.onrender.com/tasks?" + skillsArray.map(skill => `requiredSkills_contains=${encodeURIComponent(skill)}`).join('&') + "&stateCode=enabled";
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
  };
  useEffect(() => {
    validationUser(userName);
  }, []);
  return (
    <>
      <Header getDataDoer={getDataDoer} getDataClient={getDataClient} />
      <>
        <CssBaseline />
        <Container maxWidth="xl" sx={{ marginTop: '30px' }}>
          <Tasks getDataDoer={getDataDoer} getDataClient={getDataClient} />
        </Container>
      </>
    </>
  );
};

export default Home;
