import {cnx} from './connect-mysql.js'


export async function allRowTable(table){
    let [rows,fields] = await cnx.promise().query(`SELECT * FROM ${table}`);
    return rows
}

export async function rowTableForIdUser(id_user, table){
    let [rows,fields] = await cnx.promise().query(`SELECT * FROM ${table} WHERE id_user=?`,[id_user]);
    return rows
}
export async function rowTableForId(id, table){
    let [rows,fields] = await cnx.promise().query(`SELECT * FROM ${table} WHERE id=?`,[id]);
    return rows
}
export async function rowTableForTwoWhere(filds, field1, value1, field2, value2, table){
    let [rows,fields] = await cnx.promise().query(`SELECT ${filds} FROM ${table} WHERE ${field1}=? AND ${field2}=?`,[value1, value2]);
    return rows
}

export async function addInvoiceTable({car,id_user,totalList,date},table){
    let [rows,fields] = await cnx.promise().query(`INSERT INTO ${table} (id, id_user, total, date, details) VALUES (NULL, ${id_user}, '${totalList}', '${date}','${JSON.stringify(car)}')`);
    return rows
}

export async function addUserTable({name,email,password },table){
    let [rows,fields] = await cnx.promise().query(`INSERT INTO ${table} (id, name, email, password, role) VALUES (NULL, '${name}', '${email}','${password}','client')`);
    return rows
}