import { UserTypes } from "src/libs/types";
import { Role } from "src/libs/types";
import { CustomError } from "../errors/customError";
import { regex } from "src/libs/regex";
import encryptPassword from "src/libs/encryptPassword";
import SequelizeUser from "src/infrastructure/database/models/user";

export const verifyUser = async (
  email: string,
  password: string,
  username: string,
  role:Role
) => {
  const user: UserTypes = {
    username,
    email,
    role,
    password,
  };
      await Promise.all([
          // Verify if Password have less then 4 character
          validatePassword(password),
          // Encrypt password
          encryptPassword(password),
          // Regex for verify email
          validateEmail(email),
        ])
        .then((res) => {
            user.password = res[1];
        }).catch((err) => {
            throw new CustomError(err.message);
        } );
        return user;
};

const validateEmail = async (email: string) => {
        const isValid = regex.test(email);
        const repeatedEmail = await SequelizeUser.findOne({ where: { email } });
        if (!isValid) {
            throw new Error("Invalid email, domain/entities/clientUser:Line 40.");
        }
        if (repeatedEmail) throw new CustomError("Email repeated, domain/entities/clientUser:Line 42.");
};

const validatePassword = (password: string) => {
  const MIN_PASSWORD_LENGTH = 4;
  if (password.length < MIN_PASSWORD_LENGTH)
    throw new CustomError("Password must be at least, domain/entities/clientUser:Line 48.");
};
