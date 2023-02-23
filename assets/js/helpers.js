const saveMnemonic = (mnemonic) => {
  localStorage.setItem('mnemonic', mnemonic);
};

const getMnemonic = () => {
  return localStorage.getItem('mnemonic');
};

const saveEncryptedWallet = (wallet) => {
  localStorage.setItem('encWallet', wallet);
};

const getEncryptedWallet = () => {
  return localStorage.getItem('encWallet');
};

const savePrivateKey = (privateKey) => {
  localStorage.setItem('privateKey', privateKey);
};

const getPrivatekey = () => {
  return localStorage.getItem('privateKey');
};

const saveAddress = (address) => {
  localStorage.setItem('address', address);
};

const getAddress = () => {
  return localStorage.getItem('address');
};

const saveCurrentNetwork = (network) => {
  localStorage.setItem('currentNetwork', network);
};

const getCurrentNetwork = () => {
  return localStorage.getItem('currentNetwork');
};

const resetSendForm = () => {
  $('#inputSendToAddress').val('');
  $('#inputAmount').val('');
};

const resetPasscodeFields = () => {
  $('#inputPasscode').val('');
  $('#inputConfirmPasscode').val('');
  $('#inputVerifyPasscode').val('');
  $('#inputMnemonic').val('');
};

function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
    return false;
  return true;
}

const networks = [
  {
    name: 'localhost',
    url: 'http://localhost:8545',
    display: 'Local Network',
    default: true,
  },
  {
    name: 'rumsan',
    url: 'https://chain.esatya.io',
    display: 'Rumsan Network',
  },
  {
    name: 'mainnet',
    url: 'https://mainnet.infura.io/v3/ae22018377b14a61983be979df457b20',
    display: 'Mainnet (Ethereum)',
  },
  {
    name: 'rinkeby',
    url: 'https://goerli.infura.io/v3/ae22018377b14a61983be979df457b20',
    display: 'Rinkeby',
  },
];

const getDefaultNetwork = () => {
  return networks.find((d) => d.default);
};

const getNetworkByName = (name) => {
  if (!name) return getDefaultNetwork();
  return networks.find((d) => d.name === name);
};
