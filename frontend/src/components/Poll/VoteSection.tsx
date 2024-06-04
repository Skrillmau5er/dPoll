import { ArrowDownIcon, CheckIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { voteOnPoll } from "../../api/poll";
import { useSDK } from "@metamask/sdk-react";
import { useQueryClient } from "@tanstack/react-query";
import { useGlobalContext } from "../../util/globalContext";

type VoteSectionProps = {
  poll: Poll;
};

export default function VoteSection({ poll }: VoteSectionProps) {
  const toast = useToast();
  const [choice, setChoice] = useState<string>();
  const [submitted, setSubmitted] = useState(false);
  const { account } = useSDK();
  const queryClient = useQueryClient();

  const { setShowConnectAccountModal } = useGlobalContext();

  const submitVote = async () => {
    setSubmitted(true);
    if (!choice) return;

    if (!account) {
      setShowConnectAccountModal(true);
      return;
    }

    const { success, error } = await voteOnPoll(
      poll.pollAddress,
      choice,
      account
    );
    if (!success) {
      const message = error.includes("Already voted")
        ? "You have already voted!"
        : "There was an error submitting your vote";
      toast({
        title: message,
        status: error.includes("Already voted") ? "warning" : "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Your vote has been submitted",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      queryClient.invalidateQueries({ queryKey: ["poll"] });
    }
  };

  const voteNotSelected = submitted && !choice;

  return (
    <div>
      <div className="flex justify-center gap-1">
        <ArrowDownIcon w={6} h={6} />
        <Heading size="md" className="mb-3">
          Share Your Opinion
        </Heading>
      </div>
      <FormControl isInvalid={voteNotSelected}>
        <RadioGroup onChange={setChoice} value={choice} className="mb-3">
          <Stack direction="column">
            {poll.options.map((option) => (
              <Radio size="lg" value={option}>
                {option}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
        {voteNotSelected && (
          <FormErrorMessage>Please select an option.</FormErrorMessage>
        )}
      </FormControl>
      <Button leftIcon={<CheckIcon />} colorScheme="blue" onClick={submitVote}>
        Vote
      </Button>
    </div>
  );
}
