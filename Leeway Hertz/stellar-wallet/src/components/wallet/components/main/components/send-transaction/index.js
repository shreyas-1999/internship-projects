import React, { useState } from "react";
import { sendTransaction } from "../../../../../../utils/send-transaction";
import {
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputGroup,
  Input,
  InputLeftAddon,
  Button,
  Divider,
  useToast
} from "@chakra-ui/core";

const SendTransaction = ({ secret, updateAccount }) => {
  
// This element is used to create notifications
  const toast = useToast();

 // Destination address and quantity
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState();

  // Function to send XLM to a recipient
  const sendXLM = async () => {
  // We validate the inputs
    if (destination.length === 56 && amount > 0) {
      try {
        
        const result = await sendTransaction(
          secret,
          destination,
          amount.toString()
        );
        toast({
          title: `XLM SENT: ${amount} XLM`,
          description: `Transaction Hash: ${result.hash}`,
          status: "success",
          duration: 9000,
          isClosable: true
        });
      // We update the account so that it is reflected in our balance
        updateAccount();
      } catch (err) {
       
        toast({
          title: "An Error has occured",
          description: err.message,
          status: "error",
          duration: 9000,
          isClosable: true
        });
      }
    } else {
    
// If the account is invalid or you try to send less than 0, you have to notify
      toast({
        title: `Invalid Data`,
        description:"Make sure you enter a correct address and send a valid amount",
        status: "error",
        duration: 9000,
        isClosable: true
      });
    }
  };

  return (
    <>
      <Divider my={10} />
      <Text textAlign="center" fontSize="xl">
       Transaction
      </Text>
      <NumberInput
        step="0.001"
        mt={2}
        value={amount}
        onChange={value => setAmount(value)}
      >
        <InputLeftAddon>XLM</InputLeftAddon>
        <NumberInputField roundLeft="0" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <InputGroup mt={2}>
        <Input
          onChange={({ target: { value } }) => setDestination(value)}
          value={destination}
          placeholder="Destination Account"
          roundRight="0"
        />
      </InputGroup>
      <Button mt={2} onClick={sendXLM} variantColor="blue">
        SEND
      </Button>
    </>
  );
};

export default SendTransaction;
