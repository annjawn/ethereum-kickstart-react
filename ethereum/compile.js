const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname,'build');

//remove the build folder if any
fs.removeSync(buildPath);

//get the contracts directory
const campaignPath = path.resolve(__dirname,'contracts','campaign.sol');

//read the contract file
const source = fs.readFileSync(campaignPath,'utf8');

//pass the contract content to solidity compiler to compile
const output = solc.compile(source,1).contracts;

//check if Build directory exists if not create it
fs.ensureDirSync(buildPath);

for (let contract in output){
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':','') + '.json'),  //create file in the Build path
    output[contract]    //the contract key (Campaign, CampaignFactory) from the json data
  );
}
