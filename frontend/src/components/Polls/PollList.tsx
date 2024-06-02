import { Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type PollListProps = {
  polls: Poll[];
};

export default function PollList({ polls }: PollListProps) {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col">
      {polls.map(({ title, options, pollAddress }, index) => (
        <>
          <button
            className="transition duration-300 ease-in-out btn-reset w-full p-4 hover:bg-gray-100"
            onClick={() => navigate(`/poll/${pollAddress}`)}
          >
            <Heading size="md">{title}</Heading>
            <div className="flex gap-3 justify-center items-center w-full overflow-hidden text-ellipsis">
              {options.map((option, index) => (
                <>
                  <Text className="text-nowrap text-ellipsis overflow-hidden">
                    {option}
                  </Text>
                  {index !== options.length - 1 && <span>|</span>}
                </>
              ))}
            </div>
          </button>
          {index !== polls.length - 1 && (
            <span className="w-full border-b border-gray-30" />
          )}
        </>
      ))}
    </div>
  );
}
