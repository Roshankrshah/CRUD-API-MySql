const mysql = require('mysql');
let instance = null;
let id = 4;
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('db ' + connection.state);
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM account";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            console.log(response);

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async insertNewName(name) {
        try {
            const dataAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO account (id,name,data_added) VALUES (?,?,?);";

                connection.query(query,[id,name, dataAdded], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            id += 1;
            return {
                id: id,
                name: name,
                dataAdded: dataAdded
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;