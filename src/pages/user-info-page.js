import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Title from "../components/title/title";
import Profile from "../components/user-list/profile";
import DonationTable from "../components/donation-list/donation-table";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function UserProfile() {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Title>
        {localStorage.getItem("vUsername") === null
          ? `${localStorage.getItem("tUsername")}  Profile`
          : `${localStorage.getItem("vUsername")}  Profile`}
      </Title>
      <Profile />
      <DonationTable />
    </div>
  );
}
