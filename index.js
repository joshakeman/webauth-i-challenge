const express = require('express')
const bcrypt = require('bcryptjs')

const Users = require('./users/users-model')
const db = require('./data/dbConfig')

server = express()
server.use(express.json())

server.get('/', (req, res) => {
    res.send("Server it running")
})

server.post('/api/register', (req, res) => {
    let user = req.body;
    // check for username and password
  
    const hash = bcrypt.hashSync(user.password, 8); // 2^8 rounds <<<<<<<<<<<<
    // pass > hashit > hash > hashit > hash > hashit > hash
    user.password = hash; // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

server.listen(5000, () => {
    console.log(" ~~~ Server running on 5k bro ~~~ ")
})