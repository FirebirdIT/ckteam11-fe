import { React, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  // Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  Link,
  LinearProgress,
} from "@material-ui/core";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.clear();
  }, []);

  const onLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(JSON.stringify({ username: username, password: password }));
    fetch(`${process.env.REACT_APP_API_KEY}/login`, {
      // fetch(`${process.env.REACT_APP_API_KEY}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result["msg"] === "Login Successfully") {
            localStorage.setItem("access_token", result["access_token"]);
            localStorage.setItem("role", result["role"]);
            localStorage.setItem("username", username);
            if (result["role"] === "admin") {
              window.location.href = "/admin/donation-list";
            } else if (result["role"] === "team") {
              window.location.href = "/team/donation-list";
            } else if (result["role"] === "volunteer") {
              window.location.href = "/volunteer/authorization-letter";
            }
          } else {
            alert(result["msg"]);
            setUsername("");
            setPassword("");
          }
        },
        (error) => {
          console.log(error);
          localStorage.clear();
          sessionStorage.clear();
          alert("Login failed. Please try again.");
        }
      );
    setLoading(false);
  };

  return (
    <div className={classes.paper}>
      {/* <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar> */}
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} onSubmit={onLogin}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {loading === false ? (
          <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="https://ckteam11.com" variant="body2">
                  {"Back to main page"}
                </Link>
              </Grid>
            </Grid>
          </div>
        ) : (
          <LinearProgress className={classes.submit} />
        )}
      </form>
    </div>
  );
}
