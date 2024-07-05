import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const router = Router();

router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (
    nome == null ||
    email == null ||
    senha == null
  ) {
    return res
      .status(400)
      .json({ message: 'Por favor, preencha todos os campos' });
  }

  // if (senha !== confirmarSenha) {
  //   return res.status(400).json({ message: 'As senhas não coincidem' });
  // }

  const emailExists = await User.findOne({ email: email });

  if (emailExists) {
    return res.status(400).json({ message: 'Email já cadastrado' });
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(senha, salt);

  const user = new User({
    nome,
    email,
    senha: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    const token = jwt.sign(
      {
        id: savedUser._id,
        nome: savedUser.nome,
        email: savedUser.email,
      },
      'secret'
    );
    res.status(201).json({
      error: null,
      mensagem: 'Usuário criado com sucesso',
      token: token,
      userID: savedUser._id,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ message: 'Email ou senha incorretos' });
  }

  if (email == null || senha == null) {
    return res
      .status(400)
      .json({ message: 'Por favor, preencha todos os campos' });
  }

  const validPassword = await bcrypt.compare(senha, user.senha);
  if (!validPassword) {
    return res.status(400).json({ message: 'Email ou senha incorretos' });
  }

  const token = jwt.sign(
    {
      id: user._id,
      nome: user.nome,
    },
    'secret'
  );
  res.status(200).json({
    error: null,
    mensagem: 'Usuário autenticado com sucesso',
    token: token,
    userID: user._id,
  });
});

export default router;
