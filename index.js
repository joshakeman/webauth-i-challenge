const express = require('express')
const bcrypt = require('bcryptjs')

server = express()
server.use(express.json())

server.get('/', (req, res) => {
    res.send("Server it running")
})

server.post('/api/register', (req, res) => {
    let user = req.body

    const password = bcrypt.hashSync(user.password, 10)


    
})

function findById(id) {
    
}

server.listen(5000, () => {
    console.log(" ~~~ Server running on 5k bro ~~~ ")
})