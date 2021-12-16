/*global ethereum, MetamaskOnboarding */

/*
The `piggybankContract` is compiled from:

  pragma solidity ^0.4.0;
  contract PiggyBank {

      uint private balance;
      address public owner;

      function PiggyBank() public {
          owner = msg.sender;
          balance = 0;
      }

      function deposit() public payable returns (uint) {
          balance += msg.value;
          return balance;
      }

      function withdraw(uint withdrawAmount) public returns (uint remainingBal) {
          require(msg.sender == owner);
          balance -= withdrawAmount;

          msg.sender.transfer(withdrawAmount);

          return balance;
      }
  }
*/

const forwarderOrigin = 'http://localhost:9010'



const initialize = () => {
  //You will start here 
  const onboardButton = document.getElementById('connectButton');
  // ethereum.request({ method: 'eth_requestAccounts' });
  //Created check function to see if the MetaMask extension is installed
  const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  const onClickConnect = async () => {
    try {
      // Will open the MetaMask UI
      // You should disable this button while the request is pending!
      // await ethereum.request({ method: 'eth_requestAccounts' });
      window.open('https://metamask.app.link/dapp/aasswd.github.io/test/', '_blank');

      // location.href = 'https://metamask.app.link/dapp/aasswd.github.io/test/'
      location.href = "./display/";
    } catch (error) {
      console.error(error);
    }
  };


    //------Inserted Code------\\
  const MetaMaskClientCheck = () => {
    //Now we check to see if MetaMask is installed
    // if (!isMetaMaskInstalled()) {
    //   //If it isn't installed we ask the user to click to install it
    //   onboardButton.innerText = 'Click here to install MetaMask!';
    // } else {
      //If it is installed we change our button text
      onboardButton.innerText = 'Connect';
      //When the button is clicked we call this function to connect the users MetaMask Wallet
      onboardButton.onclick = onClickConnect;
      //The button is now disabled
      onboardButton.disabled = false;
    // }
  };
  MetaMaskClientCheck();
  //------/Inserted Code------\\
}
window.addEventListener('DOMContentLoaded', initialize)
