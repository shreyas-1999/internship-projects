import StellarSdk from "stellar-sdk";
const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

const loadAccount = async publicKey => {
  const account = await server.loadAccount(publicKey);

// We load the account through Stellar's sdk
  return account;
};

export { loadAccount };
