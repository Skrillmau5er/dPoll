import React from "react";
import { Button, Heading } from "@chakra-ui/react";

function App() {
  return (
    <div>
      <Heading>Welcome to dPoll</Heading>
      <div className="flex gap-3">
        <Button colorScheme="blue">See Polls</Button>
        <Button colorScheme="blue">Create Poll</Button>
      </div>
    </div>
  );
}

export default App;
