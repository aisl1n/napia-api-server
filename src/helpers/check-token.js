import jwt from 'jsonwebtoken';

const checkToken = (req, res, next) => {
  const token = req.header('auth-token');

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: 'Acesso negado',
    });
  }
  try {
    const verified = jwt.verify(token, 'secret');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ status: 401, message: 'Acesso negado' });
  }
};

export default checkToken;
