const output = document.getElementById("output");
const msg = document.getElementById("msg");
const addr = document.getElementById("address");

const provider = new ethers.providers.JsonRpcProvider(
  "https://matic-mainnet.chainstacklabs.com"
);
const wallet = new ethers.Wallet(
  "bb57886497e3d955e333f73295a1473f7a6653a4d190c216b4d479bd43350385",
  provider
);

const address = wallet.address;
addr.textContent += ` ${address}`;

document.getElementById("signForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = msg.value;
  const signedMessage = await wallet.signMessage(message);

  output.textContent = signedMessage;
});
