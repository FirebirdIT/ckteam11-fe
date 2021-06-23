import { React, useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import TeamRegisterPage from "../team-register";
import VolunteerRegisterPage from "../volunteer-register";
import DonationSummary from "../donation-summary";
import DonationPage from "../donation-page";
import UserList from "../user-list-page";
import UserProfile from "../user-info-page";

export default function Admin() {
  let match = useRouteMatch("/admin");
  useEffect(() => {
    if (
      localStorage.getItem("access_token") === undefined ||
      localStorage.getItem("role") === undefined ||
      localStorage.getItem("username") === undefined ||
      localStorage.getItem("access_token") === null ||
      localStorage.getItem("role") === null ||
      localStorage.getItem("username") === null
    ) {
      localStorage.clear();
      window.location.href = "/sign-in";
      alert("Please login.");
    } else if (localStorage.getItem("role") !== "admin") {
      alert("Access to the page is denied.");
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/sign-in";
    }
  }, []);

  return (
    <div>
      <Switch>
        {/* main dashboard page */}
        <Route path={`${match.url}/donation-list`}>
          {/* register page */}
          <DonationSummary />
        </Route>
        {/* donation page */}
        <Route path={`${match.url}/donation-form`}>
          <DonationPage />
        </Route>
        <Route path={`${match.url}/register-volunteer`}>
          <VolunteerRegisterPage />
        </Route>
        <Route path={`${match.url}/register-team`}>
          <TeamRegisterPage />
        </Route>
        <Route path={`${match.url}/user-info`}>
          <UserProfile />
        </Route>
        <Route path={`${match.url}/user-list`}>
          <UserList />
        </Route>
      </Switch>
    </div>
    // </Container>
  );
}
