import express from "express";
import Subscription from "src/infrastructure/database/models/subscription";
import User from "src/infrastructure/database/models/user";
import bcryptjs from "bcryptjs";
import  { createUserController } from "src/infrastructure/controller/CreateUserController"; "src/infrastructure/controller/CreateUserController";
import Console from "src/utils/console";
const router = express.Router();

/**
 * @User : It's an element that represents model user
 * 
 */

// router.get("/", async (req, res) => {
//     const data = await User.findAll();
//     if (data.length === 0) res.send("No users found");
//     else {
//         res.status(200).send(data);
//     }
// });

router.post("/user/createUsers",(req,res)=>createUserController(req,res));

// router.post("/createObjects", async (req, res) => {
//     try {
//         const { name, count } = req.body;

//         const verify = await Subscription.create({ name, count })
//             .then((user) => {
//                 console.log("Objecto creado con exito");
//                 return true;
//             })
//             .catch((error) => {
//                 console.error("Error en la creacion de el elemento", error);
//                 return false;
//             });

//         if (verify) {
//             res.status(200).send("Creado objeto exitosamente");
//         } else throw new Error("Fallo en los datos recibidos");
//     } catch (error) {
//         console.error("No se ha podido encontrar los elementos", error);
//     }
// });

// router.put("/user/changeUserData",userController.updateDataUser);

router.put("/user/changeUserEmail", async (req, res) => {
    try {
        const { email, newEmail } = req.body;
        const updateValues = { email: newEmail };
        const [affectedCount] = await User.update(updateValues, {
            where: { email },
        });
        console.log(affectedCount);
        if (affectedCount === 0) {
            Console.Denied("Usuario no encontrado")
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        Console.Approved("User Data update successfully.")
        res.status(200).json({ message: "Usuario actualizado correctamente." });
    } catch (error) {
        console.error(error);
    }
});

router.put("/user/changeUserPassword", async (req, res) => {
    try {
        const { password, email } = req.body;
        const saltRounds = 10;
        const passwordDecrypt = await bcryptjs.hash(password, saltRounds);
        const condition = { where: { email: email.toLowerCase() } };
        const [affectedCount] = await User.update(
            { password: passwordDecrypt },
            condition
        );
        if (affectedCount === 0) {
            return res.status(404).json({ message: "Denied Password" });
        }
        res.status(200).json({ message: "Changed Password successfully." });
    } catch (error) {
        console.error(error);
    }
});

router.post("/authorization/loginValidation", async (req, res) => {
    try {
        const { email, password } = req.body;
        const findElement = { where: { email } };
        if (
            typeof email === undefined ||
            typeof password === undefined ||
            email.length === 0 ||
            password.length === 0
        )
            return res.status(401).json({ message: "Insufficient credentials 🛑" });
        // else {
        // @ts-ignore
        const existingMailUser = await User.findOne(findElement);

        if (!existingMailUser) {
            Console.Approved("User not found")
            return res.status(404).json({ message: "Account doesn't exists" });
        }
        const passwordVerify = await bcryptjs.compare(
            password,
            // @ts-ignore
            existingMailUser.password
        );
        if (passwordVerify) {
            //@ts-ignore
            Console.Approved(`Password mismatch!, ${existingMailUser.username} has logging! ✅`)
            return res.status(200).json({ message: "Password mismatch! ✅" });
        } else {
            Console.Denied("Password Failed ✅")
            return res.status(401).json({ message: "Password Failed" });
        }
        // }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error" });
    }
});

// router.post('/subscribe', async(req,res)=>{
//     const { email, subscription } = req.body;
//     if(email === undefined) return res.status(401).json({ message: "data missing"});
//     try{
//         const findUser = await User.findOne({where:{email}, include:Subscription});
//         if(findUser.Subscription.dataValues.type === subscription) return res.status(200).send({message:"Already subscribed"})
//         if(findUser === null) {
//             Console.Denied("User doesn't exist")
//             return res.status(401).json({ message: "User does not exist"});
//         }
//         const findSubscription = await Subscription.findOne({where:{type:subscription}});
//         //@ts-ignore
//         await findUser?.setSubscription(findSubscription)
//         Console.Approved("User subscription updated successfully")
//         res.status(200).json({ message:"User subscription updated successfully"});
//     }
//     catch(err){
//         console.log(err);
//     }
//     })

export default router;
