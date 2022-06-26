import {
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { useWeb3Transfer } from "react-moralis";
import Container from "./Container";
import moralis from "moralis";

const Send: React.FC<{}> = () => {
  const [amount, setAmount] = useState(0);
  const [receiver, setReceiver] = useState("");

  const { fetch, isFetching } = useWeb3Transfer({
    amount: moralis.Units.ETH(amount),
    receiver,
    type: "native",
  });

  const toast = useToast();

  const handleAmountChange = useCallback(
    ({ target }) => {
      setAmount(target.value);
    },
    [setAmount]
  );

  const handleReceiverChange = useCallback(({ target }) => {
    setReceiver(target.value);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      await moralis.enableWeb3();

      fetch({
        onSuccess: () => {
          toast({
            title: "ETH successfully sent!",
            description:
              "Transaction initiated. Sent tokens will be available in the receiver's account after completion",
            status: "success",
            duration: 9000,
            isClosable: true,
          });

          setReceiver("0");
        },
        onError: (error: Error | string) => {
          toast({
            title: "Error!",
            description: error instanceof Error ? error.message : error,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        },
      });
    },
    [fetch, toast]
  );

  return (
    <Container>
      <Text fontSize="xl" fontWeight="bold">
        Send ETH
      </Text>
      <form onSubmit={handleSubmit}>
        <FormControl mt="4">
          <FormLabel htmlFor="amount">Amount of ETH</FormLabel>
          <NumberInput step={0.1}>
            <NumberInputField
              id="amount"
              value={amount}
              onChange={handleAmountChange}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl mt="4">
          <FormLabel htmlFor="receiver">Send to</FormLabel>
          <Input
            id="receiver"
            type="text"
            placeholder="Receiver address"
            value={receiver}
            onChange={handleReceiverChange}
          />
        </FormControl>
        <Button mt="4" type="submit" colorScheme="purple" disabled={isFetching}>
          Send
        </Button>
      </form>
    </Container>
  );
};

export default Send;
