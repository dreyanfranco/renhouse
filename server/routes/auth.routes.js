const router = require("express").Router()
const User = require("../models/User.model")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isAuthenticated } = require('./../middleware/jwt.middleware');

const salt = bcrypt.genSaltSync(10);

router.get('', async (req, res) => {
  try {
    const usersList = await User.find()
    return res.status(200).json(usersList);
  } catch (error) {
    res.status(500).json(error);
  }
})

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userData = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
    })
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
})

router.post('/login', (req, res, next) => {

  const { email, password } = req.body;

  if (email === '' || password === '') {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  User
    .findOne({ email })
    .then((foundUser) => {

      if (!foundUser) {
        res.status(401).json({ message: "User not found." })
        return;
      }

      if (bcrypt.compareSync(password, foundUser.password)) {

        const { _id, email, name } = foundUser;

        const payload = { _id, email, name }

        const authToken = jwt.sign(
          payload,
          'helloworld', //secret?
          { algorithm: 'HS256', expiresIn: "6h" }
        )

        res.status(200).json({ authToken });
      }
      else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }

    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Internal Server Error" })
    });
});


router.get('/verify', isAuthenticated, (req, res) => {
  res.status(200).json(req.payload)
})


// router.post('/login', async (req, res) => {

//   const { email, password } = req.body;

//   if (email === '' || password === '') {
//     res.status(400).json({ message: "Username or password not present." });
//     return;
//   }

//   try {
//     const user = await User.findOne({ email, password });
//     if (!user) {
//       res.status(401).json({
//         messaje: "Login not succesfull",
//         error: "User not found"
//       })
//     } else {
//       res.status(200).json({
//         messaje: "Login succesful",
//         user
//       })
//     }
//   } catch (error) {
//     res.status(400).json({
//       message: "An error ocurred",
//       error: error.mesagge
//     })
//   }

// });

router.delete('/:user_id', async (req, res) => {
  try {
    const userId = await User.findByIdAndDelete(req.params.user_id)
    return res.status(200).json(userId)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router