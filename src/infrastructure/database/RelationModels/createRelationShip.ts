import sequelize from "../config/sequelize";

const { Subscriptions, User } = sequelize.models;

Subscriptions.hasMany(User);
User.belongsTo(Subscriptions);
// console.log(Object.keys(Subscriptions.hasMany(User)),Object.keys(User.belongsTo(Subscriptions)));