import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Title from "../components/title/title";
import UserTable from "../components/user-list/user-info";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function UserList() {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Title>
        {localStorage.getItem("role") === "team"
          ? "Volunteers"
          : "User Summary"}
      </Title>
      <UserTable />
    </div>
  );
}
