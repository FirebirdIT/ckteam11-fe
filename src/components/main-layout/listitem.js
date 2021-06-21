import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";

const userType = localStorage.getItem("role");

export const mainListItems = (
  <div>
    {/* DONATION LIST */}
    <ListItem
      button
      onClick={() => {
        window.location.href = `/${userType}/donation-list`;
      }}
    >
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Donation Summary" />
    </ListItem>
    {/* TEAM REGISTER */}
    {localStorage.getItem("role") === "admin" ? (
      <ListItem
        button
        onClick={() => {
          window.location.href = `/${userType}/register-team`;
        }}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Team Registration" />
      </ListItem>
    ) : null}
    {/* VOLUNTEER REGISTER */}
    {localStorage.getItem("role") === "volunteer" ? null : (
      <ListItem
        button
        onClick={() => {
          window.location.href = `/${userType}/register-volunteer`;
        }}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Volunteer Registration" />
      </ListItem>
    )}
    {/* DONATION FORM */}
    <ListItem
      button
      onClick={() => {
        window.location.href = `/${userType}/donation-form`;
      }}
    >
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Donation" />
    </ListItem>
    {/* USER LIST */}
    {localStorage.getItem("role") === "volunteer" ? null : (
      <ListItem
        button
        onClick={() => {
          window.location.href = `/${userType}/user-list`;
        }}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="User Summary" />
      </ListItem>
    )}
    {/* USER PROFILE */}
    {localStorage.getItem("role") === "volunteer" ? null : (
      <ListItem
        button
        onClick={() => {
          window.location.href = `/${userType}/user-info`;
        }}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="User Profile" />
      </ListItem>
    )}
    {/* PROFILE */}
    {localStorage.getItem("role") === "admin" ? null : (
      <ListItem
        button
        onClick={() => {
          window.location.href = `/${userType}/profile`;
        }}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
    )}
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem
      button
      onClick={() => {
        localStorage.clear();
        window.location.href = "/signIn";
      }}
    >
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Sign Out" />
    </ListItem>
  </div>
);