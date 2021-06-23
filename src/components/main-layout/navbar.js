import { React, useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  Divider,
  Drawer,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems, secondaryListItems } from "./listitem.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  menuButtonHidden: {
    display: "none",
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
}));

const drawerWidth = 240;

export default function NabVar() {
  const classes = useStyles();
  const [auth, setAuth] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    console.log(localStorage.getItem("access_token"));
    if (
      // localStorage.getItem("access_token") === undefined ||
      // localStorage.getItem("role") === undefined ||
      // localStorage.getItem("username") === undefined ||
      localStorage.getItem("access_token") === null ||
      localStorage.getItem("role") === null ||
      localStorage.getItem("username") === null
    ) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }, []);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          {auth && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                openDrawer && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            ckTeam11 Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
        open={openDrawer}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
    </div>
  );
}
