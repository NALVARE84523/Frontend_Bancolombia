import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Tasks from "../components/Tasks";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const userName = sessionStorage.getItem("userName");
  const navigate = useNavigate();
  const validationUser = (skillsUser) => {
    if (userName === "" || userName === null || userName === undefined || skillsUser.length === 0) {
      navigate("/login");
      return;
    }
  }
  useEffect(() => {
    validationUser(userName);
  }, []);
  return (
    <>
      <Header/>
      <>
        <CssBaseline />
        <Container maxWidth="xl" sx={{ marginTop: '30px' }}>
          <Tasks />
        </Container>
      </>
    </>
  );
};

export default Home;
