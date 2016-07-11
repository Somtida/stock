'use strict';

const express = require('express');
const User = require('../models/user');

let router = express.Router();

//   users.js
//   /api/users

router.get('/profile', User.authMiddleware, (req, res) => {
  console.log('req.user:', req.user);
  res.send(req.user);
});

router.get('/', (req, res) => {
  // NOT FOR PRODUCTION - TESTING ONLY
  User.find({}, (err, users) => {
    if(err) return res.status(400).send(err);
    res.send(users);
  });
});

router.post('/register', (req, res) => {
  // Register a new user

  User.register(req.body, err => {
    res.status(err ? 400 : 200).send(err);
  });
});

router.post('/login', (req, res) => {
  // Authenticate a returning user

  User.authenticate(req.body, (err, user) => {
    console.log('err:', err);
    if(err) return res.status(400).send(err);

    let token = user.generateToken();

    res.cookie('authtoken', token).send(user);
  });
});

router.post('/logout', (req, res) => {
  res.clearCookie('authtoken').send();
});

router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, err => {
    res.status(err ? 400 : 200).send(err);
  });
});

router.delete('/', (req, res)=>{
  User.remove({},(err)=>{
    res.status(err ? 400 : 200).send(err);

  });

  })

router.put('/addStock/:userId',(req,res)=>{

  User.findById(req.params.userId, (err, User)=>{
    if(err || !User) return res.status(400).send(err || {error: 'User not found'});

    let stock = {
      symbol : req.body.symbol
    }
    User.stocks.push(stock);
    User.save((err, savedStock)=>{
      res.status(err ? 400 : 200).send(err || savedStock);
    })
  })
})


module.exports = router;
