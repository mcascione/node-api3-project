const User = require('../users/users-model');
const Posts = require('../posts/posts-model');

function logger(req, res, next) {
  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`[${timestamp}] ${method} to ${url}`)
  next();
}

async function validateUserId(req, res, next) {
  try {
    const user = await User.getById(req.params.id);
    if(!user){
      res.status(404).json({
        message: "user not found"
      })
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
}

function validateUser(req, res, next) {
  const name = req.body.name;
  if(!name || typeof name !== 'string' || !name.trim().length){
    res.status(400).json({
      message: "missing required name field"
    })
  } else {
    req.user = name;
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  console.log('logger middlerware')
  next();
}

// do not forget to expose these functions to other modules
module.exports = {
  validateUserId, 
  logger,
  validateUser,
  validatePost
}