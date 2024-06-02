import { Button, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import dPollLogo from "../../assets/poll.png";
import { useSDK } from "@metamask/sdk-react";
import { LockIcon } from "@chakra-ui/icons";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 items-center">
      <img src={dPollLogo} className="w-32" />
      <Heading className="mb-2">Welcome to dPoll</Heading>
      <Text className="max-w-[500px]">
        Don't just have an opinion, have a poll! Turn your burning questions
        into interactive debates and see which side wins out
      </Text>
      <div className="flex gap-3">
        <Button colorScheme="blue" onClick={() => navigate("/polls")}>
          See Polls
        </Button>
        <Button colorScheme="blue" onClick={() => navigate("/create")}>
          Create Poll
        </Button>
      </div>
    </div>
  );
}

export default Home;
