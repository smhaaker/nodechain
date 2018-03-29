const SHA256 = require('crypto-js/sha256')
const Block = require('./block');
const fs = require('fs');

let dateTime = Date()
console.log('current time:' + dateTime)

// check if blockchain is already downloaded.

function fileExists(filePath)
{
    try
    {
      console.log('file')
      return fs.statSync(filePath).isFile();
    }
    catch (err)
    {
      console.log('no file')
      return false;
    }
}

fileExists('blockFile.json')

class Blockchain{
    constructor() {
        this.chain = [this.createGenesis()];
    }

    createGenesis() {
        return new Block(Date.now(), "Genesis block", "0")
    }

    latestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock){
        newBlock.previousHash = this.latestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    checkValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let chain = '';
chain = new Blockchain();
chain.addBlock(new Block(Date.now(), {data: 'Hello'}));

var obj = {
  table: []
};

var jsonFile = JSON.stringify(chain, null, 4);

console.log(jsonFile)

//fs.writeFile('blockFile.json', jsonFile, 'utf8');

fs.appendFile('blockFile.json', jsonFile, (err) => {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});
