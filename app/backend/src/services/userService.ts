import { IUser } from '../interfaces';
import UserModel from '../database/models/UserModel';

const getUserByEmail = async (email: string): Promise<IUser> => {
  const user = await UserModel.findOne({ where: { email } });
  return {
    id: user?.dataValues.id,
    username: user?.dataValues.username,
    role: user?.dataValues.role,
    email: user?.dataValues.email,
    password: user?.dataValues.password,
  };
};

const getUserById = async (id: number): Promise<IUser> => {
  const user = await UserModel.findOne({ where: { id } });
  return user as IUser;
};

export default {
  getUserByEmail,
  getUserById,
};
