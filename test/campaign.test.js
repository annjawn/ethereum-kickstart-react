const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');


let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  //deploy the campaign factory contract
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000'})
  factory.setProvider(provider);

  //deploye a campaign contract using the campaign factory
  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: '1000000'
  });

  //this assigns the first element of the returned array to campaignAddress
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call()

  //fetch the deployed contract
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
});

describe('Campaigns', () => {
  it('deploys a factory and a campaign', () => {
    //check if both contracts are deployed
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  })

  it('marks caller as campaign manager', async () => {
    //check if the contract creator is the manager
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it('allows people to contribute money and marks them as approvers', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: '200'
    });
    //check if user contribution is recorded
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert.ok(isContributor);
  });

  it('requires a minimum contribution', async () => {
    try{
      //check if lower than minimum contribution fails
      await campaign.methods.contribute().send({
        from: accounts[1],
        value: '99'
      });
      assert(false)
    }catch (err){
      assert(err);
    }
  });

  it('allows a manager to make a payment request', async () => {
    await campaign.methods.createRequest(
      'Battery Purchase',
      '100',
      accounts[3]
    ).send({
      from: accounts[0],
      gas: '1000000'
    });

    const req = await campaign.methods.requests(0).call();
    console.log(req.description);
    assert.equal('Battery Purchase', req.description);
  });

  it('processes request', async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10','ether')
    });

    await campaign.methods.createRequest(
      'Request 1',
      web3.utils.toWei('5','ether'),
      accounts[1]
    ).send({
      from: accounts[0],
      gas: '1000000'
    });

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance,'ether');
    balance = parseFloat(balance);
    console.log(balance);
    assert(balance > 100)
  });
});
