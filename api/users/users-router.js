const express = require("express");
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');
const User = require('./users-model');
const Posts = require('../posts/posts-model');
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get("/", (req, res, next) => {
  User.get()
  .then((users) => {
    res.status(200).json(users)
  })
  .catch(next)
});

router.get("/:id", validateUserId, (req, res, next) => {
  User.getById(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(next)
});

router.post("/", validateUser, (req, res, next) => {
  User.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(next)
});

router.put("/:id", validateUserId, validateUser, (req, res, next) => {
  console.log("==>", req.body);
  User.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(next)
});

router.delete("/:id", validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  console.log(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  console.log(req.user);
});

router.post("/:id/posts", validateUserId, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.user);
});

router.use((error, req, res, next) => {//eslint-disable-line
  res.status(error.status || 500).json({
    message: error.message,
    customMessage: "Something bad happened in the users router",
  });
});
// do not forget to export the router
module.exports = router;
