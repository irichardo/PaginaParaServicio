import {
  SequelizeUser,
} from "../../infrastructure/database/models/user";
import { Role, UserTypes } from "../../libs/types";
import { User } from "../entities/User";
// import Subscription from "../../infrastructure/database/models/subscription";
import { SequelizeUserRepository } from "../repositories/sequelizeUserRepository";
import { CustomError } from "../errors/customError";
import { setSubscription } from "./createSubscription";

export const createUserService = async (user: UserTypes):Promise< {id:number}> => {
  // @ts-ignore
  const { id } = await SequelizeUserRepository(user);
  return id;
};


export const getUserInstance = (user: UserTypes) => {
  const userData: UserTypes = {
    username:user.username,
    email:user.email,
    password:user.password,
    role:user.role,
  };
  if (user.role === Role.client) {
    return User(userData);
  }
  else throw new CustomError("Invalid role, Line 27, domain/services/createdUserService");
};

export const createdUserInDB = async (user: UserTypes) => {
  const created = await SequelizeUser.create(user)
  const relatedUser = await setSubscription({user:created,type:0});
  return relatedUser;
};
