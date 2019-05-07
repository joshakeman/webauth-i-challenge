const express = require('express')
const bcrypt = require('bcryptjs')
const restricted = require('./auth/restricted-middleware')
const session = require('express-session'); 


const Users = require('./users/users-model')
const db = require('./data/dbConfig')

const sessionConfig = {
  name: 'monster', 
  secret: 'keep it secret, keep it safe! -gandalf',
  cookie: {
    httpOnly: true, 
    maxAge: 1000 * 60 * 2,
    secure: false, 
  },
  resave: false, 
  saveUninitialized: true,
};

server = express()
server.use(express.json())
server.use(session(sessionConfig));


server.get('/', (req, res) => {
    const username = req.session.username || 'stranger';
    res.send(`Hello ${username}!`);

})

server.post('/api/register', (req, res) => {
    let user = req.body; 
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash; 
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  server.post('/api/login', (req, res) => {
    let { name, password } = req.body
  
    Users.findBy({ name })
      .first()
      .then(user => {
          if (user && bcrypt.compareSync(password, user.password)) {
              req.session.name = user.name

              res.status(200).json({ message: 'Logged In'})
          } else {
              res.status(401).json({ message: 'You shall not pass!'} )
          }
      })
  });

  server.get('/api/users', restricted, (req, res) => {
      Users.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => res.send(err))
  })

server.listen(5000, () => {
    console.log(" ~~~ Server running on 5k bro ~~~ ")
})