const SHA256 = require('crypto-js/sha256')
const Block = require('./block');
const fs = require('fs');

// sets difficulty
let diff = 4;

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
        console.log("Current Block index: " + this.getLatestBlock().index);
        console.log("New Block index: " + newBlock.index);

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
module.exports = Blockchain;
