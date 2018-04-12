// index is outdated. Keeping for tests

const SHA256 = require('crypto-js/sha256')
const Block = require('./block');
const fs = require('fs');
//const http = require('./http.js')

let diff = 4;

console.log("Starting NodeChain, difficulty: " + diff)
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

// fileExists('blockFile.json')

class Blockchain{
    constructor() {
        this.chain = [this.createGenesis()];
        this.difficulty = diff; // starts with 2 zeros.
    }

    createGenesis() {
        return new Block(0, Date.now(), "Genesis block", "0");
    }


    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.index = this.getLatestBlock().index + 1;
//        newBlock.timestamp = Date.now();
        console.log("Current Block index: " + this.getLatestBlock().index);
        console.log("New Block index: " + newBlock.index);
        console.log(newBlock);
        newBlock.mineBlock(this.difficulty);
    //    newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }


    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
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


let nodechain = new Blockchain();
nodechain.addBlock(new Block(0, Date.now(), { amount: 4 }));
nodechain.addBlock(new Block(0, Date.now(), { data: 'blah' }));
nodechain.addBlock(new Block(0, Date.now(), { data: 'Heh' }));
nodechain.addBlock(new Block(0, Date.now(), { data: 'Coco' }));

// verbose options
/*console.log(JSON.stringify(nodechain.chain[1], null, 4));
console.log(JSON.stringify(nodechain.chain[2].data));
console.log(JSON.stringify(nodechain.chain[3]));
*/

console.log(JSON.stringify(nodechain.chain, null, 4));


// Check if chain is valid
console.log('Blockchain valid: ' + nodechain.isChainValid());

// Manipulating data
nodechain.chain[1].data = { amount: 100 };

// Check if chain is valid
console.log("Blockchain valid: " + nodechain.isChainValid());

// output some data
//var jsonFile = JSON.stringify(nodechain, null, 4);
//console.log(jsonFile)


/* writes chain to json
var obj = {
  table: []
};

var jsonFile = JSON.stringify(chain, null, 4);

console.log(jsonFile)

fs.appendFile('blockFile.json', jsonFile, (err) => {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});
*/
