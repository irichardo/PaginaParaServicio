import {
  SequelizeUser,
} from "src/infrastructure/database/models/user";
import { UserTypes } from "src/libs/types";
import { Role, User } from "../entities/User";
import Subscription from "src/infrastructure/database/models/suscription";

export interface ICreateUser {
  createUserService(user: UserTypes): Promise<{ id: number }>;
}

export const createUserService = async ({
  username,
  email,
  password,
  role,
}: UserTypes) => {
  const data = await getUserInstance({ username, email, password, role });
  const userCreate: UserTypes = {
    email: data.getEmail(),
    username: data.getUsername(),
    password: data.getPassword(),
    role: Role.Client,
  };
  //@ts-ignore
  const { id } = await createdUserInDB(userCreate);
  return id;
};


const getUserInstance = ({ username, email, password, role }: UserTypes) => {
  const userData: UserTypes = {
    username,
    email,
    password,
    role,
  };
  if (role === Role.Client) {
    return User(userData);
  }
  // if(role === Role.Admin){
  //     return UserVerify(userData);
  // }
  else throw new Error("Invalid role");
};

const createdUserInDB = async (user: UserTypes) => {
      const created = await SequelizeUser.create(user).then(async(item)=>{
      const findSub = await Subscription.findOne({where:{type:0}})
      //@ts-ignore
      item.setSubscription(findSub);
      return item;
      });
      return created;
};

// .then(async (user) => {
    //     const findSub = await Subscription.findOne({
    //         where: { type: subscription },
    //     });
        // @ts-ignore
    //     user.setSubscription(findSub);
    //   })
