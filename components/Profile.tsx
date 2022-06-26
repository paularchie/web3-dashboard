import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import Moralis from "moralis/types";
import React, { useCallback, useState } from "react";
import { useMoralis } from "react-moralis";
import Container from "./Container";

type ProfileProps = {
  user: Moralis.User;
};
const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [value, setValue] = useState("");
  const { setUserData, isUserUpdating } = useMoralis();

  const handleChange = useCallback(({ target }) => {
    setValue(target.value);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (value.trim()) {
        await setUserData({
          username: value,
        });

        setValue("");
      }
    },
    [setUserData, value]
  );

  return (
    <Container>
      <Text>
        <b>Username:</b> {user.getUsername()}
      </Text>
      <Text>
        <b>Wallet Address:</b> {user.get("ethAddress")}
      </Text>
      <form onSubmit={handleSubmit}>
        <FormControl mt="5" mb="6">
          <FormLabel htmlFor="username">Set a new username</FormLabel>
          <Input
            id="username"
            type="text"
            placeholder="new username"
            value={value}
            onChange={handleChange}
          ></Input>
        </FormControl>
        <Button type="submit" colorScheme="purple" disabled={isUserUpdating}>
          Change Username
        </Button>
      </form>
    </Container>
  );
};
export default Profile;
