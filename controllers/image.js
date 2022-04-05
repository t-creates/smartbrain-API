// Clarifai 
const Clarifai = require('clarifai');
// const { json } = require('express/lib/response');

// API
const app = new Clarifai.App({
  apiKey: '44568a297a0f4119b0f6e64d93aec392'
});

// API Call
const handleAPICall = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('Unable to work with API'))
}

// Image Update
const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('Not Able To Get Entries'))
}

module.exports = {
  handleImage: handleImage,
  handleAPICall: handleAPICall
}
