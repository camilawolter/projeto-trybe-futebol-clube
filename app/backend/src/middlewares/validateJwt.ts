import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const secret = process.env.JWT_SECRET;

const validateJwt = (req: Request, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;

  if (!token) return res.status(404).json({ message: 'Token not found' });

  // jwt.verify(token, secret as jwt.Secret, (err) => {
  //   if (err) return res.status(401).json({ message: 'Token must be a valid token' });
  // });

  try {
    const user = jwt.verify(token, secret as jwt.Secret);
    req.body.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateJwt;
