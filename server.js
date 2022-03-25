const express = require('express');
const bodyParser = require('body-parser');

// Creates app by running express
const app = express();

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
  ]
}

app.get('/', (req, res) => {
  res.send(database.users);
})

// Signin
app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password) {
    res.json('success')
  } else {
    res.status(400).json('error logging in');
  }
})

// Register
app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  database.users.push({
    id: '3',
    name: name,
    email: email,
    password: password,
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
