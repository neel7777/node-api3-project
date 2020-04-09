function validateUser(req, res, next) {
    // do your magic!
    if(!req.body) {
        res.status(400).json({
            message: "missing user data"
        })
    } else if (!req.body.name){
        res.status(400).json({
            message: "missing required text field"
        })
    } else {
        next();
    }
  }

  module.exports = validateUser;