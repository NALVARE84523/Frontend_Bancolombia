import React, {useEffect, useState} from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

export default function CardTask({ task, functionButton }) {
  const userName = sessionStorage.getItem("userName");
  const userRol = sessionStorage.getItem("userRole");
  const [image, setImage] = useState("");
  useEffect(() => {
    fetch("https://backend-bancolombia.onrender.com/categories")
      .then((res) => res.json())
      .then((resp) => {
        const matchingCategory = resp.find((item) => item.category === task.category);
        if (matchingCategory) {
          setImage(matchingCategory.image);
        }
        console.log("Task: ", task);
      })
      .catch((err) => {
        toast.error("Failed service: " + err.message);
      });
  }, []);
  const buttonTask = () => {
    if (!task.state.includes("progreso") && !task.stateCode.includes("finalized") && userRol === "doer") {
      return (
          <Button
            size="small"
            color="primary"
            onClick={() => functionButton(task)}
          >
            Realizar tarea
          </Button>
      );
    }
    if(task.state.includes("progreso") && userRol === "doer") {
        return (
              <Button
                size="small"
                color="primary"
                onClick={() => functionButton(task)}
              >
                Notificar finalizacion de tarea
              </Button>
          );
    }
  };
  return (
    <Card sx={{ maxWidth: 345, width: '23.5%' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {userName[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={task.category}
        subheader={task.date}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Image task"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {task.description}.
        </Typography>
        {userRol === "client" && (
          <Typography variant="body2" color="text.secondary">
            {task.state}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{justifyContent: 'space-between'}}>
        <Typography variant="body2" color="text.secondary">
            {task.price}
        </Typography>
        {buttonTask()}
      </CardActions>
    </Card>
  );
}

CardTask.propTypes = {
  functionButton: PropTypes.func,
  task: PropTypes.object.isRequired,
};
