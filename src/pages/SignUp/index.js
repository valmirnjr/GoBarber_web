import React from "react";
import { Link } from "react-router-dom";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";

import logo from "~/assets/logo.svg";

const schema = Yup.object().shape({
  name: Yup.string().required("Please inform your name"),
  email: Yup.string()
    .email("Invalid e-mail format")
    .required("Please inform your e-mail"),
  password: Yup.string()
    .min(6, "Your password must contain at least 6 characters")
    .required("Please inform your password"),
});

export default function SignUp() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Your name" />
        <Input name="email" type="email" placeholder="Your e-mail" />
        <Input name="password" type="password" placeholder="Your password" />

        <button type="submit">Register</button>
        <Link to="/">I have an account</Link>
      </Form>
    </>
  );
}
