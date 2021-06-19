import { React, useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import DonationSummary from "../donation-summary";
import DonationPage from "../donation-page";
import Profile from "../personal-profile";

export default function Volunteer() {
  let match = useRouteMatch("/volunteer");
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
    } else if (localStorage.getItem("role") !== "volunteer") {
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
        <Route path={`${match.url}/user-info`}>
          <Profile />
        </Route>
      </Switch>
    </div>
    // </Container>
  );
}
