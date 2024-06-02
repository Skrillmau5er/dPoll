import { useState } from "react";
import { Button, Heading } from "@chakra-ui/react";
import PollForm from "./PollForm";
import { createPoll as createPollAsync } from "../../api/poll";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSDK } from "@metamask/sdk-react";
import { EditIcon } from "@chakra-ui/icons";
import { useGlobalContext } from "../../util/globalContext";

function CreatePoll() {
  const [title, setTitle] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [pollOptions, setPollOptions] = useState(["", ""]);

  const { setShowConnectAccountModal } = useGlobalContext();

  const { account } = useSDK();

  const toast = useToast();
  const navigate = useNavigate();

  const createPoll = async () => {
    setSubmitted(true);
    if (!validationsPassed()) return;

    if (!account) {
      setShowConnectAccountModal(true);
      return;
    }

    const { success } = await createPollAsync(title, pollOptions, account);
    if (!success) {
      toast({
        title: "Error creating poll",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Poll created successfully",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    }
  };

  const validationsPassed = () => {
    if (!title) return false;

    let optionsPassed = true;
    pollOptions.forEach((option) => {
      if (option.length === 0) {
        optionsPassed = false;
      }
    });
    return optionsPassed;
  };

  return (
    <div className="max-w-[600px] w-full">
      <div className="flex justify-center items-center gap-3 mb-4">
        <EditIcon w={8} h={8} />
        <Heading>Create Poll</Heading>
      </div>

      <PollForm
        pollOptions={pollOptions}
        setPollOptions={setPollOptions}
        submitted={submitted}
        title={title}
        setTitle={setTitle}
      />
      <Button colorScheme="blue" onClick={createPoll} className="mb-3">
        Create Poll
      </Button>
      {/* <Text>This is your account {account}</Text> */}
    </div>
  );
}

export default CreatePoll;
