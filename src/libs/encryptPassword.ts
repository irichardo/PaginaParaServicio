import  bcrypt from 'bcryptjs'

const encryptPassword = async(password:string) =>{
    const saltRounds = 10;
    const hashedPassword:string = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export default encryptPassword;