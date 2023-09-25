import { Role, UserTypes } from "../../libs/types";
import { verifyUser } from "./clientUser";
/**
 * @user : Instance of User model
 */

export const User = async (user: UserTypes) => {
  const { email, password, role, username } = await verifyUser(
    user.email,
    user.password,
    user.username,
    user.role
  );

  const getEmail: () => string = () => {
    return email;
  };

  const getPassword: () => string = () => {
    return password;
  };

  const getRole: () => Role = () => {
    return role;
  };

  const getUsername: () => string = () => {
    return username;
  };

  return {
    getEmail,
    getPassword,
    getRole,
    getUsername,
  };
};
