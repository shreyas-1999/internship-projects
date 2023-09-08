import React from "react";
import { activeTestAccount } from "../../../../utils/create-pair";
import {
  Stack,
  Alert,
  AlertIcon,
  Text,
  Box,
  Button,
  useClipboard,
  Input,
  InputGroup,
  InputRightElement,
  useToast
} from "@chakra-ui/core";
// theme 

const CopyKey = ({ publicKey, secret, setKeyCopied, resetAccount }) => {
  // This element is used to create notifications
  const toast = useToast();
  
// This function will help us to COPY using the clipboard
  const { onCopy, hasCopied } = useClipboard(secret);

// Function to pass the state LOGIN and advance to the main view
  const handleCopied = async () => {
    localStorage.setItem("keyCopied", true);
  
    const { hash } = await activeTestAccount(publicKey);
    toast({
      title: "Account Created Successfully",
      description: `Transaction Hash: ${hash}`,
      status: "success",
      duration: 4000,
      isClosable: true
    });
    setKeyCopied(true);
  };
  return (
    <>
 
    <Box borderWidth="1px" p={6}>
      <Stack width="100%" maxWidth="48rem" justifyContent="center">
        <Alert status="warning">
          <AlertIcon />
          <Text>
          Before continuing, keep your secret Key in a private place, otherwise you will not be able to return to your account.
          </Text>
        </Alert>
        <InputGroup>
          <Input readOnly pr="4.5rem" value={secret} />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={onCopy}>
              {hasCopied ? "Copied" : "COPY"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Box display="flex" justifyContent="space-between">
          <Button onClick={resetAccount}variantColor="green">REGISTER</Button>
          <Button onClick={handleCopied} variantColor="blue">
           LOGIN
          </Button>
        </Box>
      </Stack>
    </Box>
  
    </>
  );
};

export default CopyKey;
