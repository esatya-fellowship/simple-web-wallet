const output = document.getElementById("output");
const msg = document.getElementById("msg");
const addr = document.getElementById("address");

// Check if MetaMask is installed and connected
if (typeof window.ethereum !== 'undefined') {
  // Request access to the user's MetaMask account
  window.ethereum.request({ method: 'eth_requestAccounts' })
    .then(function (accounts) {
      // Use the first account provided by MetaMask
      const address = accounts[0];
      addr.textContent += ` ${address}`;

      // Add an event listener to sign a message when the form is submitted
      document.getElementById("signForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const message = msg.value;
        try {
          // Use MetaMask's Ethereum provider to sign the message
          const signature = await window.ethereum.request({
            method: 'personal_sign',
            params: [message, address],
          });
          output.textContent = signature; // Display the signed message
        } catch (error) {
          output.textContent = `Error: ${error.message}`;
        }
      });
    })
    .catch(function (error) {
      console.error(error);
    });
} else {
  output.textContent = "MetaMask not detected. Please install MetaMask to use this wallet.";
}
