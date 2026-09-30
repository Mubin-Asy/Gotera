/**
 * authHandlers.js
 * Aligned with 'Web Development with Node and Express' (Ethan Brown)
 * 
 * Authentication and session handlers for Gotera
 */

const User = require('../models/User');
const { getMemoryStore, getIsConnected } = require('../db/connection');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email/username and password'
      });
    }

    const cleanIdentity = email.toLowerCase().trim();

    if (getIsConnected()) {
      const user = await User.findOne({
        $or: [
          { email: cleanIdentity },
          { fullName: new RegExp(`^${email.trim()}$`, 'i') }
        ]
      });

      if (!user || user.password !== password) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email/username or password. Please verify credentials.'
        });
      }

      return res.status(200).json({
        success: true,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          organization: user.organization,
          avatar: user.avatar
        }
      });
    }

    const store = getMemoryStore().users;
    const user = store.find(u => 
      u.email.toLowerCase() === cleanIdentity ||
      u.fullName.toLowerCase() === cleanIdentity
    );

    if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email/username or password. Please verify credentials.'
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        organization: user.organization,
        avatar: user.avatar || 'MK'
      }
    });
  } catch (err) {
    next(err);
  }
};


exports.register = async (req, res, next) => {
  try {
    const { fullName, email, phone, organization, role, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide required fields: fullName, email, password'
      });
    }

    const avatar = fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'MK';

    const userData = {
      fullName,
      email: email.toLowerCase(),
      phone: phone || '',
      organization: organization || 'National Food Reserve System',
      role: role || 'Warehouse Manager',
      password,
      avatar,
    };

    if (getIsConnected()) {
      const existing = await User.findOne({ email: userData.email });
      if (existing) {
        return res.status(400).json({ success: false, message: 'Email already registered' });
      }
      const user = await User.create(userData);
      return res.status(201).json({
        success: true,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          organization: user.organization,
          avatar: user.avatar
        }
      });
    }

    const store = getMemoryStore().users;
    const existingMemory = store.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existingMemory) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const newDoc = {
      ...userData,
      _id: `usr_${Date.now()}`,
      createdAt: new Date(),
    };
    store.push(newDoc);

    res.status(201).json({
      success: true,
      user: {
        id: newDoc._id,
        fullName: newDoc.fullName,
        email: newDoc.email,
        role: newDoc.role,
        organization: newDoc.organization,
        avatar: newDoc.avatar
      }
    });
  } catch (err) {
    next(err);
  }
};
