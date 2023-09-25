import { SequelizeUser } from "../../infrastructure/database/models/user";
import { createdUserInDB, getUserInstance } from "../services/createUserService";


export const SequelizeUserRepository = async (user:SequelizeUser)=>{
    const verifyUser = await getUserInstance(user);
    const created = await createdUserInDB({
        email: verifyUser.getEmail(),
        password: verifyUser.getPassword(),
        role: verifyUser.getRole(),
        username: verifyUser.getUsername()
    });
    return {
        // @ts-ignore
        id:created.id
    };
}

// export const createUserService = async (user: UserTypes):Promise< {id:number}> => {
//     const data = await getUserInstance(user);
//     const userCreate: UserTypes = {
//       email: data.getEmail(),
//       username: data.getUsername(),
//       password: data.getPassword(),
//       role: data.getRole(),
//     };
//     //@ts-ignore
//     const { id } = await createdUserInDB(userCreate);
//     return id;
//   };

// Abstracciones para usar el dominio