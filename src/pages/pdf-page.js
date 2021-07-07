import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useReactToPrint } from "react-to-print";
import { Fab } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import PDFPage from "../components/pdf/pdf";
import Title from "../components/title/title";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(3, 0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  pdfSize: {
    width: "210mm",
    height: "297mm",
    display: "none",
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  titleBottom: {
    paddingBottom: theme.spacing(7),
  },
}));

export default function Profile() {
  const classes = useStyles();
  const componentRef = useRef();

  useEffect(() => {
    localStorage.removeItem("tUsername");
    localStorage.removeItem("vUsername");
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className={classes.paper}>
      <Title className={classes.titleBottom}>授权证书</Title>
      <PDFPage />
      <div className={classes.pdfSize}>
        <PDFPage ref={componentRef} className={classes.pdfSize} />
      </div>
      <Fab
        color="primary"
        variant="extended"
        className={classes.fab}
        onClick={handlePrint}
      >
        <GetAppIcon className={classes.extendedIcon} />
        下载
      </Fab>
      {/* <QRCodeDialog isOpened={open} closeDialog={() => setOpen(false)} /> */}
    </div>
  );
}
