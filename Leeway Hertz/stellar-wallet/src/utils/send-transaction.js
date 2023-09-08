import StellarSdk from "stellar-sdk";

const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

const sendTransaction = async (secret, destination, amount) => {
  try {
    const sourceKeys = StellarSdk.Keypair.fromSecret(secret);
   
    // We check that the account exists to avoid errors
    // and unnecessary commission charges
    await server.loadAccount(destination);
    const sourceAccount = await server.loadAccount(sourceKeys.publicKey());

   
    // We set up the transaction
    const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination,
          // Since Stellar allows transactions in different
          // exchange rates, you must specify the currency in which you will send
          // The type "native" refers to Lumens (XLM)
          asset: StellarSdk.Asset.native(),
          amount
        })
      )
      // Wait a maximum of three minutes for the transaction
      .setTimeout(180)
      .build();

   
    transaction.sign(sourceKeys);
    const result = await server.submitTransaction(transaction);

    return result;
  } catch (err) {
    console.error("An error has occurred", err);
  }
};

export { sendTransaction };
