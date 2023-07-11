import React, { useEffect,  useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as LinkNavigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const defaultTheme = createTheme();

export default function Login() {
    const [userName, userNameUpdate] = useState("");
    const [password, passwordUpdate] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
      sessionStorage.clear();
    }, [])
    const proceedLogin = (e) => {
        e.preventDefault();
        if(validate()) {
          fetch("https://backend-bancolombia.onrender.com/users/"+userName)
            .then((res) => res.json())
            .then((resp) => {
              if(Object.keys(resp).length === 0) {
                toast.error('Please enter valid credentials');
              } else {
                if(resp.password === password) {
                  toast.success('Success')
                  sessionStorage.setItem('userName', userName);
                  sessionStorage.setItem('userRole', resp.role);
                  navigate('/');
                } else {
                  toast.error('Please enter valid credentials');
                }
              }
            })
            .catch((err)=> {
              toast.error('Login failed due to: '+err.message);
            })
        }
      };
      const validate = () => {
        let result = true;
        if(userName === '' || userName === null) {
          result = false;
          toast.warning("Please enter username ");
        }
        if(password === '' || password === null) {
          result = false;
          toast.warning("Please enter password");
        }
        return result;
      }

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
          <Typography component="h1" variant="h5">
            Inicio de sesion
          </Typography>
          <Box component="form" onSubmit={proceedLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Nombre de usuario"
              name="userName"
              autoComplete="userName"
              autoFocus
              data-testid="userName" 
              value={userName} 
              onChange={(e)=>userNameUpdate(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password} 
              data-testid="password" 
              onChange={(e)=>passwordUpdate(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordarme"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <LinkNavigate variant="body2" to={'/register'}>
                    {"Registrate"}
                </LinkNavigate>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}