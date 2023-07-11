import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Checkbox, ListItemText, OutlinedInput } from "@mui/material";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const FormAddTask = ({getDataClient}) => {
  const rol = sessionStorage.getItem("userRole");
  const userName = sessionStorage.getItem("userName");
  const [totalSkills, setTotalSkills] = useState([]);
  const [tarea, setTarea] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [categories, setCategories] = useState([]);
  const [requiredSkills, setRequiredSkills] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setRequiredSkills(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    fetch("https://backend-bancolombia.onrender.com/categories")
      .then((res) => res.json())
      .then((resp) => {
        setCategories(resp);
      })
      .catch((err) => {
        toast.error("Failed service: " + err.message);
      });
    fetch("https://backend-bancolombia.onrender.com/skills")
      .then((res) => res.json())
      .then((resp) => {
        let arraySkill = resp.map((skill) => skill.skill);
        setTotalSkills(arraySkill);
      })
      .catch((err) => {
        console.error("Failed service: " + err.message);
      });
  }, []);

  function currencyFormatter({ currency, value }) {
    const formatter = new Intl.NumberFormat("es-ES", {
      style: "currency",
      minimumFractionDigits: 2,
      currency,
    });
    return formatter.format(value);
  }
  useEffect(() => {
    let price = categories?.find(
      (category) => category?.category === categoria
    );
    let value = price?.price;
    const priceFormat = currencyFormatter({
      currency: "COP",
      value,
    });
    setPrecio(price?.price ? priceFormat : "");
  }, [categoria]);
  const handleCategoriaChange = (e) => {
    setCategoria(e.target.value);
  };

  const handleTareaChange = (e) => {
    setTarea(e.target.value);
  };

  const handlePrecioChange = (e) => {
    setPrecio(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (rol === "client") {
      if (!categoria || !tarea) {
        toast.warning("Por favor, complete los campos obligatorios.");
        return;
      }
      const precioFinal = precio || 0;

      const nuevaTarea = {
        userId: userName,
        category: categoria,
        requiredSkills: requiredSkills,
        description: tarea,
        price: precioFinal,
        stateCode: 'enabled',
        assignedUserName: null,
        state: "En espera",
        date: new Date().toLocaleDateString("es-CO",{ weekday:'long', day:'numeric', month:'long', year:'numeric' })
      };
      fetch("https://backend-bancolombia.onrender.com/tasks", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(nuevaTarea),
      })
        .then(() => {
          toast.success("Registered successfully.");
          getDataClient();
        })
        .catch((err) => {
          toast.error("Failed :" + err.message);
        });
    }
  };
  return (
    <>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <FormControl sx={{ m: 1, minWidth: 120, width: '44%' }}>
          <InputLabel id="demo-simple-select-helper-label">
            Categoria
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Categoria"
            value={categoria}
            onChange={handleCategoriaChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories.map((category) => {
              return (
                <MenuItem key={category.categoryId} value={category.category}>
                  {category.category}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText>With label + helper text</FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1, minwidth: 120, width: '44%' }}>
          <InputLabel id="demo-multiple-checkbox-label">Habilidades</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={requiredSkills}
            onChange={handleChange}
            input={<OutlinedInput label="Habilidades" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {totalSkills.map((skill) => (
              <MenuItem key={skill} value={skill}>
                <Checkbox checked={requiredSkills.indexOf(skill) > -1} />
                <ListItemText primary={skill} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          label="Descripcion de la tarea:"
          variant="outlined"
          value={tarea}
          onChange={handleTareaChange}
          sx={{ m: 2, width: '100%'}}
        />
        <TextField
          id="outlined-basic"
          label="Precio a pagar:"
          variant="outlined"
          value={precio}
          onChange={handlePrecioChange}
          sx={{ m: 2, width: '100%'}}
        />
        <Button variant="contained" type="submit">
          Registrar tarea
        </Button>
      </Box>
    </>
  );
};

FormAddTask.propTypes = {
  getDataClient: PropTypes.func,
};

export default FormAddTask;
