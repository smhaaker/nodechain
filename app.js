const path = require('path');
const fs = require('fs');
const express = require('express')
const app = express()
//const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require("body-parser");

const Blockchain = require('./chain.js')
const Block = require('./block');

// add conditional if new blockchain is needed or not
let nodechain = new Blockchain();
// new blockChain started
console.log('New chain running');

app.use(express.static(__dirname + '/WebExplorer/Style/'));

app.get('/', function(req, res) {
   res.sendFile(path.join(__dirname + '/WebExplorer/index.html'));
});

io.sockets.on('connection', function (socket){
  console.log('A user connected');
  socket.on('disconnect', function () {
     console.log('A user disconnected');
  });
  socket.emit('currentBlock', { message: 'current block: N/A'});
  let mine;
  socket.on('mine', function(data){
    mine = nodechain.addBlock(new Block(0, Date.now(), { data: data }));
    if(mine){
      console.log(mine);
    }
    //    console.log(nodechain.chain[nodechain.chain.length-1].index);
    /* CLEAN UP ARRAY INDEX */
    /* Make Thenable */
    socket.emit('currentBlock', { message: 'block number: ' + nodechain.chain[nodechain.chain.length-2].index + " " + nodechain.chain[nodechain.chain.length-1].previousHash});
    socket.emit('minedBlock', { message: 'block mined: ' + nodechain.chain[nodechain.chain.length-1].previousHash});
  });
  socket.on('viewBlocks', function(data){
    socket.emit('viewBlocks', { message: 'Latest Block: ' + nodechain.chain[nodechain.chain.length-1]});
  });

});

/*  curl requests */
// return all blocks
app.get('/blocks', (req, res) => res.send(JSON.stringify(nodechain.chain, null, 4)));
// gets blocks from the blockFile.json
// Save to blockFile later.
// app.get('/blocks', (req, res) => res.sendFile('./blockFile.json' , { root : __dirname}));
// mining new blocks via curl. as:
// curl localhost:3000/mine
app.get('/mine',function(req,res){
   console.log("mining new block! via Curl")
   // alter this to be able to send data and date in curl.
   // must also emit new event here so website updates.
   const newBlock = nodechain.addBlock(new Block(1, { amount: 4 }));
   res.send(newBlock);
});

http.listen(3000, () => {
   console.log('listening on *:3000');
});

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

//app.get('/mine', (req, res) => res.send(nodechain.addBlock(new Block(1, { amount: 4 }))))

// nodechain.addBlock(new Block(Date.now(), { amount: 4 }));

//nodechain.addBlock(new Block(Date.now(), { amount: 4 }));
//nodechain.addBlock(new Block(Date.now(), { data: 'blah' }));
//nodechain.addBlock(new Block(Date.now(), { data: 'Heh' }));
//nodechain.addBlock(new Block(Date.now(), { data: 'Coco' }));
