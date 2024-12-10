const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Voter = require('../models/Voter');
const crypto = require('crypto');

const signup = async (req, res) => {
    try {
      const { cnic, name, email, phone, address, dateOfBirth, password } = req.body;
  
      // Check if CNIC already exists
      const existingVoter = await Voter.findOne({ cnic });
      if (existingVoter) {
        return res.status(400).json({ message: 'Voter with this CNIC already exists' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new voter
      const voter = new Voter({
        cnic,
        name,
        email,
        phone,
        address,
        dateOfBirth,
        password: hashedPassword,
      });
  
      await voter.save();
  
      // Generate JWT token
      const token = jwt.sign({ id: voter._id, cnic: voter.cnic }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
        // Generate a 2FA code
    const twoFactorCode = crypto.randomInt(100000, 999999).toString(); // 6-digit random code
    const twoFactorExpiry = new Date(Date.now() + 10*24*60 * 60 * 1000); // Valid for 10 minutes

    // Store the 2FA code and expiry in the database
    voter.twoFactorCode = twoFactorCode;
    voter.twoFactorExpiry = twoFactorExpiry;
    await voter.save();
      
    //"password": "StrongPassword123"
    // john.doeeeee@example.com,
    // 12455-1934567-1
    // Print the 2FA code to the terminal
    console.log(`Two-Factor Authentication Code for ${voter.cnic}: ${twoFactorCode}`);
      res.status(201).json({ 
        message: 'Voter registered successfully', 
        token, 
        voter,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error registering voter', error: error.message });
    }
  };
  

  const login = async (req, res) => {
    try {
      const { cnic, password } = req.body;
  
      // Find voter by CNIC
      const voter = await Voter.findOne({ cnic });
      if (!voter) {
        return res.status(404).json({ message: 'Voter not found' });
      }
  
      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, voter.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: voter._id, cnic: voter.cnic }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      

      res.status(200).json({ 
        message: 'Login successful', 
        token,
        voter,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  };
  

  const updateVoterInfo = async (req, res) => {
    try {
      // Extract user ID from the JWT token
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const voterId = decoded.id;
  
      // Get email and password from the request body
      const { email, password, newPassword, newEmail, address, phone, city, constituency } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
  
      // Find the voter by ID
      const voter = await Voter.findById(voterId);
      if (!voter) {
        return res.status(404).json({ message: 'Voter not found' });
      }
  
      // Validate the current email and password
      if (voter.email !== email) {
        return res.status(400).json({ message: 'Email does not match our records' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, voter.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // Update the fields if provided in the request body
      if (newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        voter.password = hashedPassword;
      }
  
      if (newEmail) {
        voter.email = newEmail;
      }
  
      if (address) {
        voter.address = { ...voter.address, ...address }; // Merge existing and new address
      }
  
      if (phone) {
        voter.phone = phone;
      }
  
      if (city) {
        voter.address.city = city;
      }
  
      if (constituency) {
        voter.address.constituency = constituency;
      }
  
      // Save the updated voter details
      await voter.save();
  
      res.status(200).json({
        message: 'Voter information updated successfully',
        voter,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating voter information', error: error.message });
    }
  };

  
const verifyVoter = async (req, res) => {
  try {
    const { twoFactorCode } = req.body;

    // Extract the JWT token from the authorization header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authorization token is required' });
    }

    // Verify the token and extract payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, cnic } = decoded;

    // Find the voter by ID and CNIC
    const voter = await Voter.findOne({ _id: id, cnic });
    if (!voter) {
      return res.status(404).json({ message: 'Voter not found' });
    }

    // Check if the two-factor code matches and is not expired
    if (voter.twoFactorCode !== twoFactorCode) {
      return res.status(400).json({ message: 'Invalid two-factor authentication code' });
    }

    if (voter.twoFactorExpiry < Date.now()) {
      return res.status(400).json({ message: 'Two-factor authentication code has expired' });
    }

    // Mark the voter as verified
    voter.verified = true;
    voter.twoFactorCode = null; // Clear the 2FA code
    voter.twoFactorExpiry = null; // Clear the expiration
    await voter.save();

    res.status(200).json({
      message: 'Voter verified successfully',
      voter: {
        id: voter._id,
        cnic: voter.cnic,
        name: voter.name,
        email: voter.email,
      },
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.status(500).json({ message: 'Error verifying voter', error: error.message });
  }
};
  

module.exports = {
  signup,
  login,
  updateVoterInfo,
  verifyVoter,
};
