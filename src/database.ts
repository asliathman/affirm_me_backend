import { db_host, db_port, db_name, db_user, db_password } from './config';
import { Sequelize } from 'sequelize';

export default new Sequelize({
    dialect: "postgres",
    host: db_host,
    port: db_port,
    database: db_name,
    username: db_user,
    password: db_password,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false 
        }
    }
    // dialectOptions: {
    //     ssl: process.env.NODE_ENV==="production"
    // }
    //ssl: process.env.            NODE_ENV==="production"
});

// export default new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres',
//     dialectOptions: {
//     ssl: process.env.NODE_ENV==="production"
//     }
// });