import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';
import { promisify } from 'util';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // split divide a string, e utiliza o parametro como separador, no caso o espaço vazio
  // quando nao quizermos utilizar td o array de retorno da desestruturação, utilizamos a virgula para "pular" o recebimento
  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
  } catch (err) {
    res.status(401).json({ error: 'Token invalid' });
  }

  return next();
};
