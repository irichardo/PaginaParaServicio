import { Request, Response } from "express";
import { updateUser } from "src/utils/updateUser";
import { CustomError } from "src/domain/errors/customError";
import { createUserService } from "src/domain/services/createUserService";

// const createUser = async (req: Request, res: Response) => {
//   try {
//     const user = await createUserService(req.body)
//     res.status(200).send(user.toString());
//   } catch (error) {
//     if(error instanceof CustomError) {
//       console.log("Error: ", error.message);
//     }
//     res.status(500).send('Internal Service Error').end();
//   }
// };

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
  // createUser,
  updateDataUser,
};
