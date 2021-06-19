import { React, useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import VolunteerRegisterPage from "../volunteer-register";
import DonationSummary from "../donation-summary";
import DonationPage from "../donation-page";
import UserList from "../user-list-page";
import Profile from "../personal-profile";
import UserProfile from "../user-info-page";

export default function Team() {
  let match = useRouteMatch("/team");
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
      window.location.href = "/signIn";
      alert("Please login.");
    } else if (localStorage.getItem("role") !== "team") {
      alert("Access to the page is denied.");
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/signIn";
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
          {/* donation list page */}
          <DonationPage />
        </Route>
        {/* team & volunteer list page */}
        <Route path={`${match.url}/register-volunteer`}>
          <VolunteerRegisterPage />
        </Route>
        <Route path={`${match.url}/profile`}>
          <Profile />
        </Route>
        <Route path={`${match.url}/user-list`}>
          <UserList />
        </Route>
        <Route path={`${match.url}/user-info`}>
          <UserProfile />
        </Route>
      </Switch>
    </div>
    // </Container>
  );
}
