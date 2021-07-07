import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Title from "../components/title/title";
import VolunteerRegisterForm from "../components/form/vol-register";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function VolunteerRegister() {
  const classes = useStyles();
  useEffect(() => {
    localStorage.removeItem("tUsername");
    localStorage.removeItem("vUsername");
  }, []);
  return (
    <div className={classes.paper}>
      <Title>志愿者注册</Title>
      <VolunteerRegisterForm />
    </div>
  );
}
