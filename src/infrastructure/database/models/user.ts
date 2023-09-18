import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize'
import { UserRow } from 'src/libs/types';

export class SequelizeUser extends Model<UserRow, Omit<UserRow, 'id'>> {
    // declare id: number;
    declare email: string;
    declare username:string;
    declare password: string;
    declare role: string;
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
            // isInteger: true,
            isIn:{
                args:[["Client","Admin"]],
                msg:'Value must be client or admin'
            }
        },
        allowNull: false
    }
}, { sequelize, modelName: 'User', timestamps: true })

export default SequelizeUser;