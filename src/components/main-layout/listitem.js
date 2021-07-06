import React, { useRef } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  ListAlt,
  GroupAdd,
  PersonAdd,
  Group,
  MonetizationOn,
  AccountCircle,
  ExitToApp,
  VerifiedUser,
} from "@material-ui/icons";

const userType = localStorage.getItem("role");

export const mainListItems = (
  <div>
    {localStorage.getItem("role") === "volunteer" ? (
      <ListItem
        button
        onClick={() => {
          window.location.href = `/${userType}/authorization-letter`;
        }}
      >
        <ListItemIcon>
          <VerifiedUser />
        </ListItemIcon>
        <ListItemText primary="授权证书" />
      </ListItem>
    ) : null}
    {/* DONATION LIST */}
    <ListItem
      button
      onClick={() => {
        window.location.href = `/${userType}/donation-list`;
      }}
    >
      <ListItemIcon>
        <ListAlt />
      </ListItemIcon>
      <ListItemText primary="捐款总额" />
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
          <GroupAdd />
        </ListItemIcon>
        <ListItemText primary="团队注册" />
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
          <PersonAdd />
        </ListItemIcon>
        <ListItemText primary="志愿者注册" />
      </ListItem>
    )}

    {/* DONATION FORM */}
    {localStorage.getItem("role") === "admin" ? null : (
      <ListItem
        button
        onClick={() => {
          window.location.href = `/${userType}/donation-form`;
        }}
      >
        <ListItemIcon>
          <MonetizationOn />
        </ListItemIcon>
        <ListItemText primary="捐款表格" />
      </ListItem>
    )}

    {/* USER LIST */}
    {localStorage.getItem("role") === "volunteer" ? null : (
      <ListItem
        button
        onClick={() => {
          window.location.href = `/${userType}/user-list`;
        }}
      >
        <ListItemIcon>
          <Group />
        </ListItemIcon>
        <ListItemText
          primary={
            localStorage.getItem("role") === "team"
              ? "注册志愿者信息"
              : "注册用户信息"
          }
        />
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
          <AccountCircle />
        </ListItemIcon>
        <ListItemText
          primary={
            localStorage.getItem("role") === "team" ? "团队档案" : "个人档案"
          }
        />
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
        window.location.href = "/sign-in";
      }}
    >
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary="登出" />
    </ListItem>
  </div>
);
