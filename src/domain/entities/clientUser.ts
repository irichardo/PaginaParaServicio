import { UserTypes } from "src/libs/types";
import { Role } from "./User";
import { regex } from "src/libs/regex";
import encryptPassword from "src/libs/encryptPassword";
import SequelizeUser from "src/infrastructure/database/models/user";

export const verifyUser = async (
  email: string,
  password: string,
  username: string,
//   role:string
) => {
  const user: UserTypes = {
    username,
    email,
    role:Role.Client,
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
            throw new Error(err.message);
        } );
        return user;
};

const validateEmail = async (email: string) => {
        const isValid = regex.test(email);
        const repeatedEmail = await SequelizeUser.findOne({ where: { email } });
        if (!isValid) {
            throw new Error("Invalid email");
        }
        if (repeatedEmail) throw new Error("Email repeated");
};

const validatePassword = (password: string) => {
  const MIN_PASSWORD_LENGTH = 4;
  if (password.length < MIN_PASSWORD_LENGTH)
    throw new Error("Password must be at least");
};
