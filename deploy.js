const hdwalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new hdwalletProvider(
  "monkey resist bubble tuna spoon often meat believe broom lecture viable piece",
  "https://rinkeby.infura.io/v3/3a5458f95d8748d08fc965ae47e5886c"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attemp to Deploying Contract", accounts[0]);
  const contract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({
      from: accounts[0],
      gas:'1000000'
    });
  console.log("Contract Deployed To:", contract.options.address);
};
deploy();
