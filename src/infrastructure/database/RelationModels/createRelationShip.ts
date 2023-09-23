import sequelize from "../config/sequelize";

const { Subscription, User } = sequelize.models;

Subscription.hasMany(User);
User.belongsTo(Subscription);
