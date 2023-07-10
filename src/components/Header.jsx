import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import SelectSkills from "./SelectSkills";
import ModalCustom from "./ModalCustom";
import FormAddTask from "./FormAddTask";
import { SkillsContext } from '../context/skills';
import Notifications from './Notifications';

export default function Header() {
  const skills = useContext(SkillsContext);
  const { skillDoer = [], getDataDoer } = skills || {};
  const userName = sessionStorage?.getItem("userName");
  const rol = sessionStorage?.getItem("userRole");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openSkill, setOpenSkill] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const handleOpenSkill = () => setOpenSkill(true);
  const handleOpenTask = () => setOpenTask(true);
  const handleCloseSkill = () => setOpenSkill(false);
  const handleCloseTask = () => setOpenTask(false);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  
  const submitSkills = () => {
    let regobj = {
      skills: skillDoer,
    };
    fetch("https://backend-bancolombia.onrender.com/users/" + userName, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(regobj),
    })
      .then(() => {
        toast.success("Registered successfully.");
        getDataDoer();
      })
      .catch((err) => {
        toast.error("Failed :" + err.message);
      });
  };

  return (
    <>
      <Box sx={{ bgcolor: 'primary.main' }}>
      <CssBaseline />
        <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'flex-end', padding: '0.5rem 1rem', gap: '1rem' }}>
        <Link to={'/'}><Typography sx={{ minWidth: 100, color: 'text.primary' }}>Home</Typography></Link>
        {rol === 'doer' && (
          <>
            <Link to={'/tasksProcess'}><Typography sx={{ minWidth: 100, color: 'text.primary' }}>Tareas en proceso</Typography></Link>
            <Typography onClick={handleOpenSkill} sx={{ minWidth: 100, color: 'text.primary', cursor: 'pointer' }}>Mis habilidades</Typography>
          </>
        )}
        {rol === 'client' && (
            <Typography onClick={handleOpenTask} sx={{ minWidth: 100, color: 'text.primary', cursor: 'pointer' }}>Publicar tarea</Typography>
        )}
        <Notifications/>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>{userName ? userName[0] : ""}</Avatar>
          </IconButton>
        </Tooltip>
        </Box>
        </Container>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> {userName}
        </MenuItem>
        <Divider />
        <Link to={'/login'}> 
            <MenuItem onClick={handleClose}>
            Logout
            </MenuItem>
        </Link>
      </Menu>
      <ModalCustom handleClose={handleCloseSkill} open={openSkill}>
        <SelectSkills
          skillDoer={skillDoer}
          rol={rol}
        />
        <Button
          variant="contained"
          onClick={() => {
            submitSkills(), handleCloseSkill();
          }}
        >
          Enviar
        </Button>
      </ModalCustom>
      <ModalCustom handleClose={handleCloseTask} open={openTask}>
        <FormAddTask />
      </ModalCustom>
    </>
  );
}
