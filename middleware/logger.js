function logger(req, res, next) {
    console.log(`${req.method} Request to ${req.originalUrl} at ${Date()}`);
  
    next();
}

module.exports = logger;