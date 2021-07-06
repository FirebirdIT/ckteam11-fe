import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Fab from "@material-ui/core/Fab";
// import CropFreeIcon from "@material-ui/icons/CropFree";
import Title from "../components/title/title";
import DonationForm from "../components/form/donation-form";
// import QRCodeDialog from "../components/dialog/qrcode";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function DonationPage() {
  const classes = useStyles();
  // const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  return (
    <div className={classes.paper}>
      <Title>捐款表格</Title>
      <DonationForm />
      {/* <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={handleClickOpen}
      >
        <CropFreeIcon />
      </Fab> */}
      {/* <QRCodeDialog isOpened={open} closeDialog={() => setOpen(false)} /> */}
    </div>
  );
}
