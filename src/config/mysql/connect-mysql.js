// get the client
import mysql from 'mysql2'
// create the connection
export const cnx = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'test',
    password:''
  });
  
