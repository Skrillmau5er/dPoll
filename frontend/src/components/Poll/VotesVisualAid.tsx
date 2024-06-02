import { theme, Tooltip, Text } from "@chakra-ui/react";
import { useMemo } from "react";

type VotesVisualAidProps = {
  poll: Poll;
};

export default function VotesVisualAid({ poll }: VotesVisualAidProps) {
  const { colors } = theme;
  const cols = [
    colors.purple[500],
    colors.cyan[500],
    colors.green[500],
    colors.red[500],
    colors.blue[500],
  ];

  const votes = useMemo(() => {
    return poll.votes.map((vote) => {
      if (!isNaN(parseInt(vote))) {
        return parseInt(vote);
      }
      return 0;
    });
  }, [poll.votes]);

  const totalVotes = useMemo(
    () => votes.reduce((sum, vote) => (sum += vote), 0),
    [votes]
  );

  return (
    <div>
      <div className="flex justify-center mb-6 gap-6 flex-wrap">
        {poll.options.map((option, i) => {
          return (
            <div className="flex gap-2">
              <div
                className="w-[24px] h-[24px] rounded-xl"
                style={{ backgroundColor: cols[i] }}
              />
              <Text>{option}</Text>
            </div>
          );
        })}
      </div>
      <div className="w-full flex overflow-hidden h-10 rounded-lg mb-8">
        {totalVotes > 0 &&
          votes.map((vote, i) => {
            const percentage = ((vote / totalVotes) * 100).toFixed(2);
            const label = `${poll.options[i]} - ${vote} votes`;
            return (
              <Tooltip label={label} fontSize="md">
                <div
                  className="h-10"
                  style={{ width: `${percentage}%`, backgroundColor: cols[i] }}
                />
              </Tooltip>
            );
          })}
        {totalVotes === 0 && (
          <Tooltip label={"No votes yet."} fontSize="md">
            <div className="h-10 w-full bg-gray-300" />
          </Tooltip>
        )}
      </div>
    </div>
  );
}
