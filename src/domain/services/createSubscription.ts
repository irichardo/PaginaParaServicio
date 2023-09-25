import Subscription from "../../infrastructure/database/models/subscription";
import { ICreateSubscription } from "../types/types";

export const setSubscription = async({user, type}:ICreateSubscription) =>{
    const subscription = await Subscription.findOne({where:{type}});
    if(subscription){
        const userSubscripted =  await user.setSubscription(subscription);
        return userSubscripted;
    }
}