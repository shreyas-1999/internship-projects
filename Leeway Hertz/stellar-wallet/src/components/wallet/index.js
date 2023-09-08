import React, {
  useState
} from "react";
import CopyKey from "./components/copy-key";
import Start from "./components/start";
import Main from "./components/main";

const Wallet = () => {

  // Key values
  const [secret, setSecret] = useState(localStorage.secret);
  const [publicKey, setPublicKey] = useState(localStorage.publicKey);
  // Flag to check if they already copied the private key
  const [isKeyCopied, setKeyCopied] = useState(localStorage.keyCopied);

  // Function to exit the account
  const resetAccount = () => {
    localStorage.removeItem("keyCopied");
    localStorage.removeItem("publicKey");
    localStorage.removeItem("secret");

    // With this, we send the user to the home view
    setKeyCopied(undefined);
    setSecret(undefined);
    setPublicKey(undefined);
  };

  // When leaving the account, we remove all session data
  if (!secret || !publicKey) {

    // In the home view, we will need access to the setters
    // to advance to the next views
    return ( <
      Start setSecret = {
        setSecret
      }
      setPublicKey = {
        setPublicKey
      }
      setKeyCopied = {
        setKeyCopied
      }
      />
    );
  } else if (!isKeyCopied) {

    // In the copy view, we need the secret to show it to the user,
    // also, we will use the public key to fund the account.
    // The setter will be to advance to the next view
    // and the reset to go back to the beginning
    return ( <
      CopyKey secret = {
        secret
      }
      publicKey = {
        publicKey
      }
      setKeyCopied = {
        setKeyCopied
      }
      resetAccount = {
        resetAccount
      }
      />
    );
  }


  // If you already have your keys, and you have already copied the secret, we start the wallet
  return ( <
    Main publicKey = {
      publicKey
    }
    secret = {
      secret
    }
    resetAccount = {
      resetAccount
    }
    />
  );
};

export default Wallet;