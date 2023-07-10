import { Container, CssBaseline } from "@mui/material";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import CardTask from "../components/CardTask";
import Header from "../components/Header";
import { SkillsContext } from "../context/skills";
const TasksProcess = () => {
  const skills = useContext(SkillsContext);
  const { rol, userName } = skills;
  const [tasksInProgress, setTasksInProgress] = useState([]);
  useEffect(() => {
    if (rol === "doer") {
      getData();
    }
  }, []);

  const getData = () => {
    fetch("https://backend-bancolombia.onrender.com/tasks?&assignedUserName="+userName + "&stateCode=inProgress")
      .then((res) => res.json())
      .then((resp) => {
        setTasksInProgress(resp);
      })
      .catch((err) => {
        toast.error("Failed service: " + err.message);
      });
  };

  const finalyTaskProccess = (task) => {
    let regobj={
      stateCode: 'finalized',
      assignedUserName: userName,
      state: userName + ' ha finalizado la tarea, envia su pago'
    }
    fetch("https://backend-bancolombia.onrender.com/tasks/" + task.id, {
      method: "PATCH",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(regobj)
    }).then(() => {
      toast.success('Registered successfully.');
      getData();
    }).catch((err) => {
        toast.error('Failed :' + err.message);
    });
  }
  const renderTasksProcess = () => {
    if (rol === "doer") {
      return tasksInProgress.length > 0 ? (
        tasksInProgress.map((task, index) => (
          <CardTask key={index} task={task} functionButton={finalyTaskProccess} />
        ))
      ) : (
        <h2>No tienes tareas en proceso</h2>
      );
    } else {
      return null;
    }
  };
  return (
    <>
      <Header />
      <>
        <CssBaseline />
        <Container maxWidth="xl" sx={{ marginTop: "30px" }}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                gap: "2rem 2%",
              }}
            >
              {renderTasksProcess()}
            </div>
          </div>
        </Container>
      </>
    </>
  );
};

export default TasksProcess;
