const router = require("express").Router()
const User = require("../models/User.model")
const bcrypt = require('bcryptjs');

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

router.post('/login', async (req, res) => {

  const { email, password } = req.body;

  if (email === '' || password === '') {
    res.status(400).json({ message: "Username or password not present." });
    return;
  }

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      res.status(401).json({
        messaje: "Login not succesfull",
        error: "User not found"
      })
    } else {
      res.status(200).json({
        messaje: "Login succesful",
        user
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "An error ocurred",
      error: error.mesagge
    })
  }

});

router.delete('/:user_id', async (req, res) => {
  try {
    const userId = await User.findByIdAndDelete(req.params.user_id)
    return res.status(200).json(userId)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router