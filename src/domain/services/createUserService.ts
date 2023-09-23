import {
  SequelizeUser,
} from "src/infrastructure/database/models/user";
import { Role, UserTypes } from "src/libs/types";
import { User } from "../entities/User";
import Subscription from "src/infrastructure/database/models/subscription";
import { SequelizeUserRepository } from "../repositories/sequelizeUserRepository";
import { CustomError } from "../errors/customError";

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
    const created = await SequelizeUser.create(user).then(async (item) => {
    // Set Subscription basic;
    const findSub = await Subscription.findOne({ where: { type: 0 } })
    //@ts-ignore
    item.setSubscription(findSub);
    return item;
  });
  // console.lo
  return created;
};
