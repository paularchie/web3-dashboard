import { Button, Center, Flex, Text } from "@chakra-ui/react";
import Moralis from "moralis/types";

type HeaderProps = {
  user: Moralis.User;
  logout: () => void;
  isLoggingOut: boolean;
};

const Header: React.FC<HeaderProps> = ({ user, logout, isLoggingOut }) => {
  return (
    <header>
      <Flex
        px="10"
        py="6"
        justifyContent="space-between"
        color="white"
        bg="purple.400"
      >
        <Center>
          <Text fontSize="xl" fontWeight="bold">
            Dashboard
          </Text>
        </Center>
        <Center>
          <Text>{user.getUsername()}</Text>
          <Button
            ml="4"
            colorScheme="purple"
            onClick={logout}
            disabled={isLoggingOut}
          >
            Logout
          </Button>
        </Center>
      </Flex>
    </header>
  );
};

export default Header;
