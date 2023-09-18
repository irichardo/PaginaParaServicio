import User from "src/infrastructure/database/models/user";
import { Request, Response } from "express";
import Console from "src/utils/console";
import bcryptjs from "bcryptjs";
import { updateUser } from "src/utils/updateUser";
// import subscriptionType from "../libs/suscriptionNames";
import Subscription from "src/infrastructure/database/models/suscription";
import { Role } from "src/domain/entities/User";
import { createUserService } from "src/domain/services/createUserService";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await createUserService(req.body)
    res.status(200).send(user.toString());
      // const { username, email, password, subscription } = req.body;
      // const config = {
      //   where: {
      //     email: email,
      //   },
      // };
      // const existingMailUser = await User.findOne(config);
      // const saltRounds = 10;
      // if (existingMailUser) {
      //   Console.Denied("Email already exists");
      //   return res.status(409).send({ message: "Email already exists" });
      // }
// Need to refactor this SINGLE RES
    // const hash = await bcryptjs.hash(password, saltRounds);
    // const user = await User.create({
    //   username,
    //   email,
    //   password: hash,
    //   role: Role.Client
    // })
    // .then(async (user) => {
    //     const findSub = await Subscription.findOne({
    //         where: { type: subscription },
    //     });
        // @ts-ignore
    //     user.setSubscription(findSub);
    //   })
    //   .then(() => {
    //     return true;
    //   });

    // if (user) {
    //   Console.Approved("User created successfully");
    //   return res.status(200).send("Users created successfully");
    // } else {
    //   throw new Error("Failed to create user");
    // }
  } catch (error) {
    //@ts-ignore
    console.error(error.message);
    //@ts-ignore
    res.status(500).send(error.message);
  }
};

const updateDataUser = async (req: Request, res: Response) => {
  try {
    const { username, email } = req.body;
    const updateValues = {
      username,
      email,
    };
    const condition = { where: { email: email } };
    const affectedCount = await updateUser(updateValues, condition);
    if (affectedCount === 0) {
      return res.sendStatus(404).json({ message: "Usuario no encontrado." });
    }
    res.sendStatus(200).json({ message: "Usuario actualizado correctamente." });
  } catch (error) {
    console.error(error);
  }
};

export const userController = {
  createUser,
  updateDataUser,
};
