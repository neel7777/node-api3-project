const users = require('../users/userDb');

function validateUserId(req, res, next) {
    // do your magic!
    const { id } = req.params;
    users.getById(id)
    .then(user=>{
        if (user) {
            user = req.user;
            next();
        }
        else {
            res.status(400).json({message: 'invalid user id'})
        }
    })
    
  }

  module.exports = validateUserId;