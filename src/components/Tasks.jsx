import React, { useEffect } from 'react';
import { useContext } from 'react';
import { toast } from "react-toastify";
import { SkillsContext } from '../context/skills';
import PropTypes from "prop-types";
import CardTask from './CardTask';

const Tasks = ({getDataClient, getDataDoer}) => {
  const skills = useContext(SkillsContext);
  const { tareasRegistradasClient, rol, userName } = skills || {};
  
  useEffect(() => {
    if(rol === 'client') {
      getDataClient();
      return;
    }
    if(rol === 'doer'){
      getDataDoer();
      return;
    }
  }, []);
  
  const performTask = (task) => {
    let regobj={
      stateCode: 'inProgress',
      assignedUserName: userName,
      state: 'En progreso por: ' + userName
    }
    fetch("https://backend-bancolombia.onrender.com/tasks/" + task.id, {
      method: "PATCH",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(regobj)
    }).then(() => {
      toast.success('Registered successfully.');
      getDataDoer();
    }).catch((err) => {
        toast.error('Failed :' + err.message);
    });
  }

  const renderFormulario = () => {
    if (rol === 'client') {
      return (
          tareasRegistradasClient.length > 0 ? (
            tareasRegistradasClient.map((task, index) => (
              <CardTask key={index} task={task} />
          ))
          ): (<h2>No hay tareas pendientes</h2>)
      );
    } else if (rol === 'doer') {
      return (
          tareasRegistradasClient.length > 0 ? (
            tareasRegistradasClient.map((task, index) => (
              <CardTask key={index} task={task} functionButton={performTask} />
          ))): (<h2>No hay tareas activas con tus habilidades</h2>)
      );
    } else {
      return null;
    }
  };

  return (
    <div style={{textAlign: 'center'}}>
      <div style={{
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        gap: "2rem 2%",
      }}>
        {renderFormulario()}
      </div>
    </div>
  );
};

Tasks.propTypes = {
  getDataDoer: PropTypes.func.isRequired,
  getDataClient: PropTypes.func.isRequired,
};

export default Tasks;