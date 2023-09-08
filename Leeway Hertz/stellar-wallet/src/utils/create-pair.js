// utils/create-pair.js
import StellarSdk from "stellar-sdk";

const pair = StellarSdk.Keypair.random();

// We create our pair of keys
const createTestAccount = () => {
  const secret = pair.secret();
  const publicKey = pair.publicKey();

  return {
    secret,
    publicKey
  };
};

// We request the activation of our account to the friendbot of stellar
const activeTestAccount = async publicKey => {
  const response = await fetch(
    `https://friendbot.stellar.org?addr=${publicKey}`
  );

  const responseJSON = await response.json();

  return responseJSON;
};

export { createTestAccount, activeTestAccount };
