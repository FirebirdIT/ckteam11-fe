import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Grid, LinearProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  padding: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    marginBottom: theme.spacing(3),
  },
}));

const data = [
  { label: "Username", placeholder: "name", team: true, volunteer: true },
  { label: "Name", placeholder: "", team: true, volunteer: true },
  { label: "Chinese Name", placeholder: "", team: true, volunteer: false },
  { label: "Malay Name", placeholder: "", team: true, volunteer: false },
  { label: "Address", placeholder: "", team: true, volunteer: true },
  { label: "Contact Number", placeholder: "", team: true, volunteer: true },
  {
    label: "Identity Card Number",
    placeholder: "",
    team: false,
    volunteer: true,
  },
  { label: "Team", placeholder: "", team: false, volunteer: true },
  { label: "Team SSM ID", placeholder: "", team: true, volunteer: false },
  { label: "Bank Name", placeholder: "", team: true, volunteer: false },
  { label: "Bank Owner Name", placeholder: "", team: true, volunteer: false },
  {
    label: "Bank Account Number",
    placeholder: "",
    team: true,
    volunteer: false,
  },
];

export default function UserProfile() {
  const classes = useStyles();

  return (
    <div className={classes.padding}>
      {data.map((d, i) =>
        localStorage.getItem("role") === "team" ||
        localStorage.getItem("team") === "true"
          ? d.team && (
              <Grid
                container
                key={i}
                spacing={3}
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={6} sm={4} md={2}>
                  {d.label}
                </Grid>
                <Grid item xs={6} sm={8} md={10}>
                  <TextField
                    disabled
                    fullWidth
                    size="small"
                    defaultValue={d.placeholder}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            )
          : localStorage.getItem("role") === "volunteer" ||
            localStorage.getItem("team") === "false"
          ? d.volunteer && (
              <Grid
                container
                key={i}
                spacing={3}
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={6} sm={4} md={2}>
                  {d.label}
                </Grid>
                <Grid item xs={6} sm={8} md={10}>
                  <TextField
                    disabled
                    fullWidth
                    size="small"
                    defaultValue={d.placeholder}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            )
          : null
      )}
    </div>
  );
}
