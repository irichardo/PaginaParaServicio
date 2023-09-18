import { Request, Response} from 'express';
import { createUserService } from 'src/domain/services/createUserService';

export const createUserController = async (req:Request,res:Response) => {
    const {email, password, role, username} = req.body;
    if(!email || typeof email !== 'string' ){
        return res.status(400).json({error:' Invalid_email'})
    }
    if(!password || typeof password !== 'string'){
        return res.status(400).json({error:' Invalid_password'})
    }
    if(!role || typeof role !== 'string'){
        return res.status(400).json({error:' Invalid_role'})
    }

    try{
        const { id } = await createUserService({email,password,role,username});
        return res.status(200).json({id});
    }
    catch(err){
        // return res.status(400).json({error: err.message})
        console.error(err)
        // @ts-ignore
        return res.status(400).json({error: err.message});
    }
}