import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

export const signup = async (req: Request, res: Response) => {
  // saving new user
  const user: IUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  // encrypt
  user.password = await user.encryptPassword(user.password);
  const savedUser = await user.save();
  // token
  const token: string = jwt.sign(
    { id: savedUser._id },
    process.env.TOKEN_SECRET || 'tokentest'
  );

  res.header('auth-token', token).json(savedUser);
};

export const signin = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json('Email or password is wrong!');
  }

  const correctPassword: boolean = await user.validatePassword(
    req.body.password
  );

  if (!correctPassword) {
    return res.status(400).json('Invalid password');
  }

  const token: string = jwt.sign(
    { _id: user._id },
    process.env.TOKEN_SECRET || 'tokentest',
    {
      expiresIn: 60,
    }
  );

  res.header('auth-token', token).json(user);
};

export const profile = (req: Request, res: Response) => {
  console.log(req.header('auth-token'));
  res.send('profile');
};
