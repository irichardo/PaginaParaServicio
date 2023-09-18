import { SequelizeUser } from "src/infrastructure/database/models/user";
import { createUserService } from "../services/createUserService";
import { User } from "../entities/User";


const SequelizeUserRepository = async(user:SequelizeUser)=>{
    const userCreateData = createUserService(user);
}