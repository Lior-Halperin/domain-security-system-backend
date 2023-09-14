import mysql from "mysql2";
import config from "./config";

// Create pool of connection and supply one when needed:
const connection = mysql.createPool({
    host: config.dbConfig.host, // computer name
    user: config.dbConfig.user, // database username
    password: config.dbConfig.password, // database password
    database: config.dbConfig.database // database name
});

function execute(sql: string, values?: any[]): Promise<any>{ // Promisify
    return new Promise<any>((resolve, reject) => {
        connection.query(sql,values, (err, result) => {  // If error - first object will contain error, if no error - second object will contain result
            
            // If there is an error:
            if(err) return reject(err);
                
            // No error - report result data:
            resolve(result);
        });
    });
}

export default {
    execute
};