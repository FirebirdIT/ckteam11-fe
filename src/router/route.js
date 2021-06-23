import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Volunteer from "../pages/users/volunteer";
import Team from "../pages/users/team";
import Admin from "../pages/users/admin";
import SignIn from "../pages/signin";
import AppBar from "../components/main-layout/navbar";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    height: "100%",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <Router>
      <div>
        {/* nav bar & drawer */}
        <AppBar />
        <main className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <Switch>
              <Route exact path="/">
                <SignIn />
              </Route>
              <Route path="/sign-in">
                {/* sign in page */}
                <SignIn />
              </Route>
              <Route path="/admin">
                {/* admin page */}
                <Admin />
              </Route>
              <Route path="/volunteer">
                {/* volunteer page */}
                <Volunteer />
              </Route>
              <Route path="/team">
                {/* team page */}
                <Team />
              </Route>
            </Switch>
          </Container>
        </main>
      </div>
    </Router>
  );
}
