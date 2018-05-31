const HDWalletProvider = require('truffle-hdwallet-provider');  //provider to get account from metamask mnemonics and unlock them
const Web3 = require('web3');
// const { interface, bytecode } = require('./compile');

const compiledFactory = require('./build/CampaignFactory.json');

//provide mnemonic to the HDWalletProvider
const provider = new HDWalletProvider(
  'one great chef youth crumble quality mandate wrap velvet shoulder attack apart',
  'https://rinkeby.infura.io/1UmrEF7w4woWdfq4P83H'  //this is an ethereum node on rinkeby network, network can also be hosted locally which could be difficult
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account ', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: '0x' + compiledFactory.bytecode })
    .send({ gas: '1000000', gasPrice: web3.utils.toWei('2', 'gwei'), from: accounts[0]})

  console.log('Contract deployed to', result.options.address);
};
deploy();
