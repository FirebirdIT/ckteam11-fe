import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Title from "../components/title/title";
import ProfileContent from "../components/user-list/profile";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function Profile() {
  const classes = useStyles();

  useEffect(() => {
    localStorage.removeItem("tUsername");
    localStorage.removeItem("vUsername");
  }, []);

  return (
    <div className={classes.paper}>
      <Title>档案信息</Title>
      <ProfileContent />
    </div>
  );
}
