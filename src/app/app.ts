import 'dotenv/config';
import fs from 'fs'
import path from 'path';
import express from 'express';
import sequelize from '../infrastructure/database/config/sequelize';
import userRoutes from '../routes/routes';
import seedSubscription from '../infrastructure/database/seeds/seeds';

const app = express();
const PORT = process.env.PORT || 3000;
const basename = path.basename(__filename);
const models: any = [];

// console.log(basename);

//create middleware for routes
app.use(express.json());
//export routes
app.use('/v1', userRoutes)
//charge the models


// console.log(
fs.readdirSync(path.join(__dirname, '../infrastructure/database/models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts' || file.slice(-3) === '.js'))
    .forEach(async (file) => {
        models.push(require(path.join(__dirname, "../infrastructure/database/models", file)));
    })

models.forEach((model: any) => {
    if (model.associate) {
        model.associate(models);
    }
});

const { Subscription, User } = sequelize.models;

Subscription.hasMany(User);
User.belongsTo(Subscription);

sequelize.sync({ force: true }).then(() => {
    seedSubscription().then(res=>console.log(res)).catch(err=>console.log(err))
    app.listen(3000, () => {
        console.log('Server listening in PORT: ' + PORT)
    })
}).catch((error) => {
    console.error('Error syncing database:', error);
});
//init the listener for events

