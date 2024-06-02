import {
  Popover,
  PopoverTrigger,
  Button,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { useSDK } from "@metamask/sdk-react";

export default function AccountMenu() {
  const { account, connected, sdk } = useSDK();
  const toast = useToast();

  const disconnect = async () => {
    try {
      await sdk?.disconnect();
    } catch (err) {
      console.warn("Failed to disconnect..", err);
      toast({
        title: "Failed to disconnect account",
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const connect = async () => {
    try {
      console.log("here");
      await sdk?.connect();
    } catch (err) {
      console.warn("Failed to connect..", err);
      toast({
        title: "Failed to connect account",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Popover closeOnBlur>
      <PopoverTrigger>
        <Avatar as="button" bg="blue.400" size="sm" />
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader className="text-nowrap overflow-hidden text-ellipsis">
            Account {account ? account : "not connected"}
          </PopoverHeader>
          <PopoverBody>
            <Button
              colorScheme="blue"
              className="w-full"
              onClick={connected ? disconnect : connect}
            >
              {connected ? "Disconnect Account" : "Connect Account"}
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
