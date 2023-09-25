import SequelizeUser from "../../infrastructure/database/models/user";

export interface ICreateSubscription{
    user: SequelizeUser;
    type: number;
}