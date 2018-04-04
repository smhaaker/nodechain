const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('NodeChain Explorer'))

app.listen(3000, () => console.log('NodeChain Explorer listening on port 3000!'))
//app.get('/blocks', (req, res) => res.send(nodechain));
app.get('/blocks', (req, res) => res.sendFile('./blockFile.json' , { root : __dirname}));
