import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  padding: {
    margin: theme.spacing(2),
  },
  divider: {
    background: theme.palette.primary.main,
  },
}));

export default function Title(props) {
  const classes = useStyles();

  return (
    <div className={classes.padding}>
      <Typography component="h1" variant="h5" className={classes.padding}>
        {props.children}
      </Typography>
      <Divider variant="middle" className={classes.divider} />
    </div>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};
