const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

// Controller imports
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    // port: 3306,
    user: 'travisgeislinger',
    password: '',
    database: 'smartbrain'
  }
});

// Creates app by running express
const app = express();

// Cors a middlewawre for sending data between server and frontend
app.use(cors());

// for body-parser to work
app.use(bodyParser.json());


app.get('/', (req, res) => { res.send('Success') });

// Signin
app.post('/signin', signin.handleSignin(db, bcrypt));

// Register
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

// Get method for gettting /profile and ID --> /profile/2
app.get('/profile/:id', (req, res) => { profile.handleGetProfileGet(req, res, db) });

// Updates entries and increases the count
app.put('/image', (req, res) => { image.handleImage(req, res, db) });

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
