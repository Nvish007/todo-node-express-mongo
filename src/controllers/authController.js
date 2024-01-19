
const firebaseAdmin = require('firebase-admin');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const saltRounds = 10; 

module.exports = {
    async getUsers(req, res) {
        console.log("req", req);
    },
    async signup(req, res) {
        const { username, email, password } = req.body;

        try {
          const existingUser = await User.findOne({ $or: [{ username }, { email }] });
          if (existingUser) {
            return res.status(400).json({ message: 'Username or email already taken' });
          }
    
          const hashedPassword = await bcrypt.hash(password, saltRounds);
    
          const newUser = new User({ username, email, password: hashedPassword });
          await newUser.save();
    
    
          res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      },
    
      async login(req, res) {
        console.log('req.body', req);
        const { username, password } = req.body;
        console.log('username, email, password', username, password);
        try {
          const user = await User.findOne({ username });
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
    
          if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
          }
    
    
          res.status(200).json({ message: 'Login successful' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      },    
};
