const express = require('express')

server = express()
server.use(express.json())

server.get('/', (req, res) => {
    res.send("Server it running")
})

server.listen(5000, () => {
    console.log(" ~~~ Server running on 5k bro ~~~ ")
})