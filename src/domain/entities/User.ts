import { UserTypes } from "src/libs/types";
import { verifyUser } from "./clientUser";
import bycrypt from 'bcryptjs';
import encryptPassword from "src/libs/encryptPassword";

/**
 * @user : Instance of User model
 */

export enum Role {
  Admin = "Admin",
  Client = "Client",
}

export const  User = async (user: UserTypes) => {
  const { email, password, role, username } = await verifyUser(
      user.email,
    user.password,
    user.username,
    // user.role
  );

  const getEmail = () => {
    return email;
  };

  const getPassword = () => {
    return password;    
  };

  const getRole = () => {
    return role;
  };

  const getUsername = () =>{
    return username;
  }

  return {
    getEmail,
    getPassword,
    getRole,
    getUsername,
  };
};
