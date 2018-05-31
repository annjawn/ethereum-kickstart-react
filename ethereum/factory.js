import web3 from './web3';
import CampaignFacotry from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFacotry.interface),
  '0x73ad9A0531BCCf9636016360bF775bec1A6d1aDE'
);

export default instance;
