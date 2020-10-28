import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }
  /* o token vem junto com a palavra Bearer, split encontra um espaço e cria dois arrays e como Bearer n vai ser utilizado ele pode ser descartado usando uma , na desestruturação */
  const [, token] = authHeader.split(' ');

  try {
    // promisify transforma uma func que você precisaria usar call back em async/await. o id do usuario pode ser acessado pelo decoded, pois ele está dentro da jwt como payload
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // colocando o id dentro do req para fazer as alterações dentro da base de dados após o user estiver logado.
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
