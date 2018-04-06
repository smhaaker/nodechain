const express = require('express')
const app = express()
const Blockchain = require('./chain.js')
const Block = require('./block');


app.get('/', (req, res) => res.send('NodeChain Explorer'))

app.listen(3000, () => console.log('NodeChain Explorer listening on port 3000!'))
//app.get('/blocks', (req, res) => res.send(nodechain));

// gets blocks from the blockFile.json
app.get('/blocks', (req, res) => res.sendFile('./blockFile.json' , { root : __dirname}));

app.post('/mineBlock', (req, res) => {
    nodechain.addBlock(new Block(Date.now(), { amount: 4 }));
    const newBlock: Block = generateNextBlock(req.body.data);
    res.send(newBlock);
});

//nodechain.addBlock(new Block(Date.now(), { amount: 4 }));
