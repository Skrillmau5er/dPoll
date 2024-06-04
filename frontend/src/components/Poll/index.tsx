import { Heading, useToast, Text, Button } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { getPoll } from "../../api/poll";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Polls/Loading";
import PollBody from "./PollBody";
import { useEffect } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function Poll() {
  const { pollAddress } = useParams<{ pollAddress: string }>();
  const toast = useToast();

  const { isLoading, error, data } = useQuery({
    queryKey: ["poll"],
    queryFn: () => getPoll(pollAddress as string),
    enabled: !!pollAddress,
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error getting poll information",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [error]);

  return (
    <div className="max-w-[600px] w-full">
      <Button
        leftIcon={<ArrowBackIcon />}
        className="!absolute left-4 top-[75px]"
        colorScheme="blue"
        variant="ghost"
        as={Link}
        to="/polls"
      >
        Back to All Polls
      </Button>
      {isLoading && <Loading />}
      {!isLoading && data && <PollBody poll={data} />}
    </div>
  );
}
