import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Title from "../components/title/title";
import TeamRegisterForm from "../components/form/team-register";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function TeamRegisterPage() {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Title>团队注册</Title>
      <TeamRegisterForm />
    </div>
  );
}
