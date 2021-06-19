import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";

export default function QRCodeDialog({ isOpened, closeDialog }) {
  useEffect(() => {
    handleClickOpen();
  }, []);

  const handleClickOpen = () => {
    //setOpen(true);
    //setTimeout(() => setOpen(false), 16000);
  };

  const handleClose = () => {
    //setOpen(false);
    closeDialog(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={isOpened}
        onClose={handleClose}
        style={{ position: "absolute" }}
      >
        <img className="image" src="/logo192.png" alt="no image" />
      </Dialog>
    </React.Fragment>
  );
}
