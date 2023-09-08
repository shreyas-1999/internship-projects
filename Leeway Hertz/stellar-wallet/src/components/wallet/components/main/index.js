import React, { useEffect, useState } from "react";
import { loadAccount } from "../../../../utils/load-account";
import AccountData from "./components/account-data";
import SendTransaction from "./components/send-transaction";
import BalanceChecker from "./components/balance-checker";
import { Box, Button, Stack, Text, Divider } from "@chakra-ui/core";

const Main = ({ publicKey, secret, resetAccount }) => {
 
// Status of the application with laBill
  const [account, setAccount] = useState(undefined);

  
// Function to update the wallet
  const updateAccount = () => {
    const getData = async () => {
      const account = await loadAccount(publicKey);
      setAccount(account);
    };

    getData();
  };

 
// Use effect runs only when you open the main view
// So it will be used to load the Bill at startup
  useEffect(updateAccount, [publicKey]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100%"
      maxWidth="48rem"
      borderWidth="1px"
      p={6}
    >
      <Stack width="100%" maxWidth="48rem" justifyContent="center">
        <AccountData account={account} publicKey={publicKey} />
        <SendTransaction secret={secret} updateAccount={updateAccount} />
        <BalanceChecker />
        <Divider my={10} />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          
          <Button onClick={resetAccount}  alignItems="center" variantColor="red">
            LOGOUT
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Main;
