import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useGlobalContext } from "../../util/globalContext";
import { useSDK } from "@metamask/sdk-react";

export default function AccountSignInModal() {
  const { showConnectAccountModal, setShowConnectAccountModal } =
    useGlobalContext();
  const { sdk } = useSDK();

  const onClose = () => {
    setShowConnectAccountModal(false);
  };

  const connect = async () => {
    try {
      await sdk?.connect();
      setShowConnectAccountModal(false);
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };

  return (
    <Modal isOpen={showConnectAccountModal} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Connect to Metamask</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Please connect an account with Metamask to continue.</Text>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" colorScheme="blue" onClick={connect}>
            Connect
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
