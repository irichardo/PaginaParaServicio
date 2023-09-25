import { DataTypes, Model, HasOneGetAssociationMixin } from 'sequelize';
import sequelize from '../config/sequelize'
import { Role, UserRow } from 'src/libs/types';
import Subscription from './subscription';

export class SequelizeUser extends Model<UserRow, Omit<UserRow, 'id'>> {
    declare email: string;
    declare username:string;
    declare password: string;
    declare role: Role;
    // public hasOneSubscription!:HasOneGetAssociationMixin<Subscription>;
    public setSubscription!:(subscription:Subscription)=>Promise<void>
    }

SequelizeUser.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(61),
        allowNull: false
    },
    role:{
        defaultValue:"Client",
        type: DataTypes.STRING,
        validate:{
            isIn:{
                args:[["User","Admin"]],
                msg:'Value must be client or admin'
            }
        },
        allowNull: false
    }
}, { sequelize, modelName: 'User', timestamps: true })

export default SequelizeUser;