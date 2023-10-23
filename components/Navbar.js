import { Box, Flex, Button, Text, useColorMode, useToken } from "@chakra-ui/react";
import ActiveLink from './ActiveLink';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [hoverColor] = useToken("colors", ["gray.400"]);

  return (
    <Flex bg={colorMode === "light" ? "gray.200" : "gray.800"} p={4} justifyContent="space-between">
      <Flex>
        <ActiveLink href="/">
          <Text mx={2} _hover={{ color: hoverColor, transition: "color 0.2s" }}>Home</Text>
        </ActiveLink>
        <ActiveLink href="/env">
          <Text mx={2} _hover={{ color: hoverColor, transition: "color 0.2s" }}>Setup Environment</Text>
        </ActiveLink>
        <ActiveLink href="/create">
          <Text mx={2} _hover={{ color: hoverColor, transition: "color 0.2s" }}>Create Tests</Text>
        </ActiveLink>
        <ActiveLink href="/test">
          <Text mx={2} _hover={{ color: hoverColor, transition: "color 0.2s" }}>Run Tests</Text>
        </ActiveLink>
        <ActiveLink href="/docs">
          <Text mx={2} _hover={{ color: hoverColor, transition: "color 0.2s" }}>Docs</Text>
        </ActiveLink>
      </Flex>
      <Box>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? "Dark Mode" : "Light Mode"}
        </Button>
      </Box>
    </Flex>
  );
};

export default Navbar;
