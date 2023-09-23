import 'dotenv/config';
import express from 'express';
import sequelize from '../infrastructure/database/config/sequelize';
import seedSubscription from '../infrastructure/database/seeds/seeds';
import userRoutes from '../routes/routes';

import '../infrastructure/database/RelationModels/mapModels';
import '../infrastructure/database/RelationModels/createRelationShip';

const app = express();

const PORT = process.env.PORT || 3000;

//create middleware for routes
app.use(express.json());
app.use('/v1', userRoutes)
//export routes
//charge the models

sequelize.sync({ force: true }).then(() => {
    seedSubscription().then(res=>console.log(res)).catch(err=>console.log(err))
    app.listen(3000, () => {
        console.log('Server listening in PORT: ' + PORT)
    })
}).catch((error) => {
    console.error('Error syncing database:', error);
});

