import React from "react";
import { Container, CssBaseline } from "@material-ui/core";
import SignInForm from "../components/signin/signin-form";

export default function SignIn() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <SignInForm />
    </Container>
  );
}
