import { Request, Response} from 'express';
import { CustomError } from 'src/domain/errors/customError';
import { createUserService } from 'src/domain/services/createUserService';
import { UserTypes } from 'src/libs/types';

export const createUserController = async (req:Request,res:Response) => {
    const {email, password, role, username}:UserTypes = req.body;
    if(!email || typeof email !== 'string' ){
        return res.status(400).json({error:' Invalid_email'})
    }
    if(!username || typeof username !== 'string'){
        return res.status(400).json({error:' Invalid_username'})
    }
    if(!password || typeof password !== 'string'){
        return res.status(400).json({error:' Invalid_password'})
    }
    if(!role || typeof role !== 'string'){
        return res.status(400).json({error:' Invalid_role'})
    }

    try{
        // @ts-ignore
        const  id  = await createUserService({email,password,role,username});
        return res.status(200).json({id});
    }
    catch(err){
        if(err instanceof CustomError){
            console.error(err.message);
            return res.status(400).json({error: err.message});
        }
        return res.status(500).send('Internal Server Error');
    }
}