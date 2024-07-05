import { User } from '../models/User.js';

const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: 'User not found' });
  }
};

const updateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export { createUser, getUser, updateUser, deleteUser };
