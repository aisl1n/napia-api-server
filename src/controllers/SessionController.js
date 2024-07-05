import { Session } from '../models/Session.js';

const startSession = async (req, res) => {
  try {
    const newSession = new Session(req.body);
    await newSession.save();
    res.status(201).json(newSession);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const endSession = async (req, res) => {
  try {
    // Lógica para finalizar uma sessão de pomodoro
    res.sendStatus(200);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUserSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.params.userId });
    res.json(sessions);
  } catch (err) {
    res.status(404).json({ error: 'Sessions not found' });
  }
};

export { startSession, endSession, getUserSessions };
