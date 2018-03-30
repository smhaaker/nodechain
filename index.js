const SHA256 = require('crypto-js/sha256')
const Block = require('./block');
const fs = require('fs');

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
nodechain.addBlock(new Block(1, Date.now(), { amount: 4 }));
nodechain.addBlock(new Block(2, Date.now(), { data: 'blah' }));
nodechain.addBlock(new Block(3, Date.now(), { data: 'Heh' }));
nodechain.addBlock(new Block(4, Date.now(), { data: 'Coco' }));

// Check if chain is valid (will return true)
console.log('Blockchain valid? ' + nodechain.isChainValid());

// Let's now manipulate the data
nodechain.chain[1].data = { amount: 100 };

// Check our chain again (will now return false)
console.log("Blockchain valid? " + nodechain.isChainValid());

// output some data
var jsonFile = JSON.stringify(nodechain, null, 4);
console.log(jsonFile)


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
