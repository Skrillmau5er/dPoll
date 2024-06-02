import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

type PollFormProps = {
  pollOptions: string[];
  setPollOptions: Dispatch<SetStateAction<string[]>>;
  submitted: boolean;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
};

function PollForm({
  pollOptions,
  setPollOptions,
  submitted,
  title,
  setTitle,
}: PollFormProps) {
  const MAX_POLL_OPTIONS = 4;
  const MIN_POLL_OPTIONS = 2;

  const addPollOption = () => {
    if (pollOptions.length >= MAX_POLL_OPTIONS) return;
    setPollOptions((prevState) => [...prevState, ""]);
  };

  const updatePollOption = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setPollOptions((prevState) => {
      const newState = [...prevState];
      newState[index] = e.target.value;
      return newState;
    });
  };

  const removePollOption = (index: number) => {
    if (pollOptions.length <= MIN_POLL_OPTIONS) return;

    setPollOptions((prevState) => {
      const newState = [...prevState];
      return newState.filter((_, ind) => index !== ind);
    });
  };

  return (
    <div>
      <FormControl
        className="mb-4 max-w-[600px]"
        isInvalid={!title && submitted}
      >
        <FormLabel>Title</FormLabel>
        <Input
          type="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {submitted && !title && (
          <FormErrorMessage>Title is required.</FormErrorMessage>
        )}
      </FormControl>
      <div className="flex items-center">
        <FormLabel>Poll Options</FormLabel>
        <Tooltip
          label={
            pollOptions.length >= MAX_POLL_OPTIONS
              ? `You can currently only have up to ${MAX_POLL_OPTIONS} poll options`
              : ""
          }
        >
          <IconButton
            isRound={true}
            icon={<AddIcon />}
            aria-label={"add option"}
            className="mb-2"
            onClick={addPollOption}
            isDisabled={pollOptions.length >= MAX_POLL_OPTIONS}
          />
        </Tooltip>
      </div>
      {pollOptions.map((option, index) => {
        return (
          <FormControl
            className="mb-4 max-w-[600px]"
            isInvalid={!option && submitted}
          >
            <div className="flex gap-4">
              <Input
                type="title"
                value={option}
                onChange={(e) => updatePollOption(e, index)}
              />
              <IconButton
                isRound={true}
                icon={<DeleteIcon />}
                aria-label={"delete option"}
                className="mb-2"
                onClick={() => removePollOption(index)}
                isDisabled={pollOptions.length <= MIN_POLL_OPTIONS}
              />
            </div>
            {!option && submitted && (
              <FormErrorMessage>
                Field can't be left blank. Either remove or fill
              </FormErrorMessage>
            )}
          </FormControl>
        );
      })}
    </div>
  );
}

export default PollForm;
