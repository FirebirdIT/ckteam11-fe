import React from "react";
import { makeStyles, Fab } from "@material-ui/core/styles";
import Title from "../components/title/title";
import ReactToPrint from "react-to-print";
import PDFPage from "../components/pdf/pdf";
import { Button } from "@material-ui/core";

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

  return (
    <div className={classes.paper}>
      <Title>Authorization Letter</Title>
      <Example />
    </div>
  );
}

class Example extends React.Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => (
            <Button variant="outlined" color="primary">
              Print this out!
            </Button>
          )}
          content={() => this.componentRef}
        />
        <PDFPage ref={(el) => (this.componentRef = el)} />
      </div>
    );
  }
}
