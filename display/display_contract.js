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
    async function fetchAsync (url) {
        let response = await fetch(url);
        let data = await response.json();

        return data;
    }

    fetchAsync('https://shielded-sands-97623.herokuapp.com/').then(result => {
        var nftlist = document.getElementById('nft-list');
        for (var i = 0; i < result.length; i++)
        {
            var entry = document.createElement('LI');
            var img = document.createElement('img');
            img.src = result[i]
            entry.appendChild(img)
            nftlist.appendChild(entry);
        }
    });
    // $.ajax({
    //     type: 'GET',
    //     url: 'http://localhost:3000',
    //     success: function(response) {
    //         console.log(response);
    //     },
    //     error: function(xhr, status, err) {
    //         console.log(xhr.responseText);
    //     }
    // });



}
window.addEventListener('DOMContentLoaded', initialize)
