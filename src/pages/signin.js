import React, { useEffect } from "react";
import { Container, CssBaseline } from "@material-ui/core";
import SignInForm from "../components/signin/signin-form";

export default function SignIn() {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <SignInForm />
    </Container>
  );
}
