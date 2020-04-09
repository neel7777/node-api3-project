function validatePost(req, res, next) {
    // do your magic!
    if (!req.body) {
        res.status(400).json({
            message: "missing post data"
        })
    } else if (!req.body.text) {
        res.status(400).json({
            message: "missing required name field"
        })
    } else {
        next();
    }
  }

  module.exports = validatePost;