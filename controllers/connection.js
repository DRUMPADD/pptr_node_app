import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config();
const pool = mysql.createPool({
    host: process.env.REACT_HOST,
    user: process.env.REACT_USER,
    password: process.env.REACT_PSWD,
    database: process.env.REACT_DATABASE,
    port: process.env.REACT_PORT,
})

pool.getConnection(function(error, conn) {
    if (error) throw error;
    console.log("You are connected")
})


export default pool