import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize'
import { SequelizeUser } from '../models/user';

class Subscription extends Model {}

Subscription.init({
    id:{
        defaultValue:DataTypes.UUIDV4(),
        type:DataTypes.UUID,
        primaryKey:true,
        unique:true
    },
    type:{
        defaultValue:0,
        type: DataTypes.INTEGER,
        validate:{
            isInt:true,
            isIn:{
                args:[[0,1,2,3]],
                msg:'value must be an integer'
            }
        },
        unique: true,
        allowNull: false
    },
    name:{
        type:DataTypes.STRING,
        unique:true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, { sequelize, modelName: 'Subscriptions', timestamps: false })

export default Subscription;