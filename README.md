# Nodechain

Experimental Node Js blockchain based on misc tutorials

Added WebSockets and WebExplorer to mine blocks after entering data as text.

To Start with Web Explorer and Curl options: node app.js
View at localhost:3000

To view current chain with Curl:
curl localhost:3000/blocks

Mine new block:
curl localhost:3000/mine

To Start a demo chain with 4 blocks added: node index.js

index.js is outdated, keeping around for demo purposes

Quick todos.

1. Folder Structure
2. Handling for blockFile.json so a new chain isnt create on every run
3. Add peer connections
4. Add accounts
5. Add instructions
