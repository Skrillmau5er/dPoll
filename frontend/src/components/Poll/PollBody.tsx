import { Heading, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import VotesVisualAid from "./VotesVisualAid";
import { useState } from "react";
import VoteSection from "./VoteSection";

type PollBodyProps = {
  poll: Poll;
};

export default function PollBody({ poll }: PollBodyProps) {
  return (
    <>
      <Heading className="mb-8" size="lg">
        {poll.title}
      </Heading>
      <VotesVisualAid poll={poll} />
      <VoteSection poll={poll} />
    </>
  );
}
