import  { Sequelize }  from "sequelize";
import { options } from "./configSequelize";

const sequelize = new Sequelize(options);

export default sequelize;