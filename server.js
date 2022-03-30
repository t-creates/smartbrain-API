const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

// Creates app by running express
const app = express();

// Cors a middlewawre for sending data between server and frontend
app.use(cors());

// for body-parser to work
app.use(bodyParser.json());

// Temporary Database
const database = {
  users: [
    {
      id: '1',
      name: 'Doug',
      email: 'doug@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '2',
      name: 'Karen',
      email: 'karen@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: '987',
      hash: '',
      email: 'doug@gmail.com'
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.users);
})

// Signin
app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password) {
    res.json(database.users[0])
  } else {
    res.status(400).json('Error With Login');
  }
})

// Register
app.post('/register', (req, res) => {
  const { email, name } = req.body;
  database.users.push({
    id: '3',
    name: name,
    email: email,
    entries: 0,
    joined: new Date()
  })
  // Grabs last user in the array & Always need a response
  res.json(database.users[database.users.length - 1])
})

// Get method for gettting /profile and ID --> /profile/2
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  })
  if (!found) {
    res.status(404).json('User not found');
  }
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  })
  if (!found) {
    res.status(404).json('User not found');
  }
})

// Always send sensitive info through https in a POST body 
// POST requests are never cached, request will not remain in the browser history
// No restriction on data length

// becrypt hash for password protection
// bcrypt.hash("bacon", null, null, function(err, hash) {
//   // Store hash in your password DB.
// });

// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//   // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//   // res = false
// });

app.listen(3000, () => {
  console.log('App is running on port 3000');
});


/* Planning
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user 
/image --> PUT --> user

*/
