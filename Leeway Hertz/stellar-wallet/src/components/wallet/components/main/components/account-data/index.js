import React from "react";
import {
  Text,
  InputGroup,
  Input,
  InputRightElement,
  InputLeftAddon,
  InputRightAddon,
  Button,
  useClipboard
} from "@chakra-ui/core";

const AccountData = ({ publicKey, account }) => {
  
// This function will help us to Copy using the clipboard
  const { onCopy, hasCopied } = useClipboard(publicKey);

  return (
    <>
      <Text textAlign="center" fontSize="xl">
      Public key

      </Text>
      <InputGroup mt={2}>
        <Input readOnly pr="4.5rem" value={publicKey} />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={onCopy}>
            {hasCopied ? "Copied" : "Copy"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Text mt={10} textAlign="center" fontSize="xl">
      Account Balance
      </Text>
      {account?.balances.map(({ balance, asset_type }, index) => (
        <InputGroup mt={2} key={index}>
          <InputLeftAddon>
            Number: {index}</InputLeftAddon>
          <Input roundedLeft="0" roundRight="0" readOnly value={balance} />
          <InputRightAddon>XLM</InputRightAddon>
          <InputRightAddon>Type: {asset_type}</InputRightAddon>
        </InputGroup>
      ))}
    </>
  );
};

export default AccountData;
