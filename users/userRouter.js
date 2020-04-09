const express = require('express');

const users = require('./userDb');

const posts = require('../posts/postDb');
const validateUserId=require('../middleware/validateUserId');
const validateUser=require('../middleware/validateUser');
const validatePost=require('../middleware/validatePost');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  users.insert(req.body)
  .then(user=>{
    res.status(201).json(user)
  })
  .catch(error=>{
    console.log(error);
    res.status(500).json({message: 'error creating new user'})
  })
});

router.post('/:id/posts', validatePost, validateUserId, (req, res) => {
  // do your magic!
  req.body.user_id = req.params.id;
  
  
  posts.insert(req.body)
  .then(posted=>{
    posts.getById(posted.id)
    .then(post=>{
      res.status(201).json(post)
    })
    .catch(error=>{
      console.log(error);
      res.status(500).json({message: 'error posting'})
    })
    
  })
  .catch(error=>{
    console.log(error)
    res.status(500).json({message: 'error making post'})
  })

});

router.get('/', (req, res) => {
  // do your magic!
  users.get()
  .then(user=> {
    res.status(200).json(user);
  })
  .catch(error=>{
    console.log(error);
    res.status(500).json({ message: 'error finding users'})
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  users.getById(id)
  .then(user=>{
    res.status(200).json(user);
  })
  .catch(error=>{
    console.log(error);
    res.status(500).json({message: 'error finding user'})
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  users.getUserPosts(req.params.id)
  .then(posts=>{
    res.status(200).json(posts)
  })
  .catch(error=>{
    console.log(error);
    res.status(500).json({message: 'error finding user posts'})
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  users.remove(req.params.id)
  .then(user=>{
    res.status(200).json({message: `This user was deleted`})
  })
  .catch(error=>{
    res.status(500).json({message: 'error deleting user'})
  })
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  users.update(id, req.body)
  .then(update=>{
    users.getById(id)
    .then(user=>{
      res.status(200).json(user)
    })
    .catch(error=>{
      res.status(500).json({message: 'error updating user'})
    })
  })
  .catch(error=>{
    res.status(500).json({message: 'error making change'})
  })
});

//custom middleware

// function validateUserId(req, res, next) {
//   // do your magic!
// }

// function validateUser(req, res, next) {
//   // do your magic!
// }

// function validatePost(req, res, next) {
//   // do your magic!
// }

module.exports = router;
