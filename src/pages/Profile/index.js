import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from "@rocketseat/unform";

import { updateProfileRequest } from "~/store/modules/user/actions";

import { Container } from "./styles";

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Your full name" />
        <Input name="email" placeholder="Your e-mail address" />

        <hr />

        <Input
          name="oldPassword"
          type="password"
          placeholder="Your current password"
        />
        <Input
          name="password"
          type="password"
          placeholder="Your new password"
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm your new password"
        />

        <button type="submit">Update profile</button>
      </Form>

      <button type="button">Logout from GoBarber</button>
    </Container>
  );
}
