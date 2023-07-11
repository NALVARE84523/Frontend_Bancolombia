import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as LinkNavigate, useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import { FormControl, FormHelperText, InputLabel, ListItemText, MenuItem, OutlinedInput } from '@mui/material';
import { toast } from 'react-toastify';

const defaultTheme = createTheme();

const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };

export default function Register() {
    const [id, idChange] = useState("");
    const [name, nameChange] = useState("");
    const [password, passwordChange] = useState("");
    const [email, emailChange] = useState("");
    const [skillsUser, skillsUserChange] = useState([]);
    const [role, roleChange] = useState("");
    const [totalSkills, setTotalSkills] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
      fetch("https://backend-bancolombia.onrender.com/skills")
      .then((res) => res.json())
      .then((resp) => {
        let arraySkill = resp.map((skill) => skill.skill);
        setTotalSkills(arraySkill);
      })
      .catch((err)=> {
        toast.error('Failed service: '+err.message);
      });
    }, []);
    
    const isValidate=()=>{
      let isProceed = true;
      if(id === null || id === ''){
        isProceed = false;
        toast.error('Please enter the value in Username');
    }
    if(name === null || name === ''){
        isProceed = false;
        toast.error('Please enter the value in Fullname');
    }
    if(password === null || password === ''){
        isProceed = false;
        toast.error('Please enter the value in Password');
    }
    if(email === null || email === ''){
        isProceed = false;
        toast.error('Please enter the value in Email');
    }
    if(role === null || role === ''){
        isProceed = false;
        toast.error('Please enter the value in Role');
      }
    if(!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){
        isProceed = false;
        toast.warning('Please enter the valid email')
    }
      return isProceed;
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      let regobj={
        id,
        name,
        password,
        email,
        skillsUser,
        role
      }
      if(isValidate()) {
        fetch("https://backend-bancolombia.onrender.com/users", {
          method: "POST",
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(regobj)
        }).then(() => {
          toast.success('Registered successfully.')
          navigate('/login');
        }).catch((err) => {
            toast.error('Failed :' + err.message);
        });
      }
    }
    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        skillsUserChange(typeof value === "string" ? value.split(",") : value);
      };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />    
          </Avatar>
          <Typography component="h1" variant="h5" data-testid="registro" >
            Registro
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="name"
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  label="Nombre de usuario"
                  autoFocus
                  value={id}
                  onChange={e=>idChange(e.target.value)}
                  data-testid="userName"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Contraseña"
                  name="password"
                  type="password"
                  value={password}
                  data-testid="password"
                  onChange={e=>passwordChange(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="fullName"
                  label="Nombre completo"
                  name="fullName"
                  autoComplete="fullName"
                  value={name}
                  onChange={e=>nameChange(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  label="Correo electronico"
                  type="email"
                  id="email"
                  autoComplete="email"
                  value={email}
                  onChange={e=>emailChange(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
              <FormControl sx={{ minWidth: 120, width: '100%' }}>
                <InputLabel id="demo-simple-select-helper-label">
                    Rol
                </InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Rol"
                    value={role} 
                    onChange={e=>roleChange(e.target.value)}
                >
                    <MenuItem value="client">
                        <em>Cliente</em>
                    </MenuItem>
                    <MenuItem value="doer">
                        <em>Colaborador</em>
                    </MenuItem>
                </Select>
                <FormHelperText>Escoge tu rol</FormHelperText>
                </FormControl>
                
              </Grid>
              <Grid item xs={6}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-multiple-checkbox-label">Tus habilidades</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={skillsUser} 
                    onChange={handleChange}
                    input={<OutlinedInput label="Tus habilidades" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                >  
                    {totalSkills.map((skill) => (
                        <MenuItem key={skill} value={skill}>
                            <Checkbox checked={skillsUser.indexOf(skill) > -1} />
                            <ListItemText primary={skill} />
                        </MenuItem>
                    ))}
                </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              data-testid="registrarme"
            >
              Registrarme
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <LinkNavigate to={'/login'} variant="body2">
                  Ya tienes una cuenta? Inicia sesion
                </LinkNavigate>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
