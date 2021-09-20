const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());

const {interface , bytecode} = require('../compile');


// mocha function
// 1. it => Run a test & make assertion
// 2. describe => Group together of it functions
// 3. beforeEach => Exceute some general setup

let accounts;
let contract;
beforeEach(async()=>{
    // Get list of all accounts
    accounts = await web3.eth.getAccounts();
    // Use one of the Account to deploy the contract
  contract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode , arguments:['Hello World!']})
    .send({from:accounts[0],gas:'1000000'});
});

describe('Deploye a Contract',()=>{
    it('Deployed Contract Success',()=>{
        // assert.ok(contract.options.address);
        console.log(contract)
    });

    it('Test for Initial Message',async ()=>{
        const message  = await contract.methods.message().call();
        assert.equal(message,'Hello World!');

    });

    it("Can Update Message?",async()=>{
        await contract.methods.setMessage('Bye!').send({from:accounts[0]});
        const message  = await contract.methods.message().call();
        assert.equal(message,'Bye!');
    });
})