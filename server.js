// Required dependencies
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const crypto = require('crypto');

const secretCode = crypto.randomBytes(32).toString('hex');
console.log('Secret Code:', secretCode);

// Create Express application
const app = express();
const session = require('express-session');
// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://adil315:adil3105@cluster0.ddmrjkm.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Define User schema
const userSchema = new mongoose.Schema({
  fnam: String,
  lnam: String,
  eml: String,
  pss: String,
  cpss: String
});

const User = mongoose.model('User', userSchema);
// Configure session
app.use(
  session({
    secret: 'f5bdeca5d7f6893de827d2b7afcaa66fb2dec349c734bed749b3e75b737072aa', // Replace with your secret key for session encryption
    resave: false,
    saveUninitialized: true,
  })
);
// Signup route
app.post('/signup', async (req, res) => {
  try {
    const { fnam,lnam,eml,pss,cpss } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ eml });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(pss, 10);

    // Create new user
    const newUser = new User({
      fnam,
      lnam,
      eml,
      pss: hashedPassword
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { eml, pss } = req.body;

    // Check if user exists
    const user = await User.findOne({ eml });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(pss, user.pss);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Successful login
    // Store user information in session
    req.session.userId = user._id;
    req.session.firstName = user.firstName;
    req.session.lastName = user.lastName;
    req.session.email = user.email;
   
    res.send('Login successful');
   
   // res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Route to access user profile
app.get('/profile', (req, res) => {
  // Access user's personalized fields from the session
  const { userId, firstName, lastName, email } = req.session;

  // Use the user's personalized fields as needed
  // ...

  res.send('Profile page');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

