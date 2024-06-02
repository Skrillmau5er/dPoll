import { Heading } from "@chakra-ui/react";
import { getPolls } from "../../api/poll";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import PollList from "./PollList";
import { EmailIcon } from "@chakra-ui/icons";

function Polls() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["polls"],
    queryFn: getPolls,
  });

  return (
    <div className="max-w-[600px] w-full">
      <div className="flex justify-center gap-3 items-center mb-4">
        <EmailIcon w={8} h={8} />
        <Heading>Polls</Heading>
      </div>
      {isLoading && <Loading />}
      {data && <PollList polls={data} />}
    </div>
  );
}

export default Polls;
