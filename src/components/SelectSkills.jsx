import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { useContext } from "react";
import { SkillsContext } from "../context/skills";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const SelectSkills = ({ skillDoer }) => {
  const [totalSkills, setTotalSkills] = useState([]);
  const skills = useContext(SkillsContext);
  const { setSkillDoer, rol, getDataDoer } = skills;
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkillDoer(typeof value === "string" ? value.split(",") : value);
    getDataDoer();
  };
  useEffect(() => {
    if (rol === "doer") {
      fetch("https://backend-bancolombia.onrender.com/skills")
        .then((res) => res.json())
        .then((resp) => {
          let arraySkill = resp.map((skill) => skill.skill);
          setTotalSkills(arraySkill);
        })
        .catch((err) => {
          console.error("Failed service: " + err.message);
        });
      return;
    }
  }, []);
  return (
    <FormControl sx={{ m: 1, width: "100%" }}>
      <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={skillDoer}
        onChange={handleChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {totalSkills.map((skill) => (
          <MenuItem key={skill} value={skill}>
            <Checkbox checked={skillDoer.indexOf(skill) > -1} />
            <ListItemText primary={skill} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

SelectSkills.propTypes = {
  skillDoer: PropTypes.array.isRequired,
};

export default SelectSkills;
