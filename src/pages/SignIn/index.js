import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";

import { signInRequest } from "~/store/modules/auth/actions";

import logo from "~/assets/logo.svg";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid e-mail format")
    .required("Please inform your e-mail"),
  password: Yup.string().required("Please inform your password"),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Your e-mail" />
        <Input name="password" type="password" placeholder="Your password" />

        <button type="submit">{loading ? "Loading..." : "Login"}</button>
        <Link to="/register">Create free account</Link>
      </Form>
    </>
  );
}
