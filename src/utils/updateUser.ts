import User from "src/infrastructure/database/models/user"

export const updateUser = async(updateValues:any,condition:any):Promise<number|any>=>{
    const [affectedCount] = await User.update(updateValues,condition);
    return affectedCount;
}