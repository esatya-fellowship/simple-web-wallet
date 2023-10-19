$(document).ready(function () {
  let passcode;
  resetSendForm();
  loadWallet();

  $("input[type=radio][name=network]").change(function () {
    saveCurrentNetwork(this.value);
    window.location.reload();
  });

  $("#inputPasscode").on("input", function (e) {
    const { value } = e.target;
    if (value.length === 6) {
      passcode = value;
      resetPasscodeFields();
      $("#passcodeComp").hide();
      $("#confirmPasscodeComp").removeAttr("style");
      $("#inputConfirmPasscode").focus();
    }
  });

  $("#inputConfirmPasscode").on("input", function (e) {
    const { value } = e.target;
    if (value.length === 6) {
      if (value === passcode) {
        $("#loading").html("Creating your wallet. Please wait...");
        $("#walletActionButtons").hide();
        togglePasscodeModal();
        return createWallet(value);
      }
      alert("Please type correct passcode!");
    }
  });

  $("#inputVerifyPasscode").on("input", function (e) {
    const { value } = e.target;
    if (value.length === 6) {
      passcode = value;
      toggleCheckPasscodeModal();
      toggleMnemonicRestoreModal();
    }
  });

  $("#btnSubmitMnemonic").on("click", function () {
    const phrase = $("#inputMnemonic").val();
    if (phrase.length < 10) {
      alert("Please enter your 12 word phrase");
      return;
    }
    toggleMnemonicRestoreModal();
    $("#loading").html("Restoring your wallet. Please wait...");
    $("#walletActionButtons").hide();
    return createWallet(passcode, phrase);
  });

  $("#btnSignMessage").on("click", function () {
    const message = $("#inputMsg").val();
    if (!message) {
      alert("Please enter message to sign");
      return;
    }
    signMessage(message);
  });
});

// ====================
const loadWallet = async () => {
  // Write code
  const wallet = getEncryptedWallet();
  const address = getAddress();
  const mnemonic = getMnemonic();
  if (wallet && address) {
    fetchBalance(address);
    $("#walletAddress").html(address);
    $("#mnemonicPhrase").html(mnemonic);
    $("#hasWallet").removeAttr("style");
  } else {
    $("#walletActionButtons").removeAttr("style");
  }
};

const createWallet = async (passcode, mnemonic) => {
  // Write code
  let wallet = getEncryptedWallet();
  if (wallet) return { wallet: null, encryptedWallet: wallet };
  if (mnemonic) wallet = ethers.Wallet.fromMnemonic(mnemonic);
  else wallet = ethers.Wallet.createRandom();
  console.log({ wallet });
  const { address, privateKey } = wallet;
  const { phrase } = wallet.mnemonic;
  const encWallet = await wallet.encrypt(passcode.toString());
  saveEncryptedWallet(encWallet);
  savePrivateKey(privateKey);
  saveAddress(address);
  saveMnemonic(phrase);
  window.location.reload();
};

const fetchBalance = (address) => {
  const currentNetwork = getCurrentNetwork();
  const network = getNetworkByName(currentNetwork);
  console.log({ network });
  const { url, name } = network;
  $("#" + name).attr("checked", true);

  const provider = new ethers.providers.JsonRpcProvider(url);

  provider
    .getBalance(address)
    .then((balance) => {
      console.log({ balance });
      const myBalance = ethers.utils.formatEther(balance);
      console.log(myBalance);
      $("#myBalance").html(myBalance);
    })
    .catch((err) => {
      console.log("ERR=>", err);
    });
};

const signMessage = async (message) => {
  try {
    // if (!message || message.trim() == "") {
    //   alert("Message should be a non-empty string");
    //   return;
    // }

    const wallet = await loadFromPrivateKey();
    const signature = await wallet.signMessage(message);
    $("#signedMessage").text(signature);
  } catch (error) {
    console.error("Error signing message", error);
    // alert("An error has occurred");
  }
};

const loadFromPrivateKey = async () => {
  // Write code
  const privateKey = getPrivatekey();
  let wallet = await new ethers.Wallet(privateKey);
  if (!wallet) throw Error("Wallet not found");
  const network = getNetworkByName();
  const { url } = network;
  const provider = new ethers.providers.JsonRpcProvider(url);

  wallet = wallet.connect(provider);
  return wallet;
};

const toggleCheckPasscodeModal = () => {
  resetPasscodeFields();
  $("#mdlCheckPasscode").modal("toggle");
};

const togglePasscodeModal = () => {
  resetPasscodeFields();
  $("#mdlPasscode").modal("toggle");
};

const toggleMnemonicRestoreModal = () => {
  $("#mdlMnemonicRestore").modal("toggle");
};
