const path = require('path');
const fs = require('fs');
const inboxPath = path.resolve(__dirname,'contracts','Inbox.sol');
const solc = require('solc');

const source = fs.readFileSync(inboxPath,'utf-8');
 
module.exports = solc.compile(source,1).contracts[':Inbox'];
 