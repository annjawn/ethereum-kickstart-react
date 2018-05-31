import Web3 from 'web3';

//this will initialize a web3 instance with the metamask provider that Metamask injects on the browser
//"window" variable cannot be accessed using Next.js since Next does server side rendering and
//Node JS server has nothing known as "window". window is only available in the browser

let web3;

// check if it is browser and if the browser has Metamask installed
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
  //we are in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
} else {
  //We are NOT in the browser OR the user is not runnng Metamask

  //create own provider using Web3
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/1UmrEF7w4woWdfq4P83H'
  );

  web3 = new Web3(provider);
}

export default web3;
