import { db_host, db_port, db_name, db_user, db_password } from './config';
import { Sequelize } from 'sequelize';

// noticed i need ssl and dialiet args 12- 17 to run on heroku but wont work with local
export default new Sequelize({
    dialect: "postgres",
    host: db_host,
    port: db_port,
    database: db_name,
    username: db_user,
    password: db_password,
    // dialectOptions: {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized: false 
    //     }
    // }
    
});
