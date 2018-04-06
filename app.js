const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const Blockchain = require('./chain.js')
const Block = require('./block');
const path = require('path');

// add conditional if new blockchain is needed or not
let nodechain = new Blockchain();
// new blockChain started
console.log('New chain running');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/WebExplorer/index.html')));


//res.send('NodeChain Explorer'))


app.listen(3000, () => console.log('NodeChain Explorer listening on port 3000!'))

app.get('/blocks', (req, res) => res.send(JSON.stringify(nodechain.chain, null, 4)));
//console.log(JSON.stringify(nodechain.chain, null, 4));

// gets blocks from the blockFile.json
// Save to blockFile later.
//app.get('/blocks', (req, res) => res.sendFile('./blockFile.json' , { root : __dirname}));

//app.get('/mine', (req, res) => res.send(nodechain.addBlock(new Block(1, { amount: 4 }))))

app.get('/mine',function(req,res){
   console.log("mining new block! via web")
   const newBlock = nodechain.addBlock(new Block(1, { amount: 4 }));
   res.send(newBlock);
});


// app.post('/mine',function(req,res){
//   const newBlock = nodechain.addBlock(new Block(1, { amount: 4 }));
//   res.send(newBlock);
// });

// nodechain.addBlock(new Block(Date.now(), { amount: 4 }));

//nodechain.addBlock(new Block(Date.now(), { amount: 4 }));
//nodechain.addBlock(new Block(Date.now(), { data: 'blah' }));
//nodechain.addBlock(new Block(Date.now(), { data: 'Heh' }));
//nodechain.addBlock(new Block(Date.now(), { data: 'Coco' }));
