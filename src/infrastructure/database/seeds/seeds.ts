import Subscription from "../models/suscription";
import subscriptionType from "src/libs/suscriptionNames";

const seedSubscription = async ()=>{
    try{
        const existSeeds = await Subscription.count();

        if(existSeeds > 0) return 'Seeds already created 🛑';
        else{
            for(const data in subscriptionType) {
                   await Subscription.create(subscriptionType[data])
            }
            return 'Seeds created successfully 🎉';
        }
    }
    catch(err){
        console.log(err)
    }
}


export default seedSubscription;