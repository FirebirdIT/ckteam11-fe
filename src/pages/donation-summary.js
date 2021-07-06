import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Title from "../components/title/title";
import DonationTable from "../components/donation-list/donation-table";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function DonationSummary() {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <Title>捐款总额</Title>
      <DonationTable />
    </div>
  );
}
