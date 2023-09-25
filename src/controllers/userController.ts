import { Request, Response } from "express";
import { updateUser } from "src/utils/updateUser";

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
  updateDataUser,
};
