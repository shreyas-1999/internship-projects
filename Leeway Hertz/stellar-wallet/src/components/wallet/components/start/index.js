import React, { useState } from "react";
import StellarSdk from "stellar-sdk";
import {
  Heading,
  Text,
  Button,
  InputGroup,
  Input,
  useToast,
} from "@chakra-ui/core";

import {
  FormLabel,
 
} from "@chakra-ui/core";
import { createTestAccount } from "../../../../utils/create-pair";
const Start = ({ setPublicKey, setSecret, setKeyCopied }) => {
  
// This element is used to create notifications
  const toast = useToast();

 
// Value of the secret to import
  const [secretToImport, setSecretToImport] = useState("");

  const createAccount = () => {
    const keys = createTestAccount();

   // We save the keys in the session
    localStorage.setItem("secret", keys.secret);
    localStorage.setItem("publicKey", keys.publicKey);
   
// We update the view and go to copy
    setPublicKey(keys.publicKey);
    setSecret(keys.secret);
  };

  
// Function to import an account from the secret
  const importAccount = () => {
    if (secretToImport.length === 56) {
      const sourceKeys = StellarSdk.Keypair.fromSecret(secretToImport);

      localStorage.setItem("secret", secretToImport);
      localStorage.setItem("publicKey", sourceKeys.publicKey());
      localStorage.setItem("keyCopied", true);

      setPublicKey(sourceKeys.publicKey());
      setSecret(secretToImport);
      setKeyCopied(true);
    } else {
      toast({
        title: "Error",
        description: "Make sure your secret key is correct ",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
    
      <Heading> Welcome to the Stellar Wallet</Heading>
      <FormLabel fontSize="xl">Create your stellar account with a click </FormLabel>{" "}
      <Button onClick={createAccount} size="lg" variantColor="blue" mt="24px">
        Create Account{" "}
      </Button>{" "}
      <Text> OR </Text>{" "}
  <FormLabel fontSize="xl" >Import Existing Account using Secret Key</FormLabel>
      
      <Text>  </Text>{" "}
      <InputGroup>
        <Input
          onChange={({ target: { value } }) => setSecretToImport(value)}
          value={secretToImport}
          placeholder="Enter Secret Key"
          roundRight="0"
        />
      </InputGroup>{" "}
      <Button onClick={importAccount}size="lg" variantColor="green" mt="24px">
       Import{" "}
      </Button>{" "}
      
    </>
    
  );
};

export default Start;
